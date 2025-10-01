#!/bin/bash

# Local Android Build Setup Script
# This script helps set up local Android APK building without EAS

set -e

echo "🏗 Local Android Build Setup"
echo "============================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📋 Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js version: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo "✅ Java found: $JAVA_VERSION"
else
    echo "⚠️  Java not found. Please install JDK 11+"
    echo "Download from: https://adoptium.net/"
fi

# Check Android SDK
if [ -n "$ANDROID_HOME" ] && [ -d "$ANDROID_HOME" ]; then
    echo "✅ Android SDK found at: $ANDROID_HOME"
else
    echo "⚠️  ANDROID_HOME not set or Android SDK not found"
    echo "Please install Android Studio or Android SDK"
fi

echo ""
echo "📦 Installing dependencies..."
npm ci

echo ""
echo "🔧 Setting up local build..."

# Install Expo CLI
if command -v expo &> /dev/null; then
    echo "✅ Expo CLI is installed"
else
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli@latest
fi

echo ""
echo "🏗 Creating Android project..."
npx expo prebuild --platform android --clear

echo ""
echo "🎯 Local Debug Build Commands"
echo "============================="
echo "To build debug APK locally, use these commands:"
echo ""
echo "Debug build (recommended):"
echo "  npm run build:local"
echo "  npm run build:local:debug"
echo ""
echo "Manual build (in android folder):"
echo "  cd android"
echo "  ./gradlew assembleDebug"
echo ""

echo "📁 APK Output Location"
echo "====================="
echo "Debug APK files will be generated in:"
echo "  android/app/build/outputs/apk/debug/"
echo ""

echo "� GitHub Actions Setup"
echo "======================="
echo "The debug build workflow is ready to use!"
echo "- Builds debug APK automatically on push"
echo "- No signing setup required"
echo "- APK files available as GitHub artifacts"
echo ""

echo "✅ Debug build setup complete!"
echo ""
echo "🎯 Next Steps:"
echo "1. Try building: npm run build:local"
echo "2. Check APK: android/app/build/outputs/apk/debug/"
echo "3. Install on device: adb install path/to/app-debug.apk"