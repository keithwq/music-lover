"use client";

import { useState, useRef } from 'react';

const NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NOTE_FREQUENCIES: Record<string, number> = {
  'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23,
  'G': 392.00, 'A': 440.00, 'B': 493.88
};

export function ScaleEarTraining() {
  const [targetNote, setTargetNote] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playNote = (note: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = NOTE_FREQUENCIES[note];
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  };

  const startNewRound = () => {
    const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)];
    setTargetNote(randomNote);
    setFeedback(null);
    
    // 播放目标音符
    setTimeout(() => playNote(randomNote), 300);
  };

  const handleGuess = (note: string) => {
    if (!targetNote) return;
    
    playNote(note);
    setAttempts(attempts + 1);
    
    if (note === targetNote) {
      setScore(score + 10);
      setFeedback('correct');
      setTimeout(() => {
        startNewRound();
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
      <h4 className="text-lg font-bold text-gray-800 mb-2">👂 音阶听力训练</h4>
      <p className="text-sm text-gray-600 mb-4">听音辨音，提升你的音乐听力！</p>
      
      <div className="text-center mb-4">
        <span className="text-2xl font-bold text-indigo-600">得分: {score}</span>
        <span className="ml-4 text-gray-500">尝试: {attempts}</span>
      </div>

      {!targetNote ? (
        <div className="text-center">
          <button
            onClick={startNewRound}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            🎵 开始训练
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-center mb-6">
            <button
              onClick={() => playNote(targetNote)}
              className="px-6 py-3 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition"
            >
              🔊 再听一次
            </button>
          </div>

          {feedback && (
            <div className={`
              text-center p-4 rounded-lg mb-4 font-bold text-xl
              ${feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
            `}>
              {feedback === 'correct' ? '🎉 正确！' : '❌ 再试试'}
            </div>
          )}

          <div className="grid grid-cols-7 gap-2 max-w-md mx-auto">
            {NOTES.map((note) => (
              <button
                key={note}
                onClick={() => handleGuess(note)}
                disabled={feedback === 'correct'}
                className="
                  aspect-square rounded-lg text-lg font-bold
                  bg-white hover:bg-indigo-100 
                  border-2 border-indigo-200 hover:border-indigo-400
                  transition-all
                "
              >
                {note}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            点击你认为听到的音符
          </p>
        </>
      )}
    </div>
  );
}
