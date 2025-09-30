import React, { createContext, useContext, ReactNode } from 'react';

interface AudioContextType {
  playSound: (soundName: string) => Promise<void>;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const playSound = async (soundName: string) => {
    // TODO: Implement audio playback
    console.log('Playing sound:', soundName);
  };

  const setVolume = (volume: number) => {
    // TODO: Implement volume control
    console.log('Setting volume:', volume);
  };

  return (
    <AudioContext.Provider value={{ playSound, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}