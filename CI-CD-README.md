# 🚀 CI/CD Pipeline for Flowmato

This repository includes GitHub Actions workflows for automated building of Android APK and iOS IPA files.

## 📁 Workflow Files

- **`build-mobile.yml`**: Production pipeline for building and releasing APK/IPA files
- **`dev-build.yml`**: Development pipeline for quick testing builds

## ⚡ Quick Start

### 1. Setup Expo Token

1. Install EAS CLI: `npm install -g @expo/cli@latest`
2. Login to Expo: `npx expo login`
3. Get your token: `npx expo whoami --json`
4. Add `EXPO_TOKEN` to GitHub repository secrets

### 2. Configure Apple Developer (iOS only)

Add these secrets to your GitHub repository:
- `APPLE_ID` - Your Apple ID email
- `APPLE_ID_PASSWORD` - App-specific password
- `APPLE_TEAM_ID` - Your Apple Developer Team ID

### 3. Run Your First Build

1. Go to `Actions` tab in GitHub
2. Select `Build Mobile Apps`
3. Click `Run workflow`
4. Choose platform and run

## 📋 Build Profiles

| Profile | Purpose | Output |
|---------|---------|--------|
| `development` | Local development | APK (debug) / IPA (simulator) |
| `preview` | Internal testing | APK (release) / IPA (device) |
| `production` | App store release | AAB / IPA |

## 📖 Full Documentation

See [CI-CD-SETUP.md](./docs/CI-CD-SETUP.md) for complete setup instructions.

## 🎯 Features

- ✅ Automated APK/IPA generation
- ✅ GitHub Releases with artifacts
- ✅ Manual workflow triggers
- ✅ Cross-platform builds
- ✅ Type checking and linting
- ✅ Artifact management
- ✅ Build status monitoring

## 🔧 EAS Build Profiles

The pipeline uses optimized EAS build profiles configured in `eas.json`:

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" },
      "ios": { "simulator": false }
    },
    "production": {
      "android": { "buildType": "aab" },
      "ios": { "buildConfiguration": "Release" }
    }
  }
}
```

## 🚨 Important Notes

- iOS builds require Apple Developer account
- First-time setup requires credential configuration
- Build times: 10-20 minutes per platform
- Artifacts are stored for 30 days

## 📞 Support

- Check [Expo documentation](https://docs.expo.dev)
- Review build logs in EAS dashboard
- Join [Expo Discord](https://discord.gg/expo) for community support