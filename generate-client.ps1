param(
    [switch]$CleanFirst
)

Write-Host "Starting TypeScript Client Generation..." -ForegroundColor Green

# Configuration
$webApiPath = ".\WebApi"
$controllersPath = ".\Controllers"

# Clean existing files if requested
if ($CleanFirst) {
    Write-Host "Cleaning existing files..." -ForegroundColor Yellow
    if (Test-Path "$webApiPath\Services") {
        Remove-Item -Path "$webApiPath\Services\*" -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path "$webApiPath\Interfaces") {
        Remove-Item -Path "$webApiPath\Interfaces\*" -Force -ErrorAction SilentlyContinue
    }
}

# Create directories
$dirs = @("$webApiPath\Services", "$webApiPath\Interfaces", "$webApiPath\Models")
foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created: $dir" -ForegroundColor Green
    }
}

# Get controllers
$controllers = Get-ChildItem -Path $controllersPath -Filter "*.cs"
Write-Host "Found $($controllers.Count) controllers" -ForegroundColor Cyan

foreach ($controller in $controllers) {
    $controllerContent = Get-Content $controller.FullName -Raw
    
    # Extract controller class name
    if ($controllerContent -match 'class\s+(\w+Controller)') {
        $controllerClassName = $matches[1]
        $serviceName = $controllerClassName -replace 'Controller$', ''
        
        Write-Host "Processing: $controllerClassName -> $serviceName" -ForegroundColor Yellow
        
        # Generate Interface
        $interfaceContent = @"
// Auto-generated interface for $serviceName
import { ApiResponse } from '../Models/ApiResponse';

export interface I${serviceName}Service {
    GetAll(): Promise<ApiResponse<any>>;
    GetById(id: string): Promise<ApiResponse<any>>;
}
"@
        
        # Write Interface file
        $interfaceFile = "$webApiPath\Interfaces\I$serviceName.ts"
        $interfaceContent | Out-File -FilePath $interfaceFile -Encoding UTF8
        
        # Generate Service
        $serviceContent = @"
// Auto-generated service for $serviceName
import axios, { AxiosInstance } from 'axios';
import { ApiResponse } from '../Models/ApiResponse';
import { I${serviceName}Service } from '../Interfaces/I$serviceName';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE } from '../baseUrl';

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': CURRENTLANGUAGE
    }
});

// Add auth interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${'$'}{token}`;
    }
    return config;
});

export class ${serviceName}Service implements I${serviceName}Service {

    async GetAll(): Promise<ApiResponse<any>> {
        try {
            const response = await api.get('/api/$serviceName');
            return response.data;
        } catch (error: any) {
            return {
                Success: false,
                Message: error.response?.data?.Message || error.message || 'An error occurred',
                Data: null
            };
        }
    }

    async GetById(id: string): Promise<ApiResponse<any>> {
        try {
            const response = await api.get(`/api/$serviceName/${'$'}{id}`);
            return response.data;
        } catch (error: any) {
            return {
                Success: false,
                Message: error.response?.data?.Message || error.message || 'An error occurred',
                Data: null
            };
        }
    }
}
"@
        
        # Write Service file
        $serviceFile = "$webApiPath\Services\$serviceName.ts"
        $serviceContent | Out-File -FilePath $serviceFile -Encoding UTF8
        
        Write-Host "Generated: $serviceName" -ForegroundColor Green
    }
}

Write-Host "Generation Complete!" -ForegroundColor Green