import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';

import { NotificationProvider } from '@/providers/NotificationProvider';
import { AudioProvider } from '@/providers/AudioProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import i18n from '@/i18n';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <NotificationProvider>
            <AudioProvider>
              <Stack
                screenOptions={{
                  headerStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff',
                  },
                  headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
                  headerTitleStyle: {
                    fontWeight: '600',
                  },
                }}
              >
                <Stack.Screen
                  name="index"
                  options={{
                    title: 'Flowmato',
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="settings"
                  options={{
                    title: 'Settings',
                    presentation: 'modal',
                  }}
                />
                <Stack.Screen
                  name="stats"
                  options={{
                    title: 'Statistics',
                  }}
                />
              </Stack>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            </AudioProvider>
          </NotificationProvider>
        </ThemeProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}