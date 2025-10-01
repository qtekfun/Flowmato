import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { Platform } from 'react-native';

import {
  TimerStore,
  TimerPhase,
  TimerState,
  TimerConfig,
  TimerSession,
} from '@/types/timer';
import {
  TIMER_DEFAULTS,
  STORAGE_KEYS,
} from '@/constants';
import { createTimerSession, calculateNextPhase } from '@/utils/timer';

// Initialize MMKV storage
const storage = new MMKV();

// Load persisted state
const loadPersistedConfig = (): TimerConfig => {
  try {
    const configStr = storage.getString(STORAGE_KEYS.TIMER_CONFIG);
    if (configStr) {
      const savedConfig = JSON.parse(configStr);
      // Merge with defaults to ensure all fields are present
      return {
        focusDuration: savedConfig.focusDuration || TIMER_DEFAULTS.FOCUS_DURATION,
        shortBreakDuration: savedConfig.shortBreakDuration || TIMER_DEFAULTS.SHORT_BREAK_DURATION,
        longBreakDuration: savedConfig.longBreakDuration || TIMER_DEFAULTS.LONG_BREAK_DURATION,
        longBreakEvery: savedConfig.longBreakEvery || TIMER_DEFAULTS.LONG_BREAK_EVERY,
        totalSessions: savedConfig.totalSessions || TIMER_DEFAULTS.TOTAL_SESSIONS,
        autoStartNext: savedConfig.autoStartNext !== undefined ? savedConfig.autoStartNext : TIMER_DEFAULTS.AUTO_START_NEXT,
        allowPause: savedConfig.allowPause !== undefined ? savedConfig.allowPause : TIMER_DEFAULTS.ALLOW_PAUSE,
      };
    }
  } catch (error) {
    console.warn('Failed to load timer config:', error);
  }

  return {
    focusDuration: TIMER_DEFAULTS.FOCUS_DURATION,
    shortBreakDuration: TIMER_DEFAULTS.SHORT_BREAK_DURATION,
    longBreakDuration: TIMER_DEFAULTS.LONG_BREAK_DURATION,
    longBreakEvery: TIMER_DEFAULTS.LONG_BREAK_EVERY,
    totalSessions: TIMER_DEFAULTS.TOTAL_SESSIONS,
    autoStartNext: TIMER_DEFAULTS.AUTO_START_NEXT,
    allowPause: TIMER_DEFAULTS.ALLOW_PAUSE,
  };
};

const loadCurrentSession = (): TimerSession | null => {
  try {
    const sessionStr = storage.getString(STORAGE_KEYS.CURRENT_SESSION);
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      return {
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined,
      };
    }
  } catch (error) {
    console.warn('Failed to load current session:', error);
  }
  return null;
};

const loadSessionHistory = (): TimerSession[] => {
  try {
    const historyStr = storage.getString(STORAGE_KEYS.SESSION_HISTORY);
    if (historyStr) {
      const history = JSON.parse(historyStr);
      return history.map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined,
      }));
    }
  } catch (error) {
    console.warn('Failed to load session history:', error);
  }
  return [];
};

export const useTimerStore = create<TimerStore>()(
  subscribeWithSelector((set, get) => {
    const config = loadPersistedConfig();
    const currentSession = loadCurrentSession();
    const sessionHistory = loadSessionHistory();

    // Calculate initial state based on persisted session
    let initialPhase: TimerPhase = 'focus';
    let initialTimeRemaining = config.focusDuration * 60;
    let initialState: TimerState = 'idle';
    let sessionCount = 0;

    if (currentSession && !currentSession.completed) {
      initialPhase = currentSession.phase;
      initialState = 'paused';
      sessionCount = sessionHistory.filter(s => s.completed && s.phase === 'focus').length;

      // Calculate remaining time based on elapsed time
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - currentSession.startTime.getTime()) / 1000);
      const totalDuration = currentSession.plannedDuration * 60;
      initialTimeRemaining = Math.max(0, totalDuration - elapsed);
    }

    return {
      // State
      phase: initialPhase,
      state: initialState,
      timeRemaining: initialTimeRemaining,
      sessionCount,
      totalSessions: config.totalSessions,
      isRunning: false,
      isPaused: initialState === 'paused',

      // Configuration
      config,

      // Session tracking
      currentSession,
      sessionHistory,

      // Actions
      start: () => {
        const state = get();
        const now = new Date();

        if (state.state === 'idle' || state.state === 'completed') {
          // Start new session
          const duration = getDurationForPhase(state.phase, state.config);
          const session = createTimerSession(state.phase, duration);

          set({
            state: 'running',
            isRunning: true,
            isPaused: false,
            timeRemaining: duration * 60,
            currentSession: session,
          });

          // Persist session
          storage.set(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
        } else if (state.state === 'paused') {
          // Resume session
          set({
            state: 'running',
            isRunning: true,
            isPaused: false,
          });
        }
      },

      pause: () => {
        const state = get();
        if (state.state === 'running' && state.config.allowPause) {
          set({
            state: 'paused',
            isRunning: false,
            isPaused: true,
          });
        }
      },

      resume: () => {
        const state = get();
        if (state.state === 'paused') {
          set({
            state: 'running',
            isRunning: true,
            isPaused: false,
          });
        }
      },

      reset: () => {
        const state = get();
        const duration = getDurationForPhase(state.phase, state.config);

        // Clear timer interval if running
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }

        set({
          state: 'idle',
          isRunning: false,
          isPaused: false,
          timeRemaining: duration * 60,
          currentSession: null,
        });

        // Clear persisted session
        storage.delete(STORAGE_KEYS.CURRENT_SESSION);
      },

      skip: () => {
        const state = get();

        // Clear timer interval if running
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }

        // Complete current session as interrupted
        if (state.currentSession) {
          const completedSession = {
            ...state.currentSession,
            endTime: new Date(),
            completed: true,
            interrupted: true,
            actualDuration: state.currentSession.plannedDuration - (state.timeRemaining / 60),
          };

          const updatedHistory = [...state.sessionHistory, completedSession];

          set({
            sessionHistory: updatedHistory,
          });

          // Persist updated history
          storage.set(STORAGE_KEYS.SESSION_HISTORY, JSON.stringify(updatedHistory));
        }

        // Move to next phase
        const nextPhase = calculateNextPhase(state.phase, state.sessionCount, state.config);
        const duration = getDurationForPhase(nextPhase, state.config);

        let newSessionCount = state.sessionCount;
        if (state.phase === 'focus') {
          newSessionCount += 1;
        }

        // Check if all sessions are completed
        if (newSessionCount >= state.totalSessions && state.phase === 'focus') {
          set({
            state: 'completed',
            isRunning: false,
            isPaused: false,
            currentSession: null,
          });
        } else {
          set({
            phase: nextPhase,
            state: 'idle',
            isRunning: false,
            isPaused: false,
            timeRemaining: duration * 60,
            sessionCount: newSessionCount,
            currentSession: null,
          });
        }

        // Clear persisted session
        storage.delete(STORAGE_KEYS.CURRENT_SESSION);
      },

      resetDailyProgress: () => {
        const state = get();

        // Clear timer interval if running
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }

        // Reset to initial state
        const duration = getDurationForPhase('focus', state.config);

        set({
          phase: 'focus',
          state: 'idle',
          isRunning: false,
          isPaused: false,
          timeRemaining: duration * 60,
          sessionCount: 0,
          currentSession: null,
          sessionHistory: [],
        });

        // Clear all persisted data
        storage.delete(STORAGE_KEYS.CURRENT_SESSION);
        storage.delete(STORAGE_KEYS.SESSION_HISTORY);
      },

      updateConfig: (newConfig: Partial<TimerConfig>) => {
        const state = get();
        const updatedConfig = { ...state.config, ...newConfig };

        set({
          config: updatedConfig,
          totalSessions: updatedConfig.totalSessions,
        });

        // Persist updated config
        storage.set(STORAGE_KEYS.TIMER_CONFIG, JSON.stringify(updatedConfig));

        // Update time remaining if timer is not running
        if (state.state === 'idle' || state.state === 'completed') {
          const duration = getDurationForPhase(state.phase, updatedConfig);
          set({ timeRemaining: duration * 60 });
        }
      },
    };
  })
);

// Helper function to get duration for a phase
function getDurationForPhase(phase: TimerPhase, config: TimerConfig): number {
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
}

// Subscribe to timer updates and handle countdown
let timerInterval: NodeJS.Timeout | null = null;

useTimerStore.subscribe(
  (state) => state.isRunning,
  (isRunning) => {
    if (isRunning) {
      if (timerInterval) clearInterval(timerInterval);

      timerInterval = setInterval(() => {
        const state = useTimerStore.getState();

        if (state.timeRemaining <= 0) {
          // Timer completed
          clearInterval(timerInterval!);
          timerInterval = null;

          // Complete current session
          if (state.currentSession) {
            const completedSession = {
              ...state.currentSession,
              endTime: new Date(),
              completed: true,
              interrupted: false,
              actualDuration: state.currentSession.plannedDuration,
            };

            const updatedHistory = [...state.sessionHistory, completedSession];

            useTimerStore.setState({
              sessionHistory: updatedHistory,
              state: 'completed',
              isRunning: false,
              currentSession: null,
            });

            // Persist updated history
            storage.set(STORAGE_KEYS.SESSION_HISTORY, JSON.stringify(updatedHistory));
            storage.delete(STORAGE_KEYS.CURRENT_SESSION);
          }

          // Auto-start next session if enabled and not all sessions completed
          if (state.config.autoStartNext) {
            setTimeout(() => {
              const currentState = useTimerStore.getState();

              // Check if all sessions are completed
              let newSessionCount = currentState.sessionCount;
              if (currentState.phase === 'focus') {
                newSessionCount += 1;
              }

              // Don't auto-start if we've completed all sessions for the day
              if (newSessionCount >= currentState.totalSessions && currentState.phase === 'focus') {
                // All sessions completed for the day
                useTimerStore.setState({
                  state: 'completed',
                  isRunning: false,
                });
                return;
              }

              const nextPhase = calculateNextPhase(currentState.phase, currentState.sessionCount, currentState.config);
              const duration = getDurationForPhase(nextPhase, currentState.config);

              useTimerStore.setState({
                phase: nextPhase,
                sessionCount: newSessionCount,
                timeRemaining: duration * 60,
              });

              useTimerStore.getState().start();
            }, 1000);
          }
        } else {
          // Decrement timer
          useTimerStore.setState({
            timeRemaining: state.timeRemaining - 1,
          });
        }
      }, 1000);
    } else {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }
  }
);