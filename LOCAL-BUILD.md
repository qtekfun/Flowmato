# Local Native Build Guide for Flowmato

This guide explains how to build and run the Flowmato app locally on your machine for both iOS and Android using the Expo prebuild/native workflow (no EAS cloud required).

---

## Prerequisites
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
