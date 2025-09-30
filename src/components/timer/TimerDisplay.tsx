import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

import { useTimerStore } from '@/store/timerStore';
import { formatTime, getPhaseColor } from '@/utils/timer';

export default function TimerDisplay() {
  const colorScheme = useColorScheme();
  const { timeRemaining, phase, sessionCount, totalSessions } = useTimerStore();
  
  const phaseColor = getPhaseColor(phase, colorScheme === 'dark');
  
  return (
    <View style={styles.container}>
      {/* Main Timer Display */}
      <View 
        style={[
          styles.timerCircle,
          { borderColor: phaseColor }
        ]}
      >
        <Text 
          style={[
            styles.timerText,
            { color: phaseColor }
          ]}
        >
          {formatTime(timeRemaining)}
        </Text>
      </View>
      
      {/* Phase Label */}
      <Text 
        style={[
          styles.phaseLabel,
          { color: phaseColor }
        ]}
      >
        {getPhaseDisplayName(phase)}
      </Text>
      
      {/* Session Progress */}
      <Text style={[
        styles.sessionProgress,
        { color: colorScheme === 'dark' ? '#D1D5DB' : '#374151' }
      ]}>
        Session {sessionCount + 1} of {totalSessions}
      </Text>
      
      {/* Secondary Info */}
      <Text style={[
        styles.secondaryText,
        { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
      ]}>
        {timeRemaining > 0 ? 'Stay focused!' : 'Time\'s up!'}
      </Text>
    </View>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  timerCircle: {
    width: 256,
    height: 256,
    borderRadius: 128,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 64,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  phaseLabel: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  sessionProgress: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  secondaryText: {
    fontSize: 14,
    textAlign: 'center',
  },
});