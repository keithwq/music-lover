"use client";

import { InteractivePiano } from './InteractivePiano';
import { StaffVisualizer } from './StaffVisualizer';
import { NoteMatchingGame } from './NoteMatchingGame';
import { RhythmMetronome } from './RhythmMetronome';
import { RhythmTapGame } from './RhythmTapGame';
import { ScaleVisualizer } from './ScaleVisualizer';
import { ScaleEarTraining } from './ScaleEarTraining';

interface LessonContentProps {
  content: string;
}

export function LessonContent({ content }: LessonContentProps) {
  // 将特殊组件标记替换为实际组件
  const renderContent = () => {
    const parts = content.split(/(<InteractivePiano\s*\/>|<StaffVisualizer\s*\/>|<NoteMatchingGame\s*\/>|<RhythmMetronome\s*\/>|<RhythmTapGame\s*\/>|<ScaleVisualizer\s*\/>|<ScaleEarTraining\s*\/>)/);
    
    return parts.map((part, index) => {
      if (part.trim() === '<InteractivePiano />' || part.trim() === '<InteractivePiano/>') {
        return <InteractivePiano key={index} />;
      }
      if (part.trim() === '<StaffVisualizer />' || part.trim() === '<StaffVisualizer/>') {
        return <StaffVisualizer key={index} />;
      }
      if (part.trim() === '<NoteMatchingGame />' || part.trim() === '<NoteMatchingGame/>') {
        return <NoteMatchingGame key={index} />;
      }
      if (part.trim() === '<RhythmMetronome />' || part.trim() === '<RhythmMetronome/>') {
        return <RhythmMetronome key={index} />;
      }
      if (part.trim() === '<RhythmTapGame />' || part.trim() === '<RhythmTapGame/>') {
        return <RhythmTapGame key={index} />;
      }
      if (part.trim() === '<ScaleVisualizer />' || part.trim() === '<ScaleVisualizer/>') {
        return <ScaleVisualizer key={index} />;
      }
      if (part.trim() === '<ScaleEarTraining />' || part.trim() === '<ScaleEarTraining/>') {
        return <ScaleEarTraining key={index} />;
      }
      // 普通 HTML 内容
      return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  return (
    <div className="lesson-content">
      {renderContent()}
    </div>
  );
}
