# Debug script for GrHeaderController
$controllerPath = ".\Controllers\GrHeaderController.cs"
$content = Get-Content $controllerPath -Raw

Write-Host "=== GrHeaderController Content Length: $($content.Length) ==="
Write-Host ""

# Test HTTP attribute pattern
$httpAttributePattern = '\[Http(Get|Post|Put|Delete)(?:\("([^"]+)"\))?\]'
$httpMatches = [regex]::Matches($content, $httpAttributePattern)
Write-Host "=== HTTP Attributes Found: $($httpMatches.Count) ==="
foreach ($match in $httpMatches) {
    Write-Host "  HTTP: $($match.Groups[1].Value), Route: $($match.Groups[2].Value), Position: $($match.Index)"
}
Write-Host ""

# Test method signature pattern - updated
$methodSignaturePattern = 'public\s+async\s+Task<ActionResult<ApiResponse<[^>]+>>>\s+(\w+)\s*\(([^)]*)\)'
$methodMatches = [regex]::Matches($content, $methodSignaturePattern)
Write-Host "=== Method Signatures Found: $($methodMatches.Count) ==="
foreach ($match in $methodMatches) {
    Write-Host "  Method: $($match.Groups[1].Value), Params: $($match.Groups[2].Value), Position: $($match.Index)"
}
Write-Host ""

# Show first few lines of controller
Write-Host "=== First 20 lines of controller ==="
$lines = $content -split "`n"
for ($i = 0; $i -lt [Math]::Min(20, $lines.Length); $i++) {
    Write-Host "$($i+1): $($lines[$i])"
}