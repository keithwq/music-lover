"use client";

import { useState, useRef } from 'react';

interface ScaleNote {
  note: string;
  solfege: string;
  degree: number;
  isWhole: boolean;
}

const C_MAJOR_SCALE: ScaleNote[] = [
  { note: 'C', solfege: 'Do', degree: 1, isWhole: true },
  { note: 'D', solfege: 'Re', degree: 2, isWhole: true },
  { note: 'E', solfege: 'Mi', degree: 3, isWhole: false },
  { note: 'F', solfege: 'Fa', degree: 4, isWhole: true },
  { note: 'G', solfege: 'Sol', degree: 5, isWhole: true },
  { note: 'A', solfege: 'La', degree: 6, isWhole: true },
  { note: 'B', solfege: 'Si', degree: 7, isWhole: false },
  { note: 'C', solfege: 'Do', degree: 8, isWhole: true },
];

const NOTE_FREQUENCIES: Record<string, number> = {
  'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23,
  'G': 392.00, 'A': 440.00, 'B': 493.88, 'C8': 523.25
};

export function ScaleVisualizer() {
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [showPattern, setShowPattern] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playNote = (note: string, index: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    const freq = index === 7 ? NOTE_FREQUENCIES['C8'] : NOTE_FREQUENCIES[note];
    oscillator.frequency.value = freq;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);

    setActiveNote(index);
    setTimeout(() => setActiveNote(null), 300);
  };

  const playScale = async () => {
    for (let i = 0; i < C_MAJOR_SCALE.length; i++) {
      playNote(C_MAJOR_SCALE[i].note, i);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
  };

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
      <h4 className="text-lg font-bold text-gray-800 mb-4">🎹 C大调音阶可视化</h4>
      
      {/* 音阶阶梯 */}
      <div className="flex justify-center items-end gap-1 mb-6 h-48">
        {C_MAJOR_SCALE.map((scaleNote, index) => (
          <button
            key={index}
            onClick={() => playNote(scaleNote.note, index)}
            className={`
              w-12 rounded-t-lg transition-all duration-200 flex flex-col items-center justify-end pb-2
              ${activeNote === index 
                ? 'bg-amber-400 scale-105 shadow-lg' 
                : 'bg-white hover:bg-amber-100 shadow'
              }
            `}
            style={{ height: `${(index + 1) * 20 + 40}px` }}
          >
            <span className="text-xs text-gray-500">{scaleNote.degree}</span>
            <span className="text-lg font-bold text-gray-800">{scaleNote.note}</span>
            <span className="text-xs text-amber-600">{scaleNote.solfege}</span>
          </button>
        ))}
      </div>

      {/* 全半音标记 */}
      <div className="flex justify-center gap-1 mb-4">
        {C_MAJOR_SCALE.slice(0, -1).map((scaleNote, index) => (
          <div key={index} className="w-12 text-center">
            {index < 7 && (
              <div className={`
                text-xs py-1 rounded
                ${showPattern 
                  ? scaleNote.isWhole 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-red-200 text-red-800'
                  : 'bg-gray-100 text-gray-400'
                }
              `}>
                {showPattern ? (scaleNote.isWhole ? '全' : '半') : '?'}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center gap-4">
        <button
          onClick={playScale}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          ▶ 播放音阶
        </button>
        <button
          onClick={() => setShowPattern(!showPattern)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showPattern ? '🙈 隐藏规律' : '👀 显示规律'}
        </button>
      </div>

      {showPattern && (
        <div className="mt-4 p-4 bg-amber-100 rounded-lg text-center">
          <p className="font-bold text-amber-800">
            大调音阶规律：全-全-半-全-全-全-半
          </p>
        </div>
      )}
    </div>
  );
}
