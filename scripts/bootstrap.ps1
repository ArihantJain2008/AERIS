$ErrorActionPreference = 'Stop'

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw 'Node.js is required. Install the current Node.js LTS release first.'
}
if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
  throw 'npx was not found. Reinstall Node.js with npm included.'
}

$mobilePath = Join-Path (Get-Location) 'apps/mobile'
if (Test-Path $mobilePath) {
  throw "The target already exists: $mobilePath. Remove it or choose another location before bootstrapping."
}

New-Item -ItemType Directory -Force -Path (Split-Path $mobilePath) | Out-Null
npx create-expo-app@latest $mobilePath --template tabs
if ($LASTEXITCODE -ne 0) {
  throw 'Expo project generation failed. Check npm registry connectivity and retry.'
}

Write-Host ''
Write-Host 'Expo app created in apps/mobile.' -ForegroundColor Green
Write-Host 'Next: cd apps/mobile; npx expo start'
Write-Host 'Review docs/ARCHITECTURE.md before adding backend integrations.'
