"use client";

import { useState } from 'react';

interface Note {
  name: string;
  position: number;
  clef: 'treble' | 'bass';
}

const TREBLE_NOTES: Note[] = [
  { name: 'E', position: 0, clef: 'treble' },   // 下加一线
  { name: 'F', position: 1, clef: 'treble' },   // 下加一间
  { name: 'G', position: 2, clef: 'treble' },   // 第一线
  { name: 'A', position: 3, clef: 'treble' },   // 第一间
  { name: 'B', position: 4, clef: 'treble' },   // 第二线
  { name: 'C', position: 5, clef: 'treble' },   // 第二间
  { name: 'D', position: 6, clef: 'treble' },   // 第三线
  { name: 'E', position: 7, clef: 'treble' },   // 第三间
  { name: 'F', position: 8, clef: 'treble' },   // 第四线
  { name: 'G', position: 9, clef: 'treble' },   // 第四间
  { name: 'A', position: 10, clef: 'treble' },  // 第五线
];

export function StaffVisualizer() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const randomNote = () => {
    const note = TREBLE_NOTES[Math.floor(Math.random() * TREBLE_NOTES.length)];
    setSelectedNote(note);
    setShowAnswer(false);
  };

  const getYPosition = (position: number) => {
    // 从下往上，位置越高，y值越小
    return 140 - (position * 10);
  };

  return (
    <div className="my-6 p-6 bg-amber-50 rounded-xl">
      <h4 className="text-lg font-bold text-gray-800 mb-4">🎼 五线谱识音小游戏</h4>
      
      {/* 五线谱 SVG */}
      <div className="flex justify-center mb-4">
        <svg width="400" height="180" viewBox="0 0 400 180">
          {/* 五线 */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="50"
              y1={100 - i * 10}
              x2="350"
              y2={100 - i * 10}
              stroke="#333"
              strokeWidth="1"
            />
          ))}
          
          {/* 高音谱号 */}
          <text x="60" y="105" fontSize="60" fill="#333">
            𝄞
          </text>
          
          {/* 音符 */}
          {selectedNote && (
            <g>
              {/* 音符头 */}
              <ellipse
                cx="200"
                cy={getYPosition(selectedNote.position)}
                rx="8"
                ry="6"
                fill="#333"
                transform={`rotate(-15, 200, ${getYPosition(selectedNote.position)})`}
              />
              {/* 符干 */}
              {selectedNote.position < 5 ? (
                <line
                  x1="208"
                  y1={getYPosition(selectedNote.position)}
                  x2="208"
                  y2={getYPosition(selectedNote.position) - 35}
                  stroke="#333"
                  strokeWidth="2"
                />
              ) : (
                <line
                  x1="192"
                  y1={getYPosition(selectedNote.position)}
                  x2="192"
                  y2={getYPosition(selectedNote.position) + 35}
                  stroke="#333"
                  strokeWidth="2"
                />
              )}
              {/* 加线 */}
              {selectedNote.position === 0 && (
                <line x1="190" y1="140" x2="210" y2="140" stroke="#333" strokeWidth="1" />
              )}
              {selectedNote.position === 10 && (
                <line x1="190" y1="40" x2="210" y2="40" stroke="#333" strokeWidth="1" />
              )}
            </g>
          )}
          
          {!selectedNote && (
            <text x="150" y="95" fontSize="16" fill="#999">
              点击"随机音符"开始
            </text>
          )}
        </svg>
      </div>
      
      {/* 控制按钮 */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={randomNote}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
        >
          🎲 随机音符
        </button>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          disabled={!selectedNote}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
        >
          {showAnswer ? '🙈 隐藏答案' : '👀 显示答案'}
        </button>
      </div>
      
      {/* 答案 */}
      {selectedNote && showAnswer && (
        <div className="text-center p-4 bg-green-100 rounded-lg">
          <p className="text-xl font-bold text-green-800">
            这是音符: <span className="text-3xl">{selectedNote.name}</span>
          </p>
          <p className="text-sm text-green-600 mt-1">
            {selectedNote.name === 'C' && 'Do - 中央C'}
            {selectedNote.name === 'D' && 'Re'}
            {selectedNote.name === 'E' && 'Mi'}
            {selectedNote.name === 'F' && 'Fa'}
            {selectedNote.name === 'G' && 'Sol'}
            {selectedNote.name === 'A' && 'La'}
            {selectedNote.name === 'B' && 'Si'}
          </p>
        </div>
      )}
    </div>
  );
}
