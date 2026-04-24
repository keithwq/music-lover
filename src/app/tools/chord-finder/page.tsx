"use client";

import { useState, useEffect } from 'react';
import { PageContainer } from '@/components/Layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PianoKeyboard from '@/components/PianoKeyboard';
import { 
  noteOptions, 
  chordTypes, 
  calculateChordNotes, 
  getNoteWithOctave 
} from '@/components/music/MusicTheory';
import { useAudio, AudioProvider } from '@/components/music/AudioContext';

function ChordFinderContent() {
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [chordNotes, setChordNotes] = useState<string[]>([]);
  const [activeChordNotes, setActiveChordNotes] = useState<string[]>([]);
  const [octave, setOctave] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { initializeTone, playChord, isAudioInitialized, createPolySynth } = useAudio();

  useEffect(() => {
    initializeTone();
  }, [initializeTone]);

  useEffect(() => {
    if (selectedRoot && selectedType) {
      const notes = calculateChordNotes(selectedRoot, selectedType);
      setChordNotes(notes);
    } else {
      setChordNotes([]);
    }
  }, [selectedRoot, selectedType]);

  const playChordSound = async () => {
    if (!isAudioInitialized || chordNotes.length === 0) return;
    
    setIsPlaying(true);
    
    const notesWithOctave = chordNotes.map(note => getNoteWithOctave(note, octave));
    
    setActiveChordNotes(chordNotes);
    
    playChord(notesWithOctave, "2n");
    
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const playArpeggio = async () => {
    if (!isAudioInitialized || chordNotes.length === 0) return;
    
    setIsPlaying(true);
    
    const notesWithOctave = chordNotes.map(note => getNoteWithOctave(note, octave));
    
    setActiveChordNotes(chordNotes);
    
    const polySynth = createPolySynth();
    const now = Tone.now();
    notesWithOctave.forEach((note, index) => {
      polySynth.triggerAttackRelease(note, "8n", now + index * 0.25);
    });
    
    setTimeout(() => {
      setIsPlaying(false);
      polySynth.dispose();
    }, notesWithOctave.length * 250 + 500);
  };
  
  const clearActiveNotes = () => {
    setActiveChordNotes([]);
  };

  const getChordDescription = (chordId: string): string => {
    switch (chordId) {
      case 'major':
        return '大三和弦明亮、欢快，由根音、大三度和纯五度组成。';
      case 'minor':
        return '小三和弦较暗淡、忧伤，由根音、小三度和纯五度组成。';
      case 'diminished':
        return '减和弦紧张、不稳定，由根音、小三度和减五度组成。';
      case 'augmented':
        return '增和弦神秘、不安，由根音、大三度和增五度组成。';
      case 'sus2':
        return '挂二和弦用二度替代三度，声音开阔、未解决。';
      case 'sus4':
        return '挂四和弦用四度替代三度，声音飘浮、期待解决。';
      case 'maj7':
        return '大七和弦在大三和弦上加大七度，音色平滑、有爵士感。';
      case 'min7':
        return '小七和弦在小三和弦上加小七度，音色柔和、忧伤。';
      case 'dom7':
        return '属七和弦在大三和弦上加小七度，制造紧张感，期待解决。';
      default:
        return '';
    }
  };

  const getChordUses = (chordId: string): string => {
    switch (chordId) {
      case 'major':
        return '广泛用于所有音乐风格。常用于大调音阶的 I、IV、V 级和弦。';
      case 'minor':
        return '广泛用于所有音乐风格。构成小调音阶的 i、iv、v 级和弦。';
      case 'diminished':
        return '常用作过渡和弦或制造紧张感后解决。';
      case 'augmented':
        return '用于增加色彩和紧张感，常作为更稳定和弦之间的过渡。';
      case 'sus2':
        return '用于创造开阔的声音或延迟解决到大小三和弦。';
      case 'sus4':
        return '常用于解决到大三和弦之前。营造期待感。';
      case 'maj7':
        return '常见于爵士、R&B 和当代流行音乐。创造精致的音色。';
      case 'min7':
        return '在爵士、灵魂乐和 R&B 中很流行。营造轻松、略忧伤的氛围。';
      case 'dom7':
        return '经典的 V7 和弦，强烈倾向解决到 I 级和弦。';
      default:
        return '';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <h3 className="text-xl font-bold text-gray-800 mb-4">选择和弦</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">根音</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {noteOptions.map((note) => (
                <Button
                  key={note}
                  variant={selectedRoot === note ? 'primary' : 'outline'}
                  onClick={() => setSelectedRoot(note)}
                >
                  {note}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">和弦类型</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {chordTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? 'primary' : 'outline'}
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.name}
                </Button>
              ))}
            </div>
          </div>
          
          {chordNotes.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-medium text-gray-700 mb-2">和弦音符</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {chordNotes.map((note, index) => (
                  <div key={index} className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-medium">
                    {note}
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-2">八度</h4>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setOctave(Math.max(2, octave - 1))}
                    variant="outline"
                    disabled={octave <= 2}
                  >
                    -
                  </Button>
                  <span className="font-medium text-lg text-black">{octave}</span>
                  <Button
                    onClick={() => setOctave(Math.min(6, octave + 1))}
                    variant="outline"
                    disabled={octave >= 6}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-2">钢琴键盘</h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <PianoKeyboard 
                    activeNotes={activeChordNotes} 
                    startOctave={octave} 
                    endOctave={octave} 
                  />
                </div>
                {activeChordNotes.length > 0 && (
                  <button
                    onClick={clearActiveNotes}
                    className="mt-3 text-amber-700 hover:text-amber-600 font-medium"
                  >
                    清除高亮音符
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={playChordSound}
                  disabled={isPlaying}
                >
                  播放和弦
                </Button>
                <Button
                  onClick={playArpeggio}
                  disabled={isPlaying}
                >
                  播放琶音
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
      
      <div>
        <Card>
          <h3 className="text-xl font-bold text-gray-800 mb-4">和弦理论</h3>
          
          {selectedType ? (
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                {chordTypes.find(type => type.id === selectedType)?.name} 和弦
              </h4>
              <p className="text-gray-600 mb-4">
                {getChordDescription(selectedType)}
              </p>
              
              <h4 className="text-lg font-medium text-gray-700 mb-2">常见用途</h4>
              <p className="text-gray-600">
                {getChordUses(selectedType)}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">
              选择和弦类型以查看音乐理论解释。
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}

import * as Tone from 'tone';

export default function ChordFinderTool() {
  return (
    <AudioProvider>
      <PageContainer
        title="和弦查找器"
        description="探索不同的和弦类型并聆听它们的声音。"
        showDashboardLink
      >
        <ChordFinderContent />
      </PageContainer>
    </AudioProvider>
  );
}