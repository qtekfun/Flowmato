# Local Native Build Guide for Flowmato

This guide explains how to build APK files locally without using EAS (Expo Application Services), giving you complete control over the build process.

## 🎯 Two Build Approaches

### 1. EAS-Free Local Build (Recommended)
- ✅ **No EAS dependency** - Build with local Android tools
- ✅ **Free** - No Expo build service costs
- ✅ **GitHub Actions ready** - Automated CI/CD
- ✅ **Full control** - Customize build process

### 2. Traditional Expo Prebuild
- Uses local development workflow
- Requires manual setup of native tools
- Good for development and testing

---

## 🚀 Quick Start (EAS-Free Build)

### Setup Local Build Environment
```bash
# Windows
npm run setup:local

# macOS/Linux
npm run setup:local:bash
```

### Build APK Files
```bash
# Debug build (for testing)
npm run build:local:debug

# Release build (for distribution)
npm run build:local
```

### Find Your APK
- **Debug**: `android/app/build/outputs/apk/debug/`
- **Release**: `android/app/build/outputs/apk/release/`

---

## 📋 Prerequisites
- **Node.js** 18+
- **npm** (or yarn)
- **Expo CLI**: `npm install -g expo-cli`
- **Android Studio** (for Android local build/emulator)
- **Xcode** (for iOS local build/simulator, macOS only)

---

## 1. Install Dependencies
```sh
npm install
```

---

## 2. Prebuild Native Projects
This step generates the native `ios/` and `android/` directories from your Expo config.

```sh
npm run prebuild
# or
expo prebuild
```

---

## 3. Build & Run Locally

### Android (Local Emulator or Device)
```sh
# Open Android emulator or connect a device
npm run android
# or
expo run:android
```

### iOS (Simulator or Device, macOS only)
```sh
# Open iOS simulator or connect a device
npm run ios
# or
expo run:ios
```

---

## 4. Open in Native IDEs (Optional)

### Android Studio
```sh
# After prebuild, open the android/ folder
open -a "Android Studio" android/
```

### Xcode (macOS)
```sh
# After prebuild, open the ios/ workspace
open ios/Flowmato.xcworkspace
```

---

## 5. Build Release APK/IPA Locally

### Android APK (Release)
```sh
cd android
./gradlew assembleRelease
# APK will be in android/app/build/outputs/apk/release/
```

### iOS IPA (Release, macOS only)
```sh
# In Xcode, select "Generic iOS Device" and Product > Archive
# Export IPA via Xcode Organizer
```

---

## Notes
- You can still use `expo start` for fast JS development, but native code changes require prebuild.
- For App Store/Play Store submission, use the release builds above or EAS cloud builds.
- Update `app.json` with your real bundle/package IDs before submitting to stores.

---

For more, see the main `README.md` or Expo docs: https://docs.expo.dev/workflow/prebuild/
