import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useTimerStore } from '@/store/timerStore';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { config, updateConfig } = useTimerStore();

  const [localConfig, setLocalConfig] = useState(config);

  const handleSave = () => {
    updateConfig(localConfig);
    // Navigate back or show confirmation
  };

  const renderSetting = (
    label: string,
    value: boolean | number,
    onValueChange: (value: any) => void,
    type: 'switch' | 'number' = 'switch'
  ) => (
    <View style={[
      styles.settingRow,
      {
        borderBottomColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
      }
    ]}>
      <Text style={[
        styles.settingLabel,
        { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
      ]}>
        {label}
      </Text>
      {type === 'switch' ? (
        <Switch
          value={value as boolean}
          onValueChange={onValueChange}
          trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
          thumbColor={value ? '#FFFFFF' : '#F3F4F6'}
        />
      ) : (
        <TouchableOpacity
          style={[
            styles.numberInput,
            {
              backgroundColor: colorScheme === 'dark' ? '#374151' : '#F9FAFB',
              borderColor: colorScheme === 'dark' ? '#4B5563' : '#D1D5DB',
            }
          ]}
        >
          <Text style={[
            styles.numberInputText,
            { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
          ]}>
            {value} {t('common.minutes')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScrollView style={[
      styles.container,
      {
        backgroundColor: colorScheme === 'dark' ? '#111827' : '#FFFFFF',
      }
    ]}>
      {/* Timer Settings */}
      <View style={styles.section}>
        <Text style={[
          styles.sectionTitle,
          { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
        ]}>
          {t('settings.timer')}
        </Text>

        {renderSetting(
          t('settings.focusDuration'),
          localConfig.focusDuration,
          (value) => setLocalConfig({ ...localConfig, focusDuration: value }),
          'number'
        )}

        {renderSetting(
          t('settings.shortBreakDuration'),
          localConfig.shortBreakDuration,
          (value) => setLocalConfig({ ...localConfig, shortBreakDuration: value }),
          'number'
        )}

        {renderSetting(
          t('settings.longBreakDuration'),
          localConfig.longBreakDuration,
          (value) => setLocalConfig({ ...localConfig, longBreakDuration: value }),
          'number'
        )}

        {renderSetting(
          t('settings.autoStartNext'),
          localConfig.autoStartNext,
          (value) => setLocalConfig({ ...localConfig, autoStartNext: value })
        )}

        {renderSetting(
          t('settings.allowPause'),
          localConfig.allowPause,
          (value) => setLocalConfig({ ...localConfig, allowPause: value })
        )}
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          {
            backgroundColor: colorScheme === 'dark' ? '#3B82F6' : '#2563EB',
          }
        ]}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          {t('common.save')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    flex: 1,
  },
  numberInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  numberInputText: {
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});