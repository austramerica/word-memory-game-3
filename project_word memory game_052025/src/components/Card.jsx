import React from 'react'

export default function Card({ word, isFlipped, isMatched, onClick }) {
  const SmileIcon = () => (
    <svg className="w-12 h-12 mx-auto text-purple-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
    </svg>
  )

  return (
    <div 
      onClick={onClick}
      className={`
        cursor-pointer p-4 rounded-lg shadow-lg text-center transition-all duration-300
        min-h-[120px] flex flex-col justify-center
        ${isMatched 
          ? 'bg-purple-500 text-white transform rotate-y-180' 
          : isFlipped 
            ? 'bg-purple-400 text-white transform rotate-y-180' 
            : 'bg-white hover:bg-purple-50'
        }
      `}
    >
      <div className="text-xl font-bold">
        {isFlipped ? (
          word
        ) : (
          <div className="flex flex-col items-center">
            <SmileIcon />
          </div>
        )}
      </div>
    </div>
  )
}
