"use client";

import { useState, useEffect, useRef } from 'react';

export function RhythmMetronome() {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const playClick = (isAccent: boolean) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = isAccent ? 1000 : 600;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(isAccent ? 0.5 : 0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = (60 / bpm) * 1000;
      intervalRef.current = setInterval(() => {
        setBeat(prev => {
          const newBeat = (prev + 1) % 4;
          playClick(newBeat === 0);
          return newBeat;
        });
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setBeat(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, bpm]);

  return (
    <div className="my-6 p-6 bg-amber-50 rounded-xl">
      <h4 className="text-lg font-bold text-gray-800 mb-4">🥁 节拍器体验</h4>
      
      <div className="flex justify-center gap-2 mb-6">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
              beat === i && isPlaying
                ? 'bg-amber-500 text-white scale-110'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            isPlaying
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isPlaying ? '⏹ 停止' : '▶ 开始'}
        </button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="text-sm text-gray-600">慢</span>
        <input
          type="range"
          min="40"
          max="120"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-48"
          disabled={isPlaying}
        />
        <span className="text-sm text-gray-600">快</span>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-2">
        {bpm} BPM (每分钟{bpm}拍)
      </p>
    </div>
  );
}
