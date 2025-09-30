export const TIMER_DEFAULTS = {
  FOCUS_DURATION: 25, // minutes
  SHORT_BREAK_DURATION: 5, // minutes
  LONG_BREAK_DURATION: 15, // minutes
  LONG_BREAK_EVERY: 4, // sessions
  TOTAL_SESSIONS: 8, // total focus sessions per day
  AUTO_START_NEXT: false,
  ALLOW_PAUSE: true,
} as const;

export const NOTIFICATION_DEFAULTS = {
  ENABLED: true,
  SOUND: true,
  VIBRATION: true,
  CRITICAL_ALERTS: false,
  BYPASS_DND: false,
} as const;

export const AUDIO_DEFAULTS = {
  THEME: 'soft' as const,
  VOLUME: 0.7,
  AMBIENT_SOUND: null,
  AMBIENT_VOLUME: 0.3,
} as const;

export const APP_DEFAULTS = {
  THEME: 'system' as const,
  HIGH_CONTRAST: false,
  LANGUAGE: 'en',
  ANALYTICS: false,
} as const;

export const STORAGE_KEYS = {
  TIMER_CONFIG: 'timer_config',
  APP_SETTINGS: 'app_settings',
  SESSION_HISTORY: 'session_history',
  CURRENT_SESSION: 'current_session',
} as const;

export const NOTIFICATION_CHANNELS = {
  TIMER: 'timer_notifications',
  CRITICAL: 'critical_timer_notifications',
} as const;

export const AUDIO_FILES = {
  soft: 'chime-soft',
  bell: 'chime-bell', 
  marimba: 'chime-marimba',
  woodblock: 'chime-woodblock',
} as const;

export const COLORS = {
  focus: {
    light: '#ef4444',
    dark: '#dc2626',
  },
  shortBreak: {
    light: '#22c55e',
    dark: '#16a34a',
  },
  longBreak: {
    light: '#3b82f6',
    dark: '#2563eb',
  },
} as const;