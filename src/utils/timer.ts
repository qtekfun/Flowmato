import { TimerPhase, TimerSession, TimerConfig } from '@/types/timer';

/**
 * Creates a new timer session
 */
export function createTimerSession(
  phase: TimerPhase,
  duration: number
): TimerSession {
  return {
    id: generateSessionId(),
    phase,
    plannedDuration: duration,
    actualDuration: 0,
    startTime: new Date(),
    completed: false,
    interrupted: false,
  };
}

/**
 * Calculates the next phase based on current phase and session count
 */
export function calculateNextPhase(
  currentPhase: TimerPhase,
  sessionCount: number,
  config: TimerConfig
): TimerPhase {
  switch (currentPhase) {
    case 'focus':
      // After focus, go to break
      return shouldTakeLongBreak(sessionCount + 1, config.longBreakEvery)
        ? 'longBreak'
        : 'shortBreak';
    case 'shortBreak':
    case 'longBreak':
      // After any break, go to focus
      return 'focus';
    default:
      return 'focus';
  }
}

/**
 * Determines if it's time for a long break
 */
export function shouldTakeLongBreak(
  completedSessions: number,
  longBreakEvery: number
): boolean {
  return completedSessions > 0 && completedSessions % longBreakEvery === 0;
}

/**
 * Formats time in MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats duration in human-readable format
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Calculates completion percentage
 */
export function calculateProgress(
  timeRemaining: number,
  totalDuration: number
): number {
  if (totalDuration === 0) return 0;
  const elapsed = totalDuration - timeRemaining;
  return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
}

/**
 * Generates a unique session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validates timer configuration
 */
export function validateTimerConfig(config: Partial<TimerConfig>): string[] {
  const errors: string[] = [];
  
  if (config.focusDuration !== undefined) {
    if (config.focusDuration < 1 || config.focusDuration > 120) {
      errors.push('Focus duration must be between 1 and 120 minutes');
    }
  }
  
  if (config.shortBreakDuration !== undefined) {
    if (config.shortBreakDuration < 1 || config.shortBreakDuration > 60) {
      errors.push('Short break duration must be between 1 and 60 minutes');
    }
  }
  
  if (config.longBreakDuration !== undefined) {
    if (config.longBreakDuration < 1 || config.longBreakDuration > 120) {
      errors.push('Long break duration must be between 1 and 120 minutes');
    }
  }
  
  if (config.longBreakEvery !== undefined) {
    if (config.longBreakEvery < 2 || config.longBreakEvery > 10) {
      errors.push('Long break interval must be between 2 and 10 sessions');
    }
  }
  
  return errors;
}

/**
 * Reconciles timer state after app restoration
 */
export function reconcileTimerState(
  session: TimerSession,
  currentTime: Date = new Date()
): {
  timeRemaining: number;
  isExpired: boolean;
} {
  const elapsedMs = currentTime.getTime() - session.startTime.getTime();
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const totalDurationSeconds = session.plannedDuration * 60;
  
  const timeRemaining = Math.max(0, totalDurationSeconds - elapsedSeconds);
  const isExpired = timeRemaining === 0;
  
  return {
    timeRemaining,
    isExpired,
  };
}

/**
 * Gets the display color for a timer phase
 */
export function getPhaseColor(phase: TimerPhase, isDark: boolean = false): string {
  const colors = {
    focus: isDark ? '#dc2626' : '#ef4444',
    shortBreak: isDark ? '#16a34a' : '#22c55e',
    longBreak: isDark ? '#2563eb' : '#3b82f6',
  };
  
  return colors[phase];
}

/**
 * Gets the display name for a timer phase
 */
export function getPhaseDisplayName(phase: TimerPhase): string {
  const names = {
    focus: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };
  
  return names[phase];
}