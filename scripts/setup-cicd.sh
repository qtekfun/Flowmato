#!/bin/bash

# Flowmato CI/CD Setup Script
# This script helps set up the GitHub Actions pipeline for building APK and IPA files

set -e

echo "🚀 Flowmato CI/CD Setup"
echo "======================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if eas.json exists
if [ ! -f "eas.json" ]; then
    echo "❌ Error: eas.json not found. Please run 'npx eas init' first."
    exit 1
fi

echo "📋 Checking prerequisites..."

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI..."
    npm install -g @expo/cli@latest
else
    echo "✅ EAS CLI is installed"
fi

# Check if user is logged in to Expo
if ! npx expo whoami &> /dev/null; then
    echo "🔐 Please log in to your Expo account:"
    npx expo login
else
    echo "✅ Logged in to Expo account: $(npx expo whoami)"
fi

# Get Expo token
echo ""
echo "🔑 Getting your Expo token..."
EXPO_TOKEN=$(npx expo whoami --json | jq -r '.accessToken // empty')

if [ -z "$EXPO_TOKEN" ]; then
    echo "❌ Could not retrieve Expo token. Please ensure you're logged in."
    exit 1
fi

echo "✅ Expo token retrieved"
echo ""
echo "📝 GitHub Secrets Setup"
echo "======================="
echo "Add the following secrets to your GitHub repository:"
echo "(Go to Settings > Secrets and variables > Actions)"
echo ""
echo "Required for all builds:"
echo "EXPO_TOKEN: $EXPO_TOKEN"
echo ""
echo "Required for iOS builds:"
echo "APPLE_ID: your-apple-id@example.com"
echo "APPLE_ID_PASSWORD: your-app-specific-password"
echo "APPLE_TEAM_ID: your-team-id"
echo ""

# Check if credentials are configured
echo "🔧 Checking EAS credentials..."

echo "Checking iOS credentials..."
if npx eas credentials:list --platform ios &> /dev/null; then
    echo "✅ iOS credentials configured"
else
    echo "⚠️  iOS credentials not configured. Run: npx eas credentials:configure:ios"
fi

echo "Checking Android credentials..."
if npx eas credentials:list --platform android &> /dev/null; then
    echo "✅ Android credentials configured"
else
    echo "⚠️  Android credentials not configured. Run: npx eas credentials:configure:android"
fi

echo ""
echo "🎯 Next Steps"
echo "============"
echo "1. Add the GitHub secrets listed above"
echo "2. Configure credentials if needed:"
echo "   - iOS: npx eas credentials:configure:ios"
echo "   - Android: npx eas credentials:configure:android"
echo "3. Test the pipeline:"
echo "   - Go to GitHub Actions tab"
echo "   - Run 'Build Mobile Apps' workflow"
echo "   - Choose platform and run"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - CI-CD-README.md"
echo "   - docs/CI-CD-SETUP.md"
echo ""
echo "✨ Setup complete! Your CI/CD pipeline is ready to use."