export type TimerPhase = 'focus' | 'shortBreak' | 'longBreak';

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerConfig {
  focusDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  longBreakEvery: number; // every N sessions
  autoStartNext: boolean;
  allowPause: boolean;
}

export interface TimerSession {
  id: string;
  phase: TimerPhase;
  plannedDuration: number; // in minutes
  actualDuration: number; // in minutes
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  interrupted: boolean;
}

export interface TimerStore {
  // Current timer state
  phase: TimerPhase;
  state: TimerState;
  timeRemaining: number; // in seconds
  sessionCount: number;
  totalSessions: number;
  isRunning: boolean;
  isPaused: boolean;
  
  // Configuration
  config: TimerConfig;
  
  // Session tracking
  currentSession: TimerSession | null;
  sessionHistory: TimerSession[];
  
  // Actions
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  skip: () => void;
  updateConfig: (config: Partial<TimerConfig>) => void;
}

export interface NotificationConfig {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  criticalAlerts: boolean; // iOS only
  bypassDND: boolean;
}

export interface AudioConfig {
  theme: AudioTheme;
  volume: number; // 0-1
  ambientSound: string | null;
  ambientVolume: number; // 0-1
}

export type AudioTheme = 'soft' | 'bell' | 'marimba' | 'woodblock' | 'none';

export interface AppSettings {
  timer: TimerConfig;
  notifications: NotificationConfig;
  audio: AudioConfig;
  theme: 'light' | 'dark' | 'system';
  highContrast: boolean;
  language: string;
  analytics: boolean;
}

export interface StatsData {
  totalFocusTime: number; // in minutes
  totalBreakTime: number; // in minutes
  completedSessions: number;
  totalSessions: number;
  streak: number;
  lastSessionDate: Date | null;
  weeklyStats: WeeklyStats[];
}

export interface WeeklyStats {
  week: string; // ISO week
  focusTime: number;
  sessions: number;
  completionRate: number;
}