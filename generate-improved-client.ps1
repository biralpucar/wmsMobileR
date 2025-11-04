param(
    [switch]$CleanFirst
)

# Configuration
$webApiPath = ".\WebApi"
$controllersPath = ".\Controllers"
$dtosPath = ".\DTOs"

Write-Host "🚀 Starting TypeScript Client Generation..." -ForegroundColor Green

# Clean existing files if requested
if ($CleanFirst) {
    Write-Host "🧹 Cleaning existing WebApi files..." -ForegroundColor Yellow
    
    $dirs = @(
        "$webApiPath\Services",
        "$webApiPath\Interfaces", 
        "$webApiPath\Models"
    )
    
    foreach ($dir in $dirs) {
        if (Test-Path $dir) {
            Remove-Item -Path "$dir\*" -Force -Recurse
            Write-Host "   Cleaned: $dir" -ForegroundColor Gray
        }
    }
}

# Ensure directories exist
$dirs = @(
    "$webApiPath\Services",
    "$webApiPath\Interfaces",
    "$webApiPath\Models"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "   Created: $dir" -ForegroundColor Green
    }
}

# Function to convert C# types to TypeScript
function ConvertCSharpTypeToTypeScript {
    param([string]$csharpType)
    
    # Remove nullable indicators and array brackets for processing
    $cleanType = $csharpType -replace '\?$', '' -replace '\[\]$', ''
    
    $typeMap = @{
        'string' = 'string'
        'int' = 'number'
        'long' = 'number'
        'decimal' = 'number'
        'double' = 'number'
        'float' = 'number'
        'bool' = 'boolean'
        'DateTime' = 'string'
        'Guid' = 'string'
        'object' = 'any'
    }
    
    $tsType = $typeMap[$cleanType]
    if (-not $tsType) {
        $tsType = "Models.$cleanType"
    }
    
    # Handle arrays
    if ($csharpType -match '\[\]$') {
        $tsType += '[]'
    }
    
    # Handle nullables
    if ($csharpType -match '\?$') {
        $tsType += ' | null'
    }
    
    return $tsType
}

# Function to get correct controller name (without "Controller" suffix)
function GetControllerName {
    param([string]$controllerClass)
    
    if ($controllerClass -match '^(.+)Controller$') {
        return $matches[1]
    }
    return $controllerClass
}

# Scan Controllers directory
$controllers = Get-ChildItem -Path $controllersPath -Filter "*.cs" | Where-Object { $_.Name -ne "AuthController.cs" }

Write-Host "🔍 Found $($controllers.Count) controllers to process" -ForegroundColor Cyan

$totalMethods = 0
$totalDtos = 0

foreach ($controller in $controllers) {
    $controllerName = $controller.BaseName
    $controllerContent = Get-Content $controller.FullName -Raw
    
    # Extract controller class name
    if ($controllerContent -match 'class\s+(\w+Controller)\s*:') {
        $controllerClassName = $matches[1]
        $serviceName = GetControllerName $controllerClassName
        
        Write-Host "📝 Processing: $controllerClassName -> $serviceName" -ForegroundColor Yellow
        
        # Extract DTOs used in this controller
        $dtoPattern = '(?:ApiResponse<|ActionResult<ApiResponse<)([^>]+)>'
        $dtoMatches = [regex]::Matches($controllerContent, $dtoPattern)
        $dtos = @()
        foreach ($match in $dtoMatches) {
            $dtoType = $match.Groups[1].Value
            if ($dtoType -notmatch '^(string|int|bool|decimal|double|float|DateTime|Guid)') {
                $dtos += $dtoType
            }
        }
        $dtos = $dtos | Sort-Object -Unique
        
        # Extract HTTP methods
        $methodPattern = '\[Http(Get|Post|Put|Delete)(?:\("([^"]+)"\))?\]\s*\r?\n\s*public\s+async\s+Task<[^>]+>\s+(\w+)\s*\([^)]*\)'
        $methodMatches = [regex]::Matches($controllerContent, $methodPattern)
        
        $methods = @()
        foreach ($match in $methodMatches) {
            $httpMethod = $match.Groups[1].Value
            $route = $match.Groups[2].Value
            $methodName = $match.Groups[3].Value
            
            $methods += @{
                HttpMethod = $httpMethod
                Route = $route
                MethodName = $methodName
            }
        }
        
        # Generate TypeScript Models
        if ($dtos.Count -gt 0) {
            $modelContent = "// Auto-generated DTO interfaces for $serviceName`n"
            foreach ($dto in $dtos) {
                # Find DTO definition in DTOs folder
                $dtoFiles = Get-ChildItem -Path $dtosPath -Filter "*.cs"
                foreach ($dtoFile in $dtoFiles) {
                    $dtoContent = Get-Content $dtoFile.FullName -Raw
                    $classPattern = "class\s+$dto\s*\{([^}]+)\}"
                    if ($dtoContent -match $classPattern) {
                        $classBody = $matches[1]
                        $propPattern = 'public\s+([^{]+?)\s+(\w+)\s*\{\s*get;\s*set;\s*\}'
                        $properties = [regex]::Matches($classBody, $propPattern)
                        
                        $modelContent += "export interface $dto {`n"
                        foreach ($prop in $properties) {
                            $propType = $prop.Groups[1].Value.Trim()
                            $propName = $prop.Groups[2].Value
                            $tsType = ConvertCSharpTypeToTypeScript $propType
                            
                            $optional = if ($propType -match '\?$' -or $propType -match '^string') { '?' } else { '' }
                            $modelContent += "    $propName$optional`: $tsType;`n"
                        }
                        $modelContent += "}`n`n"
                        break
                    }
                }
            }
            
            # Write Models file
            $modelsFile = "$webApiPath\Models\${serviceName}ServiceModels.ts"
            $modelContent | Out-File -FilePath $modelsFile -Encoding UTF8
            Write-Host "   ✅ Generated: ${serviceName}ServiceModels.ts ($($dtos.Count) DTOs)" -ForegroundColor Green
            $totalDtos += $dtos.Count
        }
        
        # Generate Interface
        $interfaceContent = "// Auto-generated interface for $serviceName`n"
        $interfaceContent += "import * as Models from '../Models/${serviceName}ServiceModels';`n"
        $interfaceContent += "import { ApiResponse } from '../Models/ApiResponse';`n`n"
        $interfaceContent += "export interface I${serviceName}Service {`n"
        
        foreach ($method in $methods) {
            $returnType = "Promise<ApiResponse<any>>"
            $interfaceContent += "    $($method.MethodName)(): $returnType;`n"
        }
        
        $interfaceContent += "}"
        
        # Write Interface file
        $interfaceFile = "$webApiPath\Interfaces\I$serviceName.ts"
        $interfaceContent | Out-File -FilePath $interfaceFile -Encoding UTF8
        Write-Host "   ✅ Generated: I$serviceName.ts ($($methods.Count) methods)" -ForegroundColor Green
        
        # Generate Service
        $serviceContent = "// Auto-generated service for $serviceName`n"
        $serviceContent += "import axios, { AxiosInstance } from 'axios';`n"
        $serviceContent += "import { ApiResponse } from '../Models/ApiResponse';`n"
        $serviceContent += "import * as Models from '../Models/${serviceName}ServiceModels';`n"
        $serviceContent += "import { I${serviceName}Service } from '../Interfaces/I$serviceName';`n"
        $serviceContent += "import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE } from '../baseUrl';`n`n"
        
        $serviceContent += "const api: AxiosInstance = axios.create({`n"
        $serviceContent += "    baseURL: API_BASE_URL,`n"
        $serviceContent += "    timeout: DEFAULT_TIMEOUT,`n"
        $serviceContent += "    headers: {`n"
        $serviceContent += "        'Content-Type': 'application/json',`n"
        $serviceContent += "        'Accept-Language': CURRENTLANGUAGE`n"
        $serviceContent += "    }`n"
        $serviceContent += "});`n`n"
        
        $serviceContent += "// Add auth interceptor`n"
        $serviceContent += "api.interceptors.request.use((config) => {`n"
        $serviceContent += "    const token = localStorage.getItem('authToken');`n"
        $serviceContent += "    if (token) {`n"
        $serviceContent += "        config.headers.Authorization = `Bearer `${token}`;`n"
        $serviceContent += "    }`n"
        $serviceContent += "    return config;`n"
        $serviceContent += "});`n`n"
        
        $serviceContent += "export class ${serviceName}Service implements I${serviceName}Service {`n"
        
        foreach ($method in $methods) {
            $httpMethod = $method.HttpMethod.ToLower()
            $route = if ($method.Route) { "/$($method.Route)" } else { "" }
            $endpoint = "/api/$serviceName$route"
            
            $serviceContent += "`n    async $($method.MethodName)(): Promise<ApiResponse<any>> {`n"
            $serviceContent += "        try {`n"
            $serviceContent += "            const response = await api.$httpMethod('$endpoint');`n"
            $serviceContent += "            return response.data;`n"
            $serviceContent += "        } catch (error: any) {`n"
            $serviceContent += "            return {`n"
            $serviceContent += "                Success: false,`n"
            $serviceContent += "                Message: error.response?.data?.Message || error.message || 'An error occurred',`n"
            $serviceContent += "                Data: null`n"
            $serviceContent += "            };`n"
            $serviceContent += "        }`n"
            $serviceContent += "    }`n"
        }
        
        $serviceContent += "}"
        
        # Write Service file
        $serviceFile = "$webApiPath\Services\$serviceName.ts"
        $serviceContent | Out-File -FilePath $serviceFile -Encoding UTF8
        Write-Host "   ✅ Generated: $serviceName.ts ($($methods.Count) methods)" -ForegroundColor Green
        $totalMethods += $methods.Count
    }
}

Write-Host "`n🎉 Generation Complete!" -ForegroundColor Green
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "   Controllers processed: $($controllers.Count)" -ForegroundColor White
Write-Host "   Total methods: $totalMethods" -ForegroundColor White
Write-Host "   Total DTOs: $totalDtos" -ForegroundColor White
Write-Host "`n📁 Generated files in: $webApiPath" -ForegroundColor Yellow
Write-Host "   - Services: TypeScript service classes with Axios" -ForegroundColor Gray
Write-Host "   - Interfaces: TypeScript interfaces" -ForegroundColor Gray
Write-Host "   - Models: DTO type definitions" -ForegroundColor Gray

Write-Host "`n⚠️  Manual steps required:" -ForegroundColor Yellow
Write-Host "   1. Review generated routes and parameters" -ForegroundColor Gray
Write-Host "   2. Update method signatures with correct parameters" -ForegroundColor Gray
Write-Host "   3. Verify DTO property mappings" -ForegroundColor Gray
Write-Host "   4. Test API endpoints" -ForegroundColor Gray