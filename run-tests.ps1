# ServiceWindow — Smoke Test Runner
# Run from project root before every push.
# Usage: .\run-tests.ps1

$testDir = Join-Path $PSScriptRoot "tests"

Write-Host "`n==> ServiceWindow Smoke Tests" -ForegroundColor Cyan
Write-Host "    Directory: $testDir`n"

# Install deps if node_modules doesn't exist
if (-not (Test-Path (Join-Path $testDir "node_modules"))) {
    Write-Host "==> Installing test dependencies..." -ForegroundColor Yellow
    Push-Location $testDir
    npm install
    .\node_modules\.bin\playwright install chromium
    Pop-Location
}

# Run tests
Push-Location $testDir
.\node_modules\.bin\playwright test
$exitCode = $LASTEXITCODE
Pop-Location

if ($exitCode -eq 0) {
    Write-Host "`n==> All tests passed. Safe to push." -ForegroundColor Green
} else {
    Write-Host "`n==> Tests FAILED. Do not push until green." -ForegroundColor Red
}

exit $exitCode
