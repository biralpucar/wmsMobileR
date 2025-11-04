param(
    [switch]$CleanFirst
)

Write-Host "🚀 Starting TypeScript Client Generation..." -ForegroundColor Green

# Configuration
$webApiPath = ".\WebApi"
$controllersPath = ".\Controllers"

# Clean existing files if requested
if ($CleanFirst) {
    Write-Host "🧹 Cleaning existing files..." -ForegroundColor Yellow
    if (Test-Path "$webApiPath\Services") {
        Remove-Item -Path "$webApiPath\Services\*" -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path "$webApiPath\Interfaces") {
        Remove-Item -Path "$webApiPath\Interfaces\*" -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path "$webApiPath\Models") {
        Remove-Item -Path "$webApiPath\Models\*ServiceModels.ts" -Force -ErrorAction SilentlyContinue
    }
}

# Create directories
$dirs = @("$webApiPath\Services", "$webApiPath\Interfaces", "$webApiPath\Models")
foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "   Created: $dir" -ForegroundColor Green
    }
}

# Get controllers
$controllers = Get-ChildItem -Path $controllersPath -Filter "*.cs" | Where-Object { $_.Name -ne "AuthController.cs" }
Write-Host "🔍 Found $($controllers.Count) controllers" -ForegroundColor Cyan

$totalMethods = 0

foreach ($controller in $controllers) {
    $controllerContent = Get-Content $controller.FullName -Raw
    
    # Extract controller class name
    if ($controllerContent -match 'class\s+(\w+Controller)') {
        $controllerClassName = $matches[1]
        $serviceName = $controllerClassName -replace 'Controller$', ''
        
        Write-Host "📝 Processing: $controllerClassName -> $serviceName" -ForegroundColor Yellow
        
        # Extract methods
        $methodPattern = '\[Http(Get|Post|Put|Delete)(?:\("([^"]+)"\))?\][\s\r\n]*public\s+async\s+Task<[^>]+>\s+(\w+)'
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
        
        if ($methods.Count -gt 0) {
            # Generate Interface
            $interfaceContent = "// Auto-generated interface for $serviceName`n"
            $interfaceContent += "import { ApiResponse } from '../Models/ApiResponse';`n`n"
            $interfaceContent += "export interface I${serviceName}Service {`n"
            
            foreach ($method in $methods) {
                $interfaceContent += "    $($method.MethodName)(): Promise<ApiResponse<any>>;`n"
            }
            
            $interfaceContent += "}"
            
            # Write Interface file
            $interfaceFile = "$webApiPath\Interfaces\I$serviceName.ts"
            $interfaceContent | Out-File -FilePath $interfaceFile -Encoding UTF8
            
            # Generate Service
            $serviceContent = "// Auto-generated service for $serviceName`n"
            $serviceContent += "import axios, { AxiosInstance } from 'axios';`n"
            $serviceContent += "import { ApiResponse } from '../Models/ApiResponse';`n"
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
            $serviceContent += "        config.headers.Authorization = ``Bearer $${token}``;`n"
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
            
            Write-Host "   ✅ Generated: $serviceName ($($methods.Count) methods)" -ForegroundColor Green
            $totalMethods += $methods.Count
        }
    }
}

Write-Host "`n🎉 Generation Complete!" -ForegroundColor Green
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "   Controllers processed: $($controllers.Count)" -ForegroundColor White
Write-Host "   Total methods: $totalMethods" -ForegroundColor White
Write-Host "`n📁 Generated files in: $webApiPath" -ForegroundColor Yellow