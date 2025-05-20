import React, { useState, useEffect } from 'react';
import WordCard from './WordCard';

const INITIAL_WORDS = [
  { term: 'Baptism', definition: 'A sacred ritual of water immersion symbolizing spiritual cleansing' },
  { term: 'Communion', definition: 'Sacred meal commemorating the Last Supper' },
  { term: 'Gospel', definition: 'The good news of salvation through Jesus Christ' },
  { term: 'Worship', definition: 'Expressing devotion and praise to God' },
  { term: 'Sermon', definition: 'Religious discourse delivered to a congregation' }
];

function GameBoard({ score, setScore }) {
  const [words, setWords] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    const shuffledWords = [...INITIAL_WORDS]
      .sort(() => Math.random() - 0.5)
      .map((word, index) => ({
        ...word,
        id: index,
        isMatched: false
      }));
    setWords(shuffledWords);
  }, []);

  const handleCardClick = (word) => {
    if (!selectedCard) {
      setSelectedCard(word);
    } else {
      if (selectedCard.term === word.term) {
        setMatchedPairs([...matchedPairs, word.term]);
        setScore(score + 10);
      }
      setSelectedCard(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {words.map((word) => (
          <WordCard
            key={word.id}
            word={word}
            isSelected={selectedCard?.id === word.id}
            isMatched={matchedPairs.includes(word.term)}
            onClick={() => handleCardClick(word)}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
