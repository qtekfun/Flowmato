import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch } from 'react-native';
import { useColorScheme } from 'react-native';

import { useTimerStore } from '@/store/timerStore';
import { TimerConfig } from '@/types/timer';

export default function TimerSettings() {
  const colorScheme = useColorScheme();
  const { config, updateConfig } = useTimerStore();
  
  // Local state for form inputs
  const [localConfig, setLocalConfig] = useState<TimerConfig>(config);
  const [hasChanges, setHasChanges] = useState(false);

  const handleConfigChange = (key: keyof TimerConfig, value: any) => {
    const newConfig = { ...localConfig, [key]: value };
    setLocalConfig(newConfig);
    setHasChanges(true);
  };

  const handleSave = () => {
    updateConfig(localConfig);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalConfig(config);
    setHasChanges(false);
  };

  const renderNumberInput = (
    label: string,
    value: number,
    onChange: (value: number) => void,
    unit: string = 'min',
    min: number = 1,
    max: number = 120
  ) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={[
          styles.settingLabel,
          { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
        ]}>
          {label}
        </Text>
        <Text style={[
          styles.settingUnit,
          { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
        ]}>
          {unit}
        </Text>
      </View>
      <View style={styles.numberInputContainer}>
        <TouchableOpacity
          style={[
            styles.numberButton,
            {
              backgroundColor: colorScheme === 'dark' ? '#374151' : '#F3F4F6',
              borderColor: colorScheme === 'dark' ? '#4B5563' : '#D1D5DB',
            }
          ]}
          onPress={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Text style={[
            styles.numberButtonText,
            {
              color: value <= min 
                ? (colorScheme === 'dark' ? '#6B7280' : '#9CA3AF')
                : (colorScheme === 'dark' ? '#E5E7EB' : '#374151')
            }
          ]}>
            −
          </Text>
        </TouchableOpacity>
        
        <TextInput
          style={[
            styles.numberInput,
            {
              backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
              borderColor: colorScheme === 'dark' ? '#4B5563' : '#D1D5DB',
              color: colorScheme === 'dark' ? '#E5E7EB' : '#374151',
            }
          ]}
          value={value.toString()}
          onChangeText={(text) => {
            const num = parseInt(text) || 0;
            if (num >= min && num <= max) {
              onChange(num);
            }
          }}
          keyboardType="numeric"
          textAlign="center"
        />
        
        <TouchableOpacity
          style={[
            styles.numberButton,
            {
              backgroundColor: colorScheme === 'dark' ? '#374151' : '#F3F4F6',
              borderColor: colorScheme === 'dark' ? '#4B5563' : '#D1D5DB',
            }
          ]}
          onPress={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          <Text style={[
            styles.numberButtonText,
            {
              color: value >= max 
                ? (colorScheme === 'dark' ? '#6B7280' : '#9CA3AF')
                : (colorScheme === 'dark' ? '#E5E7EB' : '#374151')
            }
          ]}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSwitchRow = (
    label: string,
    description: string,
    value: boolean,
    onChange: (value: boolean) => void
  ) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={[
          styles.settingLabel,
          { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
        ]}>
          {label}
        </Text>
        <Text style={[
          styles.settingDescription,
          { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
        ]}>
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
          true: colorScheme === 'dark' ? '#3B82F6' : '#2563EB'
        }}
        thumbColor={value ? '#FFFFFF' : '#9CA3AF'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Timer Durations Section */}
      <View style={styles.section}>
        <Text style={[
          styles.sectionTitle,
          { color: colorScheme === 'dark' ? '#FFFFFF' : '#111827' }
        ]}>
          Timer Durations
        </Text>
        
        {renderNumberInput(
          'Focus Session',
          localConfig.focusDuration,
          (value) => handleConfigChange('focusDuration', value),
          'minutes',
          5,
          120
        )}
        
        {renderNumberInput(
          'Short Break',
          localConfig.shortBreakDuration,
          (value) => handleConfigChange('shortBreakDuration', value),
          'minutes',
          1,
          30
        )}
        
        {renderNumberInput(
          'Long Break',
          localConfig.longBreakDuration,
          (value) => handleConfigChange('longBreakDuration', value),
          'minutes',
          5,
          60
        )}
        
        {renderNumberInput(
          'Long Break Every',
          localConfig.longBreakEvery,
          (value) => handleConfigChange('longBreakEvery', value),
          'sessions',
          2,
          10
        )}
      </View>

      {/* Behavior Section */}
      <View style={styles.section}>
        <Text style={[
          styles.sectionTitle,
          { color: colorScheme === 'dark' ? '#FFFFFF' : '#111827' }
        ]}>
          Behavior
        </Text>
        
        {renderSwitchRow(
          'Auto-start Next Session',
          'Automatically start the next timer when current one ends',
          localConfig.autoStartNext,
          (value) => handleConfigChange('autoStartNext', value)
        )}
        
        {renderSwitchRow(
          'Allow Pause',
          'Enable pause/resume functionality during sessions',
          localConfig.allowPause,
          (value) => handleConfigChange('allowPause', value)
        )}
      </View>

      {/* Action Buttons */}
      {hasChanges && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.resetButton,
              {
                backgroundColor: colorScheme === 'dark' ? '#374151' : '#F3F4F6',
                borderColor: colorScheme === 'dark' ? '#4B5563' : '#D1D5DB',
              }
            ]}
            onPress={handleReset}
          >
            <Text style={[
              styles.actionButtonText,
              { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
            ]}>
              Reset
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.saveButton,
              {
                backgroundColor: colorScheme === 'dark' ? '#3B82F6' : '#2563EB',
              }
            ]}
            onPress={handleSave}
          >
            <Text style={[
              styles.actionButtonText,
              { color: '#FFFFFF' }
            ]}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  settingUnit: {
    fontSize: 14,
  },
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  numberInput: {
    width: 60,
    height: 40,
    marginHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 'auto',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButton: {
    borderWidth: 1,
  },
  saveButton: {
    // No additional styles needed
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});