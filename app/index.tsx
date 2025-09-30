import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';

import TimerDisplay from '@/components/timer/TimerDisplay';
import TimerControls from '@/components/timer/TimerControls';
import ProgressIndicator from '@/components/timer/ProgressIndicator';
import { useTimerStore } from '@/store/timerStore';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { 
    phase, 
    isRunning, 
    sessionCount, 
    totalSessions 
  } = useTimerStore();

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: colorScheme === 'dark' ? '#111827' : '#FFFFFF',
      }
    ]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[
            styles.title,
            { color: colorScheme === 'dark' ? '#FFFFFF' : '#111827' }
          ]}>
            {t('app.title')}
          </Text>
          <Text style={[
            styles.subtitle,
            { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
          ]}>
            {t(`phases.${phase}`)} • {sessionCount}/{totalSessions}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Link href="/stats" asChild>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={[
                styles.headerButtonText,
                { color: colorScheme === 'dark' ? '#60A5FA' : '#2563EB' }
              ]}>
                {t('navigation.stats')}
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href="/settings" asChild>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={[
                styles.headerButtonText,
                { color: colorScheme === 'dark' ? '#60A5FA' : '#2563EB' }
              ]}>
                {t('navigation.settings')}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* Progress Indicator */}
      <ProgressIndicator />

      {/* Timer Display */}
      <TimerDisplay />

      {/* Timer Controls */}
      <TimerControls />

      {/* Phase Info */}
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
          {t(`phases.${phase}.description`) || getPhaseDescription(phase)}
        </Text>
      </View>
    </View>
  );
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
    paddingVertical: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
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
});