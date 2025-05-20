import React from 'react';

function WordCard({ word, isSelected, isMatched, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-300
        ${isMatched ? 'bg-green-600' : isSelected ? 'bg-blue-600' : 'bg-slate-700'}
        hover:bg-slate-600
      `}
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold">{word.term}</h3>
        <p className="text-sm mt-2">{word.definition}</p>
      </div>
    </div>
  );
}

export default WordCard;
