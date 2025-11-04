# PowerShell script to add try-catch blocks to all async methods missing them
$servicesPath = "C:\Users\Can\Desktop\VeriiProjects\VERII_WMS\WMS_WEBAPI\WebApi\Services"

Get-ChildItem "$servicesPath\*.ts" | ForEach-Object {
    $filePath = $_.FullName
    $fileName = $_.Name
    $content = Get-Content $filePath -Raw
    
    # Skip index.ts file
    if ($fileName -eq "index.ts") {
        return
    }
    
    Write-Host "Processing: $fileName"
    
    # Pattern to match async methods without try-catch blocks
    # This pattern looks for: async methodName(...): Promise<...> { const response = await api...; return response.data; }
    $pattern = '(?s)(async\s+\w+\s*\([^)]*\):\s*Promise<[^>]+>\s*\{\s*)(const\s+response\s*=\s*await\s+api\.[^;]+;\s*return\s+response\.data;\s*)(\})'
    
    $matches = [regex]::Matches($content, $pattern)
    
    if ($matches.Count -gt 0) {
        Write-Host "  Found $($matches.Count) methods without try-catch blocks"
        
        # Replace each match with try-catch wrapped version
        $newContent = $content
        for ($i = $matches.Count - 1; $i -ge 0; $i--) {
            $match = $matches[$i]
            $methodStart = $match.Groups[1].Value
            $methodBody = $match.Groups[2].Value
            $methodEnd = $match.Groups[3].Value
            
            $replacement = $methodStart + "try {" + $methodBody + "} catch (error) {throw ApiResponseErrorHelper.create(error);}" + $methodEnd
            
            $newContent = $newContent.Substring(0, $match.Index) + $replacement + $newContent.Substring($match.Index + $match.Length)
        }
        
        Set-Content $filePath $newContent -Encoding UTF8
        Write-Host "  Updated: $fileName"
    } else {
        Write-Host "  No changes needed for: $fileName"
    }
}

Write-Host "Completed processing all service files."