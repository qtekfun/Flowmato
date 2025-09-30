import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

import { useTimerStore } from '@/store/timerStore';
import { useTheme } from '@/providers/ThemeProvider';

export default function TimerControls() {
  const colorScheme = useColorScheme();
  const { start, pause, resume, reset, skip, state, config } = useTimerStore();
  
  const handlePrimaryAction = () => {
    switch (state) {
      case 'idle':
      case 'completed':
        start();
        break;
      case 'running':
        if (config.allowPause) {
          pause();
        }
        break;
      case 'paused':
        resume();
        break;
    }
  };

  const getPrimaryButtonText = () => {
    switch (state) {
      case 'idle':
      case 'completed':
        return 'Start';
      case 'running':
        return config.allowPause ? 'Pause' : 'Running';
      case 'paused':
        return 'Resume';
      default:
        return 'Start';
    }
  };

  const isPrimaryDisabled = state === 'running' && !config.allowPause;

  return (
    <View style={styles.container}>
      {/* Primary Action Button */}
      <TouchableOpacity
        style={[
          styles.primaryButton,
          {
            backgroundColor: isPrimaryDisabled 
              ? (colorScheme === 'dark' ? '#374151' : '#E5E7EB')
              : (colorScheme === 'dark' ? '#3B82F6' : '#2563EB'),
          },
          isPrimaryDisabled && styles.disabledButton,
        ]}
        onPress={handlePrimaryAction}
        disabled={isPrimaryDisabled}
      >
        <Text style={[
          styles.primaryButtonText,
          {
            color: isPrimaryDisabled 
              ? (colorScheme === 'dark' ? '#6B7280' : '#9CA3AF')
              : '#FFFFFF',
          }
        ]}>
          {getPrimaryButtonText()}
        </Text>
      </TouchableOpacity>

      {/* Secondary Actions */}
      <View style={styles.secondaryActions}>
        <TouchableOpacity
          style={[
            styles.secondaryButton,
            {
              backgroundColor: colorScheme === 'dark' ? '#374151' : '#F3F4F6',
              borderColor: colorScheme === 'dark' ? '#4B5563' : '#D1D5DB',
            }
          ]}
          onPress={reset}
          disabled={state === 'idle'}
        >
          <Text style={[
            styles.secondaryButtonText,
            {
              color: state === 'idle' 
                ? (colorScheme === 'dark' ? '#6B7280' : '#9CA3AF')
                : (colorScheme === 'dark' ? '#E5E7EB' : '#374151'),
            }
          ]}>
            Reset
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryButton,
            {
              backgroundColor: colorScheme === 'dark' ? '#374151' : '#F3F4F6',
              borderColor: colorScheme === 'dark' ? '#4B5563' : '#D1D5DB',
            }
          ]}
          onPress={skip}
        >
          <Text style={[
            styles.secondaryButtonText,
            {
              color: colorScheme === 'dark' ? '#E5E7EB' : '#374151',
            }
          ]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  primaryButton: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 16,
    minWidth: 120,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 16,
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});