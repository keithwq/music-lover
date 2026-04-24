"use client";

import { useState, useEffect, useRef } from 'react';

export function RhythmTapGame() {
  const [pattern, setPattern] = useState<boolean[]>([true, false, true, false]);
  const [userPattern, setUserPattern] = useState<boolean[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<'listen' | 'tap' | 'result'>('listen');
  const [score, setScore] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const patterns = [
    [true, false, true, false], // 强弱强弱
    [true, true, false, false], // 强强弱弱
    [true, false, false, true], // 强弱弱强
    [true, false, true, true],  // 强弱强强
  ];

  const playBeat = (isStrong: boolean) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = isStrong ? 800 : 400;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const playPattern = async () => {
    setIsPlaying(true);
    setPhase('listen');
    
    for (let i = 0; i < pattern.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      playBeat(pattern[i]);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsPlaying(false);
    setPhase('tap');
    setUserPattern([]);
  };

  const handleTap = (isStrong: boolean) => {
    if (phase !== 'tap') return;
    
    playBeat(isStrong);
    const newPattern = [...userPattern, isStrong];
    setUserPattern(newPattern);
    
    if (newPattern.length === pattern.length) {
      checkResult(newPattern);
    }
  };

  const checkResult = (userPat: boolean[]) => {
    const correct = userPat.every((beat, i) => beat === pattern[i]);
    if (correct) {
      setScore(score + 10);
    }
    setPhase('result');
  };

  const newRound = () => {
    const newPattern = patterns[Math.floor(Math.random() * patterns.length)];
    setPattern(newPattern);
    setUserPattern([]);
    setPhase('listen');
    setTimeout(playPattern, 500);
  };

  return (
    <div className="my-6 p-6 bg-purple-50 rounded-xl">
      <h4 className="text-lg font-bold text-gray-800 mb-2">🎵 节奏模仿游戏</h4>
      <p className="text-sm text-gray-600 mb-4">听节奏，然后模仿拍打！</p>
      
      <div className="text-center mb-4">
        <span className="text-2xl font-bold text-purple-600">得分: {score}</span>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {pattern.map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
              i < userPattern.length
                ? userPattern[i] === pattern[i]
                  ? 'bg-green-400 text-white'
                  : 'bg-red-400 text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {i < userPattern.length ? (userPattern[i] ? '强' : '弱') : '?'}
          </div>
        ))}
      </div>

      <div className="text-center mb-4">
        {phase === 'listen' && (
          <p className="text-amber-600 font-medium">👂 仔细听节奏...</p>
        )}
        {phase === 'tap' && (
          <p className="text-green-600 font-medium">👆 现在模仿拍打！</p>
        )}
        {phase === 'result' && (
          <p className={`font-medium ${
            userPattern.every((beat, i) => beat === pattern[i])
              ? 'text-green-600'
              : 'text-red-600'
          }`}>
            {userPattern.every((beat, i) => beat === pattern[i])
              ? '🎉 完美！'
              : '❌ 再试一次'}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-4">
        {phase === 'tap' ? (
          <>
            <button
              onClick={() => handleTap(true)}
              className="px-6 py-4 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition"
            >
              💪 强拍
            </button>
            <button
              onClick={() => handleTap(false)}
              className="px-6 py-4 bg-blue-400 text-white rounded-lg font-bold hover:bg-blue-500 transition"
            >
              👆 弱拍
            </button>
          </>
        ) : (
          <button
            onClick={newRound}
            disabled={isPlaying}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isPlaying ? '播放中...' : phase === 'result' ? '下一轮' : '开始游戏'}
          </button>
        )}
      </div>
    </div>
  );
}
