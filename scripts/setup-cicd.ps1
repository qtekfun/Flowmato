# Flowmato CI/CD Setup Script (PowerShell)
# This script helps set up the GitHub Actions pipeline for building APK and IPA files

$ErrorActionPreference = "Stop"

Write-Host "🚀 Flowmato CI/CD Setup" -ForegroundColor Green
Write-Host "=======================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Check if eas.json exists
if (-not (Test-Path "eas.json")) {
    Write-Host "❌ Error: eas.json not found. Please run 'npx eas init' first." -ForegroundColor Red
    exit 1
}

Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

# Check if EAS CLI is installed
try {
    $null = Get-Command eas -ErrorAction Stop
    Write-Host "✅ EAS CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "📦 Installing EAS CLI..." -ForegroundColor Yellow
    npm install -g @expo/cli@latest
}

# Check if user is logged in to Expo
try {
    $whoami = npx expo whoami 2>$null
    Write-Host "✅ Logged in to Expo account: $whoami" -ForegroundColor Green
} catch {
    Write-Host "🔐 Please log in to your Expo account:" -ForegroundColor Yellow
    npx expo login
}

# Get Expo token
Write-Host ""
Write-Host "🔑 Getting your Expo token..." -ForegroundColor Yellow

try {
    $tokenJson = npx expo whoami --json | ConvertFrom-Json
    $expoToken = $tokenJson.accessToken

    if (-not $expoToken) {
        throw "Token not found in response"
    }

    Write-Host "✅ Expo token retrieved" -ForegroundColor Green
} catch {
    Write-Host "❌ Could not retrieve Expo token. Please ensure you're logged in." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📝 GitHub Secrets Setup" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan
Write-Host "Add the following secrets to your GitHub repository:"
Write-Host "(Go to Settings > Secrets and variables > Actions)"
Write-Host ""
Write-Host "Required for all builds:"
Write-Host "EXPO_TOKEN: $expoToken" -ForegroundColor Yellow
Write-Host ""
Write-Host "Required for iOS builds:"
Write-Host "APPLE_ID: your-apple-id@example.com" -ForegroundColor Yellow
Write-Host "APPLE_ID_PASSWORD: your-app-specific-password" -ForegroundColor Yellow
Write-Host "APPLE_TEAM_ID: your-team-id" -ForegroundColor Yellow
Write-Host ""

# Check if credentials are configured
Write-Host "🔧 Checking EAS credentials..." -ForegroundColor Yellow

Write-Host "Checking iOS credentials..."
try {
    npx eas credentials:list --platform ios 2>$null | Out-Null
    Write-Host "✅ iOS credentials configured" -ForegroundColor Green
} catch {
    Write-Host "⚠️  iOS credentials not configured. Run: npx eas credentials:configure:ios" -ForegroundColor Yellow
}

Write-Host "Checking Android credentials..."
try {
    npx eas credentials:list --platform android 2>$null | Out-Null
    Write-Host "✅ Android credentials configured" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Android credentials not configured. Run: npx eas credentials:configure:android" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Next Steps" -ForegroundColor Cyan
Write-Host "============" -ForegroundColor Cyan
Write-Host "1. Add the GitHub secrets listed above"
Write-Host "2. Configure credentials if needed:"
Write-Host "   - iOS: npx eas credentials:configure:ios"
Write-Host "   - Android: npx eas credentials:configure:android"
Write-Host "3. Test the pipeline:"
Write-Host "   - Go to GitHub Actions tab"
Write-Host "   - Run 'Build Mobile Apps' workflow"
Write-Host "   - Choose platform and run"
Write-Host ""
Write-Host "📚 For detailed instructions, see:"
Write-Host "   - CI-CD-README.md"
Write-Host "   - docs/CI-CD-SETUP.md"
Write-Host ""
Write-Host "✨ Setup complete! Your CI/CD pipeline is ready to use." -ForegroundColor Green