"use client";

import { useState } from 'react';

interface PianoKey {
  note: string;
  frequency: number;
  isBlack?: boolean;
}

const PIANO_KEYS: PianoKey[] = [
  { note: 'C4', frequency: 261.63 },
  { note: 'C#4', frequency: 277.18, isBlack: true },
  { note: 'D4', frequency: 293.66 },
  { note: 'D#4', frequency: 311.13, isBlack: true },
  { note: 'E4', frequency: 329.63 },
  { note: 'F4', frequency: 349.23 },
  { note: 'F#4', frequency: 369.99, isBlack: true },
  { note: 'G4', frequency: 392.00 },
  { note: 'G#4', frequency: 415.30, isBlack: true },
  { note: 'A4', frequency: 440.00 },
  { note: 'A#4', frequency: 466.16, isBlack: true },
  { note: 'B4', frequency: 493.88 },
  { note: 'C5', frequency: 523.25 },
];

export function InteractivePiano() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const playNote = (key: PianoKey) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = key.frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    setActiveKey(key.note);
    setTimeout(() => setActiveKey(null), 200);
  };

  const getNoteLabel = (note: string) => {
    const labels: Record<string, string> = {
      'C4': 'Do', 'D4': 'Re', 'E4': 'Mi', 'F4': 'Fa',
      'G4': 'Sol', 'A4': 'La', 'B4': 'Si', 'C5': 'Do'
    };
    return labels[note] || '';
  };

  return (
    <div className="my-6">
      <div className="relative flex justify-center">
        <div className="flex">
          {PIANO_KEYS.filter(k => !k.isBlack).map((key, index) => (
            <button
              key={key.note}
              onClick={() => playNote(key)}
              className={`
                relative w-12 h-32 bg-white border-2 border-gray-400 rounded-b-lg
                hover:bg-gray-100 active:bg-gray-200 transition-all
                flex flex-col justify-end pb-2
                ${activeKey === key.note ? 'bg-amber-100 border-amber-400' : ''}
              `}
            >
              <span className="text-xs text-gray-500">{key.note}</span>
              <span className="text-sm font-bold text-gray-700">{getNoteLabel(key.note)}</span>
            </button>
          ))}
        </div>
        <div className="absolute top-0 flex" style={{ paddingLeft: '36px' }}>
          {PIANO_KEYS.filter(k => k.isBlack).map((key, index) => (
            <button
              key={key.note}
              onClick={() => playNote(key)}
              className={`
                w-8 h-20 bg-gray-900 rounded-b-lg mx-2
                hover:bg-gray-700 active:bg-gray-600 transition-all
                ${activeKey === key.note ? 'bg-amber-600' : ''}
              `}
              style={{ marginRight: index === 1 ? '52px' : '16px' }}
            >
              <span className="text-xs text-gray-400">{key.note}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">🎹 点击琴键听听音符的声音！</p>
    </div>
  );
}
