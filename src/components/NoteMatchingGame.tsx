"use client";

import { useState, useEffect } from 'react';

interface Card {
  id: number;
  content: string;
  type: 'note' | 'name';
  pair: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const PAIRS = [
  { note: '🎵 Do', name: 'C' },
  { note: '🎵 Re', name: 'D' },
  { note: '🎵 Mi', name: 'E' },
  { note: '🎵 Fa', name: 'F' },
];

export function NoteMatchingGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    let id = 0;

    PAIRS.forEach((pair) => {
      gameCards.push({
        id: id++,
        content: pair.note,
        type: 'note',
        pair: pair.name,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: id++,
        content: pair.name,
        type: 'name',
        pair: pair.note,
        isFlipped: false,
        isMatched: false,
      });
    });

    // 洗牌
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }

    setCards(gameCards);
    setFlippedCards([]);
    setMatches(0);
    setAttempts(0);
    setGameComplete(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts(attempts + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].pair === cards[second].content) {
        // 匹配成功
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatches(matches + 1);
          
          if (matches + 1 === PAIRS.length) {
            setGameComplete(true);
          }
        }, 500);
      } else {
        // 匹配失败
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="my-6 p-6 bg-blue-50 rounded-xl">
      <h4 className="text-lg font-bold text-gray-800 mb-2">🎮 音符配对游戏</h4>
      <p className="text-sm text-gray-600 mb-4">点击卡片翻转，找到配对的音符和名称！</p>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm">
          <span className="font-medium">匹配: {matches}/{PAIRS.length}</span>
          <span className="ml-4 text-gray-500">尝试: {attempts}</span>
        </div>
        <button
          onClick={initializeGame}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          🔄 重新开始
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isMatched}
            className={`
              aspect-square rounded-lg text-xl font-bold transition-all duration-300
              ${card.isMatched 
                ? 'bg-green-200 text-green-800 cursor-default' 
                : card.isFlipped
                  ? 'bg-white text-gray-800 shadow-md'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
              }
            `}
          >
            {card.isMatched || card.isFlipped ? card.content : '?'}
          </button>
        ))}
      </div>

      {gameComplete && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
          <p className="text-xl font-bold text-green-800">🎉 恭喜你完成游戏！</p>
          <p className="text-sm text-green-600">用了 {attempts} 次尝试</p>
        </div>
      )}
    </div>
  );
}
