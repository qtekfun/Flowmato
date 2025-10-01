# Local Android Build Setup Script
# This script helps set up local Android APK building without EAS

$ErrorActionPreference = "Stop"

Write-Host "🏗 Local Android Build Setup" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

# Check if Java is installed
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "✅ Java found: $javaVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Java not found. Please install JDK 11+" -ForegroundColor Yellow
    Write-Host "Download from: https://adoptium.net/" -ForegroundColor Yellow
}

# Check Android SDK
$androidHome = $env:ANDROID_HOME
if ($androidHome -and (Test-Path $androidHome)) {
    Write-Host "✅ Android SDK found at: $androidHome" -ForegroundColor Green
} else {
    Write-Host "⚠️  ANDROID_HOME not set or Android SDK not found" -ForegroundColor Yellow
    Write-Host "Please install Android Studio or Android SDK" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci

Write-Host ""
Write-Host "🔧 Setting up local build..." -ForegroundColor Yellow

# Install Expo CLI
try {
    $null = Get-Command expo -ErrorAction Stop
    Write-Host "✅ Expo CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "📦 Installing Expo CLI..." -ForegroundColor Yellow
    npm install -g @expo/cli@latest
}

Write-Host ""
Write-Host "🏗 Creating Android project..." -ForegroundColor Yellow
npx expo prebuild --platform android --clear

Write-Host ""
Write-Host "🎯 Local Build Commands" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host "To build APK locally, use these commands:"
Write-Host ""
Write-Host "Debug build:"
Write-Host "  npm run build:local:debug" -ForegroundColor Yellow
Write-Host ""
Write-Host "Release build:"
Write-Host "  npm run build:local" -ForegroundColor Yellow
Write-Host ""
Write-Host "Manual build (in android folder):"
Write-Host "  cd android" -ForegroundColor Yellow
Write-Host "  ./gradlew assembleDebug     # For debug APK" -ForegroundColor Yellow
Write-Host "  ./gradlew assembleRelease   # For release APK" -ForegroundColor Yellow
Write-Host ""

Write-Host "📁 APK Output Location" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host "APK files will be generated in:"
Write-Host "  android/app/build/outputs/apk/debug/     # Debug APKs" -ForegroundColor Yellow
Write-Host "  android/app/build/outputs/apk/release/   # Release APKs" -ForegroundColor Yellow
Write-Host ""

Write-Host "🔑 Android Signing (Optional)" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host "For signed release APKs, you can:"
Write-Host "1. Generate a keystore:"
Write-Host "   keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Add to android/gradle.properties:"
Write-Host "   MYAPP_RELEASE_STORE_FILE=release.keystore" -ForegroundColor Yellow
Write-Host "   MYAPP_RELEASE_KEY_ALIAS=release" -ForegroundColor Yellow
Write-Host "   MYAPP_RELEASE_STORE_PASSWORD=your_password" -ForegroundColor Yellow
Write-Host "   MYAPP_RELEASE_KEY_PASSWORD=your_password" -ForegroundColor Yellow
Write-Host ""

Write-Host "🚀 GitHub Actions Setup" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan
Write-Host "For automated builds in GitHub Actions, add these secrets:"
Write-Host ""
Write-Host "Optional (for signed APKs):"
Write-Host "  ANDROID_KEYSTORE_BASE64      # Base64 encoded keystore file" -ForegroundColor Yellow
Write-Host "  ANDROID_KEYSTORE_PASSWORD    # Keystore password" -ForegroundColor Yellow
Write-Host "  ANDROID_KEY_ALIAS           # Key alias" -ForegroundColor Yellow
Write-Host "  ANDROID_KEY_PASSWORD        # Key password" -ForegroundColor Yellow
Write-Host ""
Write-Host "To encode keystore: certutil -encode release.keystore keystore.base64" -ForegroundColor Yellow
Write-Host ""

Write-Host "✅ Local build setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Try building: npm run build:local:debug" -ForegroundColor Yellow
Write-Host "2. Check APK: android/app/build/outputs/apk/debug/" -ForegroundColor Yellow
Write-Host "3. Install on device: adb install path/to/app.apk" -ForegroundColor Yellow