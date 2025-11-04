# Simple TypeScript Client Generator
param(
    [string]$ControllerPath = ".\Controllers",
    [string]$OutputPath = ".\WebApi"
)

function Extract-DTOsFromController {
    param([string]$FilePath)
    
    $content = Get-Content $FilePath -Raw
    $dtos = @()
    
    # Extract all DTO types from method signatures
    $dtoMatches = [regex]::Matches($content, '(?:ActionResult<ApiResponse<(?:IEnumerable<)?([^>]+?)(?:>)?>?>|FromBody]\s*([A-Z]\w*Dto))')
    
    foreach ($match in $dtoMatches) {
        if ($match.Groups[1].Value -and $match.Groups[1].Value -match '\w*Dto$') {
            $dtos += $match.Groups[1].Value
        }
        if ($match.Groups[2].Value) {
            $dtos += $match.Groups[2].Value
        }
    }
    
    # Remove duplicates and return unique DTOs
    return ($dtos | Sort-Object -Unique)
}

function Parse-CSharpProperties {
    param([string]$DtoName, [string]$DtosPath)
    
    $properties = @()
    $dtoFiles = Get-ChildItem -Path $DtosPath -Filter "*.cs" -Recurse
    
    foreach ($file in $dtoFiles) {
        $content = Get-Content $file.FullName -Raw
        
        # Find the specific DTO class with better regex
        $classPattern = "public\s+class\s+$DtoName\s*\{([\s\S]*?)\n\s*\}"
        if ($content -match $classPattern) {
            $classContent = $matches[1]
            
            # Parse properties with improved regex that handles attributes and multiline
            $lines = $classContent -split "`n"
            $inProperty = $false
            $currentType = ""
            
            foreach ($line in $lines) {
                $line = $line.Trim()
                
                # Skip attributes and empty lines
                if ($line -match '^\[.*\]$' -or $line -eq '') {
                    continue
                }
                
                # Match property declaration
                if ($line -match '^public\s+([^{]+?)\s+(\w+)\s*\{\s*get;\s*set;\s*\}') {
                    $csharpType = $matches[1].Trim()
                    $propertyName = $matches[2].Trim()
                    
                    # Convert C# types to TypeScript
                    $tsType = switch -Regex ($csharpType) {
                        '^(int|long|double|float|decimal)\??' { 'number' }
                        '^string\??' { 'string' }
                        '^bool\??' { 'boolean' }
                        '^DateTime\??' { 'Date' }
                        '^Guid\??' { 'string' }
                        '\w*Dto$' { $csharpType -replace '\?$', '' }
                        default { 'any' }
                    }
                    
                    # Make property optional if it's nullable
                    $optional = if ($csharpType -match '\?') { '?' } else { '' }
                    
                    $properties += "    ${propertyName}${optional}: ${tsType};"
                }
            }
            break
        }
    }
    
    return $properties
}

function Generate-DTOInterfaces {
    param(
        [array]$DTOs,
        [string]$ServiceName,
        [string]$OutputPath
    )
    
    if ($DTOs.Count -eq 0) { return }
    
    $modelFileName = "$($ServiceName)Models.ts"
    $modelPath = Join-Path $OutputPath "Models\$modelFileName"
    $dtosPath = ".\DTOs"
    
    $content = @"
// Auto-generated DTO interfaces for $ServiceName
"@

    foreach ($dto in $DTOs) {
        # Clean up DTO name - remove List< prefix and any trailing >
        $cleanDtoName = $dto -replace '^List<', '' -replace '>$', ''
        
        # Parse properties from C# DTO files
        $properties = Parse-CSharpProperties -DtoName $cleanDtoName -DtosPath $dtosPath
        
        $content += @"

export interface $cleanDtoName {
"@
        
        if ($properties.Count -gt 0) {
            foreach ($property in $properties) {
                $content += "`n$property"
            }
        } else {
            # Fallback to basic properties if parsing fails
            $content += @"
    id?: number;
    isDeleted?: boolean;
    createdDate?: Date;
    updatedDate?: Date;
"@
        }
        
        $content += @"
}
"@
    }
    
    New-Item -Path (Split-Path $modelPath) -ItemType Directory -Force | Out-Null
    Set-Content -Path $modelPath -Value $content -Encoding UTF8
    
    return $modelPath
}

function Parse-ControllerMethods {
    param([string]$FilePath)
    
    $content = Get-Content $FilePath -Raw
    $methods = @()
    $processedMethods = @()  # Simple array to track processed method names
    
    # Find all HTTP attributes and their following methods
    $lines = Get-Content $FilePath
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        
        # Check if line contains HTTP attribute
        if ($line -match '\[Http(Get|Post|Put|Delete|Patch)(?:\("([^"]*)"\))?\]') {
            $httpMethod = $matches[1].ToLower()
            $route = $matches[2]
            
            # Find the next method signature
            for ($j = $i + 1; $j -lt $lines.Count; $j++) {
                if ($lines[$j] -match 'public\s+async\s+Task<ActionResult<ApiResponse<IEnumerable<([^>]+)>>>>\s+(\w+)\s*\(([^)]*)\)') {
                    # Pattern: ActionResult<ApiResponse<IEnumerable<T>>>
                    $returnType = "IEnumerable<$($matches[1])>"
                    $methodName = $matches[2]
                    $parameters = $matches[3]
                } elseif ($lines[$j] -match 'public\s+async\s+Task<ActionResult<ApiResponse<([^>]+)>>>\s+(\w+)\s*\(([^)]*)\)') {
                    # Pattern: ActionResult<ApiResponse<T>>
                    $returnType = $matches[1]
                    $methodName = $matches[2]
                    $parameters = $matches[3]
                } elseif ($lines[$j] -match 'public\s+async\s+Task<ActionResult<IEnumerable<([^>]+)>>>\s+(\w+)\s*\(([^)]*)\)') {
                    # Pattern: ActionResult<IEnumerable<T>>
                    $returnType = "IEnumerable<$($matches[1])>"
                    $methodName = $matches[2]
                    $parameters = $matches[3]
                } elseif ($lines[$j] -match 'public\s+async\s+Task<ActionResult<([^>]+)>>\s+(\w+)\s*\(([^)]*)\)') {
                    # Pattern: ActionResult<T>
                    $returnType = $matches[1]
                    $methodName = $matches[2]
                    $parameters = $matches[3]
                }
                
                if ($returnType -and $methodName) {
                    
                    # Skip if method already processed
                    if ($processedMethods -contains $methodName) {
                        break
                    }
                    $processedMethods += $methodName
                    
                    Write-Host "    Found method: $methodName with route: $route"
                    
                    # Determine TypeScript return type
                    $tsReturnType = "Promise<ApiResponse<any>>"
                    if ($returnType -match 'IEnumerable<(.+)>') {
                        $dtoType = $matches[1]
                        $tsReturnType = if ($dtoType -match 'Dto$') { "Promise<ApiResponse<Models.$dtoType[]>>" } else { "Promise<ApiResponse<$dtoType[]>>" }
                    } elseif ($returnType -match 'List<(.+)>') {
                        $dtoType = $matches[1]
                        $tsReturnType = if ($dtoType -match 'Dto$') { "Promise<ApiResponse<Models.$dtoType[]>>" } else { "Promise<ApiResponse<$dtoType[]>>" }
                    } elseif ($returnType -eq 'bool') {
                        $tsReturnType = "Promise<ApiResponse<boolean>>"
                    } elseif ($returnType -ne 'object') {
                        $tsReturnType = if ($returnType -match 'Dto$') { "Promise<ApiResponse<Models.$returnType>>" } else { "Promise<ApiResponse<$returnType>>" }
                    }
                    
                    # Parse parameters
                    $tsParams = @()
                    $jsParams = @()
                    
                    if ($parameters.Trim() -ne "") {
                        $paramList = $parameters -split ',' | ForEach-Object { $_.Trim() }
                        foreach ($param in $paramList) {
                            # Clean parameter (remove attributes)
                            $cleanParam = $param -replace '\[[^\]]+\]', '' -replace '\s+', ' '
                            $cleanParam = $cleanParam.Trim()
                            
                            if ($cleanParam -match '(\w+)\s+(\w+)') {
                                $paramType = $matches[1]
                                $paramName = $matches[2]
                                
                                # Convert C# types to TypeScript
                                $tsType = switch -Regex ($paramType) {
                                    '^(int|long|double|float|decimal)\??' { 'number' }
                                    '^string\??' { 'string' }
                                    '^bool\??' { 'boolean' }
                                    '^DateTime\??' { 'Date' }
                                    default { 
                                        if ($paramType -match 'Dto$') { "Models.$paramType" }
                                        else { 'any' }
                                    }
                                }
                                
                                $tsParams += "${paramName}: ${tsType}"
                                $jsParams += $paramName
                            }
                        }
                    }
                    
                    $methods += @{
                        Name = $methodName
                        HttpMethod = $httpMethod
                        Route = $route
                        TsParams = ($tsParams -join ', ')
                        JsParams = ($jsParams -join ', ')
                        ReturnType = $tsReturnType
                    }
                    break
                }
            }
        }
    }
    
    return $methods
}

function Generate-ServiceInterface {
    param(
        [string]$ServiceName,
        [array]$Methods,
        [string]$OutputPath
    )
    
    $interfaceName = "I$ServiceName"
    $serviceName = $ServiceName -replace 'Service$', ''
    $modelImportPath = "../Models/$($serviceName)ServiceModels"
    
    $content = @"
import type { ApiBase } from '../Models/ApiBase';
import type { ApiResponse } from '../Models/ApiResponse';
import type * as Models from '$modelImportPath';

export interface $interfaceName {
"@

    foreach ($method in $Methods) {
        $returnType = if ($method.ReturnType) { $method.ReturnType } else { "Promise<any>" }
        $content += "`n  $($method.Name)($($method.TsParams)): $returnType;"
    }

    $content += "`n}"
    
    $filePath = Join-Path $OutputPath "Interfaces\$interfaceName.ts"
    New-Item -Path (Split-Path $filePath) -ItemType Directory -Force | Out-Null
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    
    return $filePath
}

function Generate-ServiceClass {
    param(
        [string]$ServiceName,
        [string]$ControllerName,
        [array]$Methods,
        [string]$OutputPath
    )
    
    # Determine model import path based on service name
    $modelImportPath = ""
    $serviceName = $ServiceName -replace 'Service$', ''
    
    # Generate model import based on service name
    $modelImportPath = "../Models/$($serviceName)ServiceModels"
    
    $content = @"
import { I$($serviceName)Service } from '../Interfaces/I$($serviceName)Service';
import { ApiResponse } from '../Models/ApiResponse';
import type * as Models from '$modelImportPath';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from "../baseUrl";
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL+'/$ControllerName',
  timeout: DEFAULT_TIMEOUT, // global timeout
  headers: { 
    'Content-Type': 'application/json', 
    Accept: 'application/json',
    'X-Language': CURRENTLANGUAGE 
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = ``Bearer `${token}``;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export class $($serviceName)Service implements I$($serviceName)Service {
  // Add your custom properties and methods here
  
"@

    foreach ($method in $Methods) {
        # Build URL with proper parameter interpolation
        if ($method.Route) {
            # Extract parameter names from route
            $routeParams = @()
            if ($method.Route -match '\{(\w+)\}') {
                $routeParams = [regex]::Matches($method.Route, '\{(\w+)\}') | ForEach-Object { $_.Groups[1].Value }
            }
            
            # Replace route parameters with template literal syntax
            $urlPath = $method.Route
            foreach ($paramName in $routeParams) {
                $urlPath = $urlPath -replace "\{$paramName\}", "`$`{$paramName`}"
            }
            $urlTemplate = "``/$urlPath``"
        } else { 
            $urlTemplate = "''" 
        }
        
        $dataParam = if ($method.JsParams -match '\w*[Dd]to\w*') { 
            ($method.JsParams -split ', ' | Where-Object { $_ -match '\w*[Dd]to\w*' }) | Select-Object -First 1
        } else { $null }
        
        $methodBody = switch ($method.HttpMethod) {
            'get' { 
                if ($method.Route) {
                    # Use the route directly in the string to avoid PowerShell interpolation issues
                    $routeUrl = $method.Route
                    foreach ($paramName in $routeParams) {
                        $routeUrl = $routeUrl -replace "\{$paramName\}", "`$`{$paramName`}"
                    }
                    "try {`n      const res = await api.get(``/$routeUrl``);`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                } else {
                    "try {`n      const res = await api.get('');`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                }
            }
            'post' { 
                if ($method.Route) {
                    # Use the route directly in the string to avoid PowerShell interpolation issues
                    $routeUrl = $method.Route
                    foreach ($paramName in $routeParams) {
                        $routeUrl = $routeUrl -replace "\{$paramName\}", "`$`{$paramName`}"
                    }
                    if ($dataParam) {
                        "try {`n      const res = await api.post(``/$routeUrl``, $dataParam);`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                    } else {
                        "try {`n      const res = await api.post(``/$routeUrl``);`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                    }
                } else {
                    if ($dataParam) {
                        "try {`n      const res = await api.post('', $dataParam);`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                    } else {
                        "try {`n      const res = await api.post('');`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                    }
                }
            }
            'put' { 
                if ($method.Route) {
                    # Use the route directly in the string to avoid PowerShell interpolation issues
                    $routeUrl = $method.Route
                    foreach ($paramName in $routeParams) {
                        $routeUrl = $routeUrl -replace "\{$paramName\}", "`$`{$paramName`}"
                    }
                    if ($dataParam) {
                        "try {`n      const res = await api.put(``/$routeUrl``, $dataParam);`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                    } else {
                        "try {`n      const res = await api.put(``/$routeUrl``);`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                    }
                } else {
                    if ($dataParam) {
                        "try {`n      const res = await api.put('', $dataParam);`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                    } else {
                        "try {`n      const res = await api.put('');`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                    }
                }
            }
            'delete' { 
                if ($method.Route) {
                    # Use the route directly in the string to avoid PowerShell interpolation issues
                    $routeUrl = $method.Route
                    foreach ($paramName in $routeParams) {
                        $routeUrl = $routeUrl -replace "\{$paramName\}", "`$`{$paramName`}"
                    }
                    "try {`n      const res = await api.delete(``/$routeUrl``);`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                } else {
                    "try {`n      const res = await api.delete('');`n      return res.data;`n    } catch (err: any) {`n      return { Success: false, Message: err.message, Data: undefined };`n    }"
                }
            }
        }
        
        $returnType = if ($method.ReturnType) { $method.ReturnType } else { "Promise<any>" }
        $content += @"

  async $($method.Name)($($method.TsParams)): $returnType {
    $methodBody
  }
"@
    }

    $content += "`n}"
    
    # Fix template literal syntax by replacing PowerShell variable expansion with proper JavaScript template literals
    $content = $content -replace '\$\{API_BASE_URL\}', '${API_BASE_URL}'
    $content = $content -replace '\$\{this\.api\.defaults\.baseURL\}', '${this.api.defaults.baseURL}'
    $content = $content -replace '\$\{([^}]+)\}', '${$1}'
    # Fix template literal formatting - wrap entire template strings with backticks
    $content = $content -replace '`\$\{([^}]+)\}`([^`]*)`\$\{([^}]+)\}`', '`${$1}$2${$3}`'
    $content = $content -replace '`\$\{([^}]+)\}`/([^`]*)', '`${$1}/$2`'
    $content = $content -replace '`\$\{([^}]+)\}`', '`${$1}`'
    
    $filePath = Join-Path $OutputPath "Services\$ServiceName.ts"
    New-Item -Path (Split-Path $filePath) -ItemType Directory -Force | Out-Null
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    
    return $filePath
}

# Main execution
Write-Host "Starting TypeScript client generation..." -ForegroundColor Green

$controllers = Get-ChildItem -Path $ControllerPath -Filter "*.cs"
$generatedFiles = @()

foreach ($controller in $controllers) {
    $controllerName = $controller.BaseName
    $serviceName = $controllerName -replace 'Controller$', 'Service'
    
    Write-Host "Processing: $controllerName" -ForegroundColor Yellow
    
    # Extract DTOs from controller
    $dtos = Extract-DTOsFromController -FilePath $controller.FullName
    $modelFile = $null
    if ($dtos.Count -gt 0) {
        Write-Host "  Found DTOs: $($dtos -join ', ')" -ForegroundColor Cyan
        $modelFile = Generate-DTOInterfaces -DTOs $dtos -ServiceName $serviceName -OutputPath $OutputPath
        Write-Host "  Generated DTO interfaces: $modelFile" -ForegroundColor Green
    }
    
    $methods = Parse-ControllerMethods -FilePath $controller.FullName
    
    if ($methods.Count -gt 0) {
        $interfaceFile = Generate-ServiceInterface -ServiceName $serviceName -Methods $methods -OutputPath $OutputPath
        $serviceFile = Generate-ServiceClass -ServiceName $serviceName -ControllerName $controllerName -Methods $methods -OutputPath $OutputPath
        
        $generatedFiles += @{
            Controller = $controllerName
            Interface = $interfaceFile
            Service = $serviceFile
            ModelFile = $modelFile
            MethodCount = $methods.Count
            DTOCount = if ($dtos) { $dtos.Count } else { 0 }
        }
        
        Write-Host "  Generated: $serviceName ($($methods.Count) methods, $(if ($dtos) { $dtos.Count } else { 0 }) DTOs)" -ForegroundColor Green
    } else {
        Write-Host "  No methods found in $controllerName" -ForegroundColor Red
    }
}

# Generate baseUrl.ts file
Write-Host "`nGenerating baseUrl.ts configuration file..." -ForegroundColor Yellow
$baseUrlContent = @"
// API Base URL Configuration 
// Tüm API servislerinde kullanılacak temel URL 
import i18n from 'i18next'; 

//export const API_BASE_URL: string = "https://api.v3rii.com/api" 
export const API_BASE_URL: string = "http://localhost:5102/api"  
export const DEFAULT_TIMEOUT: number = 10000; 
export const CURRENTLANGUAGE = i18n.language || 'tr'; 

/**
 * Authentication token'ını localStorage'dan alır
 * @returns {string | null} JWT token veya null
 */
export const getAuthToken = (): string | null => {
  // Önce localStorage'dan kontrol et
  const token = localStorage.getItem('authToken');
  if (token) {
    return token;
  }
  
  // Alternatif olarak sessionStorage'dan kontrol et
  const sessionToken = sessionStorage.getItem('authToken');
  if (sessionToken) {
    return sessionToken;
  }
  
  // Token bulunamazsa null döndür
  return null;
};

/**
 * Authentication token'ını localStorage'a kaydeder
 * @param {string} token - JWT token
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

/**
 * Authentication token'ını localStorage'dan siler
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
};

/**
 * Kullanıcının giriş yapıp yapmadığını kontrol eder
 * @returns {boolean} Token varsa true, yoksa false
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
"@

$baseUrlPath = ".\WebApi\baseUrl.ts"
$baseUrlContent | Out-File -FilePath $baseUrlPath -Encoding UTF8
Write-Host "Generated: baseUrl.ts configuration file" -ForegroundColor Green

Write-Host "`nGeneration completed!" -ForegroundColor Green
$totalMethods = ($generatedFiles | ForEach-Object { $_.MethodCount } | Measure-Object -Sum).Sum
$totalDTOs = ($generatedFiles | ForEach-Object { $_.DTOCount } | Measure-Object -Sum).Sum
Write-Host "Generated $($generatedFiles.Count) services with $totalMethods total methods" -ForegroundColor Cyan
Write-Host "Generated $totalDTOs total DTO interfaces" -ForegroundColor Cyan
Write-Host "Generated baseUrl.ts configuration file with authentication functions" -ForegroundColor Cyan

foreach ($file in $generatedFiles) {
    Write-Host "  $($file.Controller): $($file.MethodCount) methods, $($file.DTOCount) DTOs" -ForegroundColor White
}