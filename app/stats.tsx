import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  // Placeholder stats data
  const stats = {
    today: {
      focusTime: 150, // minutes
      sessions: 6,
      completionRate: 85,
    },
    thisWeek: {
      focusTime: 720,
      sessions: 28,
      completionRate: 78,
    },
    thisMonth: {
      focusTime: 3200,
      sessions: 128,
      completionRate: 82,
    },
    streak: 7,
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const renderStatCard = (title: string, stats: any) => (
    <View style={[
      styles.statCard,
      {
        backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#F9FAFB',
        borderColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
      }
    ]}>
      <Text style={[
        styles.statCardTitle,
        { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
      ]}>
        {title}
      </Text>
      
      <View style={styles.statRow}>
        <Text style={[
          styles.statLabel,
          { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
        ]}>
          {t('stats.totalFocusTime')}
        </Text>
        <Text style={[
          styles.statValue,
          { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
        ]}>
          {formatTime(stats.focusTime)}
        </Text>
      </View>
      
      <View style={styles.statRow}>
        <Text style={[
          styles.statLabel,
          { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
        ]}>
          {t('stats.completedSessions')}
        </Text>
        <Text style={[
          styles.statValue,
          { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
        ]}>
          {stats.sessions}
        </Text>
      </View>
      
      <View style={styles.statRow}>
        <Text style={[
          styles.statLabel,
          { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
        ]}>
          {t('stats.completionRate')}
        </Text>
        <Text style={[
          styles.statValue,
          { color: colorScheme === 'dark' ? '#E5E7EB' : '#374151' }
        ]}>
          {stats.completionRate}%
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={[
      styles.container,
      {
        backgroundColor: colorScheme === 'dark' ? '#111827' : '#FFFFFF',
      }
    ]}>
      {/* Current Streak */}
      <View style={[
        styles.streakCard,
        {
          backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#F9FAFB',
          borderColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
        }
      ]}>
        <Text style={[
          styles.streakLabel,
          { color: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280' }
        ]}>
          {t('stats.streak')}
        </Text>
        <Text style={[
          styles.streakValue,
          { color: colorScheme === 'dark' ? '#F59E0B' : '#D97706' }
        ]}>
          {stats.streak} days
        </Text>
      </View>

      {/* Stats Cards */}
      {renderStatCard(t('stats.today'), stats.today)}
      {renderStatCard(t('stats.thisWeek'), stats.thisWeek)}
      {renderStatCard(t('stats.thisMonth'), stats.thisMonth)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  streakCard: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 24,
  },
  streakLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  streakValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  statCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});