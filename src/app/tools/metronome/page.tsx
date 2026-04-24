"use client";

import { useState, useEffect, useRef } from 'react';
import { PageContainer } from '@/components/Layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function MetronomeTool() {
  const [tempo, setTempo] = useState(100);
  const [timeSignature, setTimeSignature] = useState({ beats: 4, value: 4 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  
  const timeSignatures = [
    { beats: 2, value: 4 },
    { beats: 3, value: 4 },
    { beats: 4, value: 4 },
    { beats: 6, value: 8 },
    { beats: 9, value: 8 },
    { beats: 12, value: 8 },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playClick = (isAccented: boolean) => {
    if (!audioContextRef.current) return;
    
    const osc = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    osc.frequency.value = isAccented ? 1000 : 800;
    
    osc.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    gainNode.gain.value = isAccented ? 0.3 : 0.2;
    
    osc.start();
    osc.stop(audioContextRef.current.currentTime + 0.05);
  };

  const startMetronome = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    
    setIsPlaying(true);
    setCurrentBeat(0);
    
    const intervalDuration = 60000 / tempo;
    
    playClick(true);
    
    let beat = 1;
    
    intervalIdRef.current = setInterval(() => {
      const isAccented = beat === 0;
      playClick(isAccented);
      
      setCurrentBeat(beat);
      
      beat = (beat + 1) % timeSignature.beats;
    }, intervalDuration);
  };

  const stopMetronome = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    
    setIsPlaying(false);
    setCurrentBeat(0);
  };

  const toggleMetronome = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  const handleTempoChange = (newTempo: number) => {
    setTempo(newTempo);
    
    if (isPlaying) {
      stopMetronome();
      setTimeout(() => {
        startMetronome();
      }, 50);
    }
  };

  const handleTimeSignatureChange = (signature: { beats: number, value: number }) => {
    setTimeSignature(signature);
    
    if (isPlaying) {
      stopMetronome();
      setTimeout(() => {
        startMetronome();
      }, 50);
    }
  };

  return (
    <PageContainer
      title="节拍器"
      description="使用互动节拍器工具保持完美节奏。"
      showDashboardLink
    >
      <Card className="max-w-2xl mx-auto p-8">
        {/* 节拍器可视化 */}
        <div className="flex justify-center mb-8">
          <div className="w-64 h-64 rounded-full border-8 border-amber-700 flex items-center justify-center relative">
            <div className="absolute w-full h-full">
              {Array.from({ length: timeSignature.beats }).map((_, index) => (
                <div 
                  key={index} 
                  className={`absolute w-6 h-6 rounded-full transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 ${
                    currentBeat === index 
                      ? 'bg-amber-700 scale-125' 
                      : index === 0 
                        ? 'bg-amber-300' 
                        : 'bg-amber-200'
                  }`}
                  style={{
                    top: '50%',
                    left: '50%',
                    marginLeft: `${Math.cos(2 * Math.PI * index / timeSignature.beats - Math.PI / 2) * 100}px`,
                    marginTop: `${Math.sin(2 * Math.PI * index / timeSignature.beats - Math.PI / 2) * 100}px`,
                  }}
                />
              ))}
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-700 mb-2">{tempo}</div>
              <div className="text-gray-600">BPM</div>
            </div>
          </div>
        </div>
        
        {/* 节拍速度控制 */}
        <div className="mb-8">
          <label htmlFor="tempo-slider" className="block text-lg font-medium text-gray-700 mb-2">
            速度：{tempo} BPM
          </label>
          <input
            id="tempo-slider"
            type="range"
            min="40"
            max="220"
            step="1"
            value={tempo}
            onChange={(e) => handleTempoChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>40</span>
            <span>慢速</span>
            <span>中速</span>
            <span>快速</span>
            <span>220</span>
          </div>
        </div>
        
        {/* 拍号选择 */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            拍号：{timeSignature.beats}/{timeSignature.value}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSignatures.map((sig) => (
              <Button
                key={`${sig.beats}/${sig.value}`}
                variant={sig.beats === timeSignature.beats && sig.value === timeSignature.value ? 'primary' : 'outline'}
                onClick={() => handleTimeSignatureChange(sig)}
              >
                {sig.beats}/{sig.value}
              </Button>
            ))}
          </div>
        </div>
        
        {/* 播放/停止按钮 */}
        <div className="text-center">
          <Button
            onClick={toggleMetronome}
            size="lg"
            className={`px-8 py-4 rounded-full text-lg shadow-md ${
              isPlaying ? 'bg-red-600 hover:bg-red-700' : ''
            }`}
          >
            {isPlaying ? '停止' : '开始'}
          </Button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-2">节拍器使用提示</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• 定期用节拍器练习，提升您的节奏感。</li>
            <li>• 从慢速开始，逐渐加快速度。</li>
            <li>• 尝试不同拍号，练习多种音乐风格。</li>
            <li>• 专注于感受节拍，而不仅仅是听到它。</li>
          </ul>
        </div>
      </Card>
    </PageContainer>
  );
}