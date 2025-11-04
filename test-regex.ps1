# Test script to debug regex pattern
$controllerContent = Get-Content ".\Controllers\GrHeaderController.cs" -Raw

Write-Host "Controller content length: $($controllerContent.Length)" -ForegroundColor Yellow

# Test the new ActionResult pattern
$newPattern = '(?s)\[Http(Get|Post|Put|Delete|Patch)(?:\("([^"]*)"\))?\][\s\S]*?public\s+async\s+Task<ActionResult<[^>]*>>\s+(\w+)\s*\(([^)]*)\)'

Write-Host "`nTesting new ActionResult pattern:" -ForegroundColor Cyan
Write-Host $newPattern -ForegroundColor Gray

$matches = [regex]::Matches($controllerContent, $newPattern, [System.Text.RegularExpressions.RegexOptions]::Multiline -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
Write-Host "Found $($matches.Count) matches" -ForegroundColor Green

foreach ($match in $matches) {
    Write-Host "  Method: $($match.Groups[1].Value) - $($match.Groups[3].Value)" -ForegroundColor White
    Write-Host "  Route: '$($match.Groups[2].Value)'" -ForegroundColor White
    Write-Host "  Params: $($match.Groups[4].Value)" -ForegroundColor White
    Write-Host ""
}

# Test even simpler pattern
Write-Host "`nTesting simpler pattern:" -ForegroundColor Cyan
$simplePattern = 'public\s+async\s+Task<ActionResult<[^>]*>>\s+(\w+)\s*\(([^)]*)\)'
$simpleMatches = [regex]::Matches($controllerContent, $simplePattern)
Write-Host "Found $($simpleMatches.Count) method signatures" -ForegroundColor Green

foreach ($match in $simpleMatches) {
    Write-Host "  Method: $($match.Groups[1].Value)" -ForegroundColor White
    Write-Host "  Params: $($match.Groups[2].Value)" -ForegroundColor White
    Write-Host ""
}