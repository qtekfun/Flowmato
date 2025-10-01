import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import TimerDisplay from './src/components/timer/TimerDisplay';
import TimerControls from './src/components/timer/TimerControls';
import ProgressIndicator from './src/components/timer/ProgressIndicator';
import TimerSettings from './src/components/settings/TimerSettings';
import { useTimerStore } from './src/store/timerStore';

export default function App() {
  const colorScheme = useColorScheme();
  const [currentView, setCurrentView] = React.useState<'timer' | 'settings'>('timer');
  const { phase, sessionCount, totalSessions } = useTimerStore();

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={[
          styles.title,
          { color: colorScheme === 'dark' ? '#FFFFFF' : '#111827' }
        ]}>
          Flowmato
        </Text>
        <Text style={[
          styles.subtitle,
          { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
        ]}>
          {getPhaseDisplayName(phase)} • {sessionCount}/{totalSessions}
        </Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setCurrentView('settings')}
        >
          <Text style={[
            styles.headerButtonText,
            { color: colorScheme === 'dark' ? '#60A5FA' : '#2563EB' }
          ]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTimerView = () => (
    <>
      {renderHeader()}
      <ProgressIndicator />
      <TimerDisplay />
      <TimerControls />
      <View style={[
        styles.phaseInfo,
        {
          backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#F9FAFB',
        }
      ]}>
        <Text style={[
          styles.phaseInfoText,
          { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
        ]}>
          {getPhaseDescription(phase)}
        </Text>
      </View>
    </>
  );

  const renderSettingsView = () => (
    <>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentView('timer')}>
          <Text style={[
            styles.backButton,
            { color: colorScheme === 'dark' ? '#60A5FA' : '#2563EB' }
          ]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={[
          styles.screenTitle,
          { color: colorScheme === 'dark' ? '#FFFFFF' : '#111827' }
        ]}>
          Settings
        </Text>
      </View>
      <TimerSettings />
    </>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[
        styles.container,
        {
          backgroundColor: colorScheme === 'dark' ? '#111827' : '#FFFFFF',
        }
      ]}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

        {currentView === 'timer' && renderTimerView()}
        {currentView === 'settings' && renderSettingsView()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function getPhaseDisplayName(phase: string): string {
  switch (phase) {
    case 'focus':
      return 'Focus Time';
    case 'shortBreak':
      return 'Short Break';
    case 'longBreak':
      return 'Long Break';
    default:
      return 'Timer';
  }
}

function getPhaseDescription(phase: string): string {
  switch (phase) {
    case 'focus':
      return 'Time to focus on your most important task';
    case 'shortBreak':
      return 'Take a short break to recharge';
    case 'longBreak':
      return 'Enjoy a longer break - you\'ve earned it!';
    default:
      return 'Ready to start your productivity session?';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  phaseInfo: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
  },
  phaseInfoText: {
    textAlign: 'center',
    fontSize: 14,
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 16,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsText: {
    fontSize: 16,
    textAlign: 'center',
  },
});