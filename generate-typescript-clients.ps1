# PowerShell script to generate TypeScript client services from C# controllers
param(
    [string]$ControllersPath = ".\Controllers",
    [string]$OutputPath = ".\WebApi\Services",
    [string]$InterfacesPath = ".\WebApi\Interfaces",
    [string]$ModelsPath = ".\WebApi\Models"
)

Write-Host "Starting TypeScript client generation..." -ForegroundColor Green

# Ensure output directories exist
if (!(Test-Path $OutputPath)) { New-Item -ItemType Directory -Path $OutputPath -Force }
if (!(Test-Path $InterfacesPath)) { New-Item -ItemType Directory -Path $InterfacesPath -Force }
if (!(Test-Path $ModelsPath)) { New-Item -ItemType Directory -Path $ModelsPath -Force }

# Function to generate base model files
function Generate-BaseModels {
    param([string]$ModelsPath)
    
    # Generate ApiResponse.ts
    $apiResponsePath = Join-Path $ModelsPath "ApiResponse.ts"
    if (!(Test-Path $apiResponsePath)) {
        $apiResponseContent = 'export interface ApiResponse<T> {
  Success: boolean;
  Message: string;
  ExceptionMessage: string;
  Data?: T | null;
  Errors: string[];
  Timestamp: Date;
  StatusCode: number;
  ClassName: string;
}

export interface PagedResponse<T> {
  Data: T[];
  TotalCount: number;
  PageNumber: number;
  PageSize: number;
  TotalPages: number;
  HasPreviousPage: boolean;
  HasNextPage: boolean;
}

export interface PagedResult<T> {
  Items: T[];
  TotalCount: number;
  PageNumber: number;
  PageSize: number;
  TotalPages: number;
  HasPreviousPage: boolean;
  HasNextPage: boolean;
}

export class ApiResponseHelper {
  static createSuccessResponse<T>(data: T, message: string = "Success"): ApiResponse<T> {
    return {
      Success: true,
      Message: message,
      ExceptionMessage: "",
      Data: data,
      Errors: [],
      Timestamp: new Date(),
      StatusCode: 200,
      ClassName: `ApiResponse<${typeof data}>`
    };
  }

  static createErrorResponse<T>(
    message: string, 
    errors: string[] = [], 
    statusCode: number = 500, 
    exceptionMessage: string = ""
  ): ApiResponse<T> {
    return {
      Success: false,
      Message: message,
      ExceptionMessage: exceptionMessage,
      Data: null,
      Errors: errors,
      Timestamp: new Date(),
      StatusCode: statusCode,
      ClassName: `ApiResponse<T>`
    };
  }
}'
        Set-Content -Path $apiResponsePath -Value $apiResponseContent -Encoding UTF8
        Write-Host "Generated base model: $apiResponsePath" -ForegroundColor Cyan
    }
    
    # Generate ApiBase.ts
    $apiBasePath = Join-Path $ModelsPath "ApiBase.ts"
    if (!(Test-Path $apiBasePath)) {
        $apiBaseContent = 'export interface ApiBase {
  Success: boolean;
  Message: string;
  StatusCode: number;
  Timestamp: Date;
}

export interface ApiBaseWithData<T> extends ApiBase {
  Data?: T | null;
}

export interface ApiError extends ApiBase {
  ExceptionMessage: string;
  Errors: string[];
}'
        Set-Content -Path $apiBasePath -Value $apiBaseContent -Encoding UTF8
        Write-Host "Generated base model: $apiBasePath" -ForegroundColor Cyan
    }
}

# Generate base models first
Generate-BaseModels -ModelsPath $ModelsPath

# Get all controller files
$controllerFiles = Get-ChildItem -Path $ControllersPath -Filter "*.cs" | Where-Object { $_.Name -ne "BaseController.cs" }

foreach ($controllerFile in $controllerFiles) {
    Write-Host "Processing controller: $($controllerFile.Name)" -ForegroundColor Yellow
    
    # Extract controller name (remove "Controller.cs")
    $controllerName = $controllerFile.BaseName -replace "Controller$", ""
    $serviceName = "${controllerName}Service"
    $interfaceName = "I${serviceName}"
    
    # Read controller content
    $controllerContent = Get-Content $controllerFile.FullName -Raw
    
    # Extract route from controller
    $routeMatch = [regex]::Match($controllerContent, '\[Route\("([^"]+)"\)\]')
    $baseRoute = if ($routeMatch.Success) { 
        $routeMatch.Groups[1].Value -replace "\[controller\]", $controllerName.ToLower()
    } else { 
        "api/$($controllerName.ToLower())" 
    }
    
    # Extract HTTP methods and their details
    $methods = @()
    # Extract HTTP methods from controller content - using a simpler approach
    # First find all HTTP attributes with their routes
    $httpAttributePattern = '\[Http(Get|Post|Put|Delete|Patch)(?:\("([^"]*)"\))?\]'
    $httpMatches = [regex]::Matches($controllerContent, $httpAttributePattern)
    
    # Then find all method signatures
    $methodSignaturePattern = 'public\s+async\s+Task<ActionResult<[^>]*>>\s+(\w+)\s*\(([^)]*)\)'
    $methodSignatureMatches = [regex]::Matches($controllerContent, $methodSignaturePattern)
    
    # Match them by position in the file
    foreach ($httpMatch in $httpMatches) {
        $httpMethod = $httpMatch.Groups[1].Value.ToLower()
        $route = $httpMatch.Groups[2].Value
        $httpPosition = $httpMatch.Index
        
        # Find the next method signature after this HTTP attribute
        $nextMethod = $methodSignatureMatches | Where-Object { $_.Index -gt $httpPosition } | Select-Object -First 1
        
        if ($nextMethod) {
            $methodName = $nextMethod.Groups[1].Value
            $parameters = $nextMethod.Groups[2].Value
        
        # Parse parameters
        $paramList = @()
        if ($parameters.Trim() -ne "") {
            # Remove attributes and clean up parameters
            $cleanParams = $parameters -replace '\[[^\]]*\]', '' -replace '\s+', ' '
            $paramParts = $cleanParams -split ','
            
            foreach ($param in $paramParts) {
                $param = $param.Trim()
                if ($param -eq "") { continue }
                
                # Match parameter pattern: type name = defaultValue
                if ($param -match '(\w+[\?\[\]]*)\s+(\w+)(?:\s*=\s*[^,]+)?') {
                    $paramType = $Matches[1]
                    $paramName = $Matches[2]
                    
                    # Convert C# types to TypeScript types
                    $tsType = switch -Regex ($paramType) {
                        "^int\??" { "number" }
                        "^long\??" { "number" }
                        "^double\??" { "number" }
                        "^float\??" { "number" }
                        "^decimal\??" { "number" }
                        "^string\??" { "string" }
                        "^bool\??" { "boolean" }
                        "^DateTime\??" { "Date" }
                        "^List<.*>" { "any[]" }
                        ".*Dto$" { "any" }
                        default { "any" }
                    }
                    
                    if ($paramList -eq $null) { $paramList = @() }
                    $paramList += @{
                        Name = $paramName
                        Type = $tsType
                        Optional = $paramType.Contains("?") -or $param.Contains("=")
                    }
                }
            }
        }
        
        # Extract return type for TypeScript
        $tsReturnType = if ($returnType -match "ApiResponse<(.+)>") {
            "ApiBase<$($matches.Groups[1].Value)>"
        } elseif ($returnType -match "ActionResult<(.+)>") {
            "ApiBase<$($matches.Groups[1].Value)>"
        } else {
            "any"
        }
        
        $methods += @{
            HttpMethod = $httpMethod
            Route = $route
            MethodName = $methodName
            Parameters = $paramList
            ReturnType = $tsReturnType
        }
    }
    
    # Generate TypeScript interface
    $interfaceContent = @"
import type { ApiBase } from '../Models/ApiBase';

export interface $interfaceName {
"@
    
    foreach ($method in $methods) {
        $paramString = ""
        if ($method.Parameters.Count -gt 0) {
            $paramParts = @()
            foreach ($param in $method.Parameters) {
                $optional = if ($param.Optional) { "?" } else { "" }
                $paramParts += "$($param.Name)$optional`: $($param.Type)"
            }
            $paramString = $paramParts -join ", "
        }
        
        $interfaceContent += "`n  $($method.MethodName)($paramString): Promise<$($method.ReturnType)>;"
    }
    
    $interfaceContent += "`n}"
    
    # Write interface file
    $interfaceFilePath = Join-Path $InterfacesPath "$interfaceName.ts"
    Set-Content -Path $interfaceFilePath -Value $interfaceContent -Encoding UTF8
    Write-Host "Generated interface: $interfaceFilePath" -ForegroundColor Cyan
    
    # Generate TypeScript service class
    $serviceContent = @"
import axios from 'axios';
import type { ApiBase } from '../Models/ApiBase';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE } from '../baseUrl';
import type { $interfaceName } from '../Interfaces/$interfaceName';

export class $serviceName implements $interfaceName {
  private api = axios.create({
    baseURL: `${'$'}{API_BASE_URL}/$($baseRoute.TrimStart('api/'))`,
    timeout: DEFAULT_TIMEOUT,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Language': CURRENTLANGUAGE },
  });

"@
    
    foreach ($method in $methods) {
        $paramString = ""
        $urlParams = @()
        $queryParams = @()
        $bodyParam = $null
        
        if ($method.Parameters.Count -gt 0) {
            $paramParts = @()
            foreach ($param in $method.Parameters) {
                $optional = if ($param.Optional) { "?" } else { "" }
                $paramParts += "$($param.Name)$optional`: $($param.Type)"
                
                # Determine parameter usage based on HTTP method and route
                if ($method.Route -match "\{$($param.Name)\}") {
                    $urlParams += $param.Name
                } elseif ($method.HttpMethod -in @("post", "put", "patch") -and $param.Type -notin @("number", "string", "boolean")) {
                    $bodyParam = $param.Name
                } else {
                    $queryParams += $param.Name
                }
            }
            $paramString = $paramParts -join ", "
        }
        
        # Build URL
        $url = $method.Route
        foreach ($urlParam in $urlParams) {
            $url = $url -replace "\{$urlParam\}", "`${'$'}{$urlParam}"
        }
        
        # Build query parameters
        $queryString = ""
        if ($queryParams.Count -gt 0) {
            $queryParts = @()
            foreach ($qParam in $queryParams) {
                $queryParts += "$qParam`: $qParam"
            }
            $queryString = ", { params: { $($queryParts -join ', ') } }"
        }
        
        # Build request body
        $bodyString = ""
        if ($bodyParam) {
            $bodyString = ", $bodyParam"
        }
        
        $serviceContent += @"

  async $($method.MethodName)($paramString): Promise<$($method.ReturnType)> {
    try {
      const response = await this.api.$($method.HttpMethod)<$($method.ReturnType)>('$url'$bodyString$queryString);
      return response.data;
    } catch (error: any) {
      return { Success: false, Message: error.message, Data: undefined } as $($method.ReturnType);
    }
  }
"@
    }
    
    $serviceContent += "`n}"
    
    # Write service file
    $serviceFilePath = Join-Path $OutputPath "$serviceName.ts"
    Set-Content -Path $serviceFilePath -Value $serviceContent -Encoding UTF8
    Write-Host "Generated service: $serviceFilePath" -ForegroundColor Cyan
}

Write-Host "TypeScript client generation completed!" -ForegroundColor Green
Write-Host "Generated files in:" -ForegroundColor White
Write-Host "  - Services: $OutputPath" -ForegroundColor White
Write-Host "  - Interfaces: $InterfacesPath" -ForegroundColor White
Write-Host "  - Models: $ModelsPath" -ForegroundColor White
}