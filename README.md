# Flowmato - Production-Grade Pomodoro Timer

A comprehensive, TypeScript-first React Native Pomodoro app with cross-platform support for Android, iOS, Web/PWA, and Desktop (Electron).

## 🚀 Features

### Core Timer Functionality
- **Configurable Timer Phases**: Focus (25min), Short Break (5min), Long Break (15min)
- **Customizable Durations**: Adjust timer lengths to your preference
- **Session Management**: Auto-start next interval, pause/resume, skip functionality
- **Progress Tracking**: Visual progress indicators and session counters
- **Background Reliability**: Timer continues running even when app is backgrounded

### Cross-Platform Support
- **Android**: Native app with App Widgets and Quick Settings Tile
- **iOS**: Native app with WidgetKit widgets and Live Activities
- **Web/PWA**: Installable Progressive Web App with offline support
- **Desktop**: Electron wrapper with tray icon and notifications

### Smart Notifications
- **Respectful Alerts**: Minimal disruption by default, respects Do Not Disturb
- **Configurable Channels**: Different notification priorities and styles
- **Platform-Optimized**: Native notification handling for each platform
- **Focus Mode Integration**: Works with platform focus/DND settings

### Audio & Haptics
- **Multiple Audio Themes**: Soft chime, bell, marimba, woodblock sounds
- **Ambient Soundscapes**: Optional background sounds (rain, coffee shop, white noise)
- **Smart Volume Control**: Per-interval volume settings with battery awareness
- **Haptic Feedback**: Gentle vibrations that respect system settings

### Theming & Accessibility
- **Adaptive Theming**: Light/dark mode with system integration
- **Dynamic Colors**: Android 12+ Material You color support
- **High Contrast Mode**: Enhanced visibility option
- **Full Accessibility**: Screen reader support, large text, WCAG AA compliance

### Localization
- **Multi-Language**: English and Spanish included
- **RTL Support**: Right-to-left language ready infrastructure
- **Regional Formats**: Localized time and date formatting

### Privacy & Security
- **Local-First**: All data stored locally by default
- **Zero Telemetry**: No tracking unless explicitly opted in
- **Secure Storage**: Encrypted local storage for sensitive data
- **Compliance Ready**: iOS Privacy Manifest and Android Data Safety templates

## 📱 Platform Support

| Platform | Status | Features |
|----------|---------|----------|
| Android | ✅ Full | App Widgets, Quick Settings Tile, Foreground Service |
| iOS | ✅ Full | WidgetKit Widgets, Live Activities, Background App Refresh |
| Web/PWA | ✅ Full | Offline support, Install prompt, Service Worker |
| Desktop | ✅ Full | Electron wrapper, Tray icon, Native notifications |

## 🛠 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd flowmato
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run start
   ```

3. **Run on specific platforms:**
   ```bash
   npm run android    # Android
   npm run ios        # iOS
   npm run web        # Web browser
   ```

### Building for Production

```bash
# Android
npm run build:android

# iOS
npm run build:ios

# Web/PWA
npm run build:web

# Desktop (Electron)
npm run build:electron
```

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests (Android)
npm run test:e2e:android

# E2E tests (Web)
npm run test:e2e:web
```

### Test Coverage Requirements
- Lines: 90%
- Statements: 90%
- Branches: 85%
- Functions: 90%

## 📱 Platform-Specific Features

### Android
- **App Widget**: Home screen widget showing current timer status
- **Quick Settings Tile**: Toggle timer from notification panel
- **Foreground Service**: Precise timer when app is backgrounded
- **Battery Optimization**: Guidance for excluding app from optimization

### iOS
- **WidgetKit Widgets**: Small/Medium widgets for home screen
- **Live Activities**: Lock screen and Dynamic Island integration
- **Background App Refresh**: Timer continues when app is backgrounded
- **Focus Mode Integration**: Respect and optionally override Focus settings

### Web/PWA
- **Offline Support**: Full functionality without internet connection
- **Install Prompt**: Native app-like installation experience
- **Service Worker**: Background timer updates and notifications
- **Responsive Design**: Works on all screen sizes

### Desktop
- **System Tray**: Quick access and controls from system tray
- **Native Notifications**: Platform-appropriate notification styling
- **Auto-start**: Optional startup with system boot
- **Single Instance**: Prevents multiple app instances

## ⚙️ Configuration

### Timer Settings
- Focus duration: 1-120 minutes (default: 25)
- Short break: 1-60 minutes (default: 5)
- Long break: 1-120 minutes (default: 15)
- Long break interval: 2-10 sessions (default: 4)

### Notification Settings
- Enable/disable notifications
- Sound themes and volume control
- Haptic feedback preferences
- Critical alert permissions (iOS)

### Privacy Settings
- Analytics opt-in/out
- Data export/import
- Session history management

## 🔒 Privacy & Permissions

### Required Permissions

#### Android
- `POST_NOTIFICATIONS`: Timer completion alerts
- `VIBRATE`: Haptic feedback
- `WAKE_LOCK`: Prevent device sleep during timer
- `RECEIVE_BOOT_COMPLETED`: Restore timer after device restart

#### iOS
- **Notifications**: Timer completion alerts
- **Background App Refresh**: Continue timer when backgrounded

### Data Collection
- **Default**: No data collected or transmitted
- **Optional Telemetry**: Anonymous usage statistics (opt-in only)
- **Local Storage**: All user data stored locally on device

## 🎨 Customization

### Audio Themes
- **Soft**: Gentle chime sounds
- **Bell**: Traditional bell tones
- **Marimba**: Warm wooden percussion
- **Woodblock**: Crisp wooden clicks
- **None**: Silent mode

### Appearance
- **Color Scheme**: Light, Dark, or System
- **High Contrast**: Enhanced visibility mode
- **Dynamic Colors**: Android 12+ Material You integration

## 🌍 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 Documentation

- [Security Guidelines](./SECURITY.md)
- [Privacy Policy](./PRIVACY.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [API Documentation](./docs/)

## 📊 CI/CD Pipeline

- **Continuous Integration**: Automated testing and linting
- **Platform Builds**: Android AAB/APK, iOS IPA, Web bundle
- **Code Coverage**: Automated coverage reporting
- **Release Automation**: Tagged releases with artifacts

## 🐛 Known Issues & Limitations

### Platform Limitations
- **iOS Background**: Limited to 30 seconds of background execution
- **Web Notifications**: Require user interaction for permission
- **Android Battery**: May require manual battery optimization exclusion

### Workarounds
- **Background Reliability**: Use scheduled notifications for timer completion
- **Permission Guidance**: Clear instructions for optimal setup
- **Graceful Degradation**: Fallback behavior when permissions denied

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native and Expo teams for the excellent development platform
- Contributors to open-source libraries used in this project
- Community feedback and feature requests

---

**Ready to boost your productivity? Start your first Pomodoro session! 🍅**