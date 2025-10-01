import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

import { useTimerStore } from '@/store/timerStore';
import { getPhaseColor } from '@/utils/timer';

export default function ProgressIndicator() {
  const colorScheme = useColorScheme();
  const { phase, sessionCount, totalSessions, timeRemaining, config } = useTimerStore();

  const phaseColor = getPhaseColor(phase, colorScheme === 'dark');

  // Calculate progress for current session
  const getDurationForPhase = () => {
    switch (phase) {
      case 'focus':
        return config.focusDuration;
      case 'shortBreak':
        return config.shortBreakDuration;
      case 'longBreak':
        return config.longBreakDuration;
      default:
        return config.focusDuration;
    }
  };

  const totalDuration = getDurationForPhase() * 60; // in seconds
  const elapsed = totalDuration - timeRemaining;
  const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  return (
    <View style={styles.container}>
      {/* Session Progress */}
      <View style={styles.sessionProgress}>
        <Text style={[
          styles.sessionText,
          { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
        ]}>
          Session {sessionCount + 1} of {totalSessions}
        </Text>

        {/* Session Dots */}
        <View style={styles.sessionDots}>
          {Array.from({ length: totalSessions }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.sessionDot,
                {
                  backgroundColor: index < sessionCount
                    ? phaseColor
                    : (colorScheme === 'dark' ? '#374151' : '#E5E7EB'),
                }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Current Session Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarBackground,
            {
              backgroundColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
            }
          ]}
        >
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progress}%`,
                backgroundColor: phaseColor,
              }
            ]}
          />
        </View>
        <Text style={[
          styles.progressText,
          { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
        ]}>
          {Math.round(progress)}% complete
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sessionProgress: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sessionText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  sessionDots: {
    flexDirection: 'row',
    gap: 8,
  },
  sessionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressBarContainer: {
    alignItems: 'center',
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
  },
});