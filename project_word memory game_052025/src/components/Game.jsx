import React, { useState, useEffect } from 'react'
import Card from './Card'
import { churchWords } from '../data/words'

export default function Game({ setScore }) {
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [timer, setTimer] = useState(0)
  const [tries, setTries] = useState(0)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    let interval
    if (isGameStarted && !isGameComplete) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isGameStarted, isGameComplete])

  const initializeGame = () => {
    const selectedWords = [...churchWords]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
    
    const gamePairs = [...selectedWords, ...selectedWords]
      .sort(() => Math.random() - 0.5)
    
    setCards(gamePairs)
    setFlippedIndices([])
    setMatchedPairs([])
    setScore(0)
    setTimer(0)
    setTries(0)
    setIsGameStarted(false)
    setIsGameComplete(false)
  }

  const handleCardClick = (index) => {
    if (!isGameStarted) {
      setIsGameStarted(true)
    }

    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index])
    ) {
      return
    }

    const newFlippedIndices = [...flippedIndices, index]
    setFlippedIndices(newFlippedIndices)

    if (newFlippedIndices.length === 2) {
      setTries(prev => prev + 1)
      const [firstIndex, secondIndex] = newFlippedIndices
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      if (firstCard === secondCard) {
        const newMatchedPairs = [...matchedPairs, firstCard]
        setMatchedPairs(newMatchedPairs)
        setScore(prevScore => prevScore + 10)
        setFlippedIndices([])

        if (newMatchedPairs.length === cards.length / 2) {
          setIsGameComplete(true)
        }
      } else {
        setTimeout(() => {
          setFlippedIndices([])
        }, 1000)
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const calculateAccuracy = () => {
    const totalPairs = cards.length / 2
    return ((totalPairs / tries) * 100).toFixed(1)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 p-4 bg-blue-100 rounded-lg">
        <h3 className="font-bold mb-2">How to Play:</h3>
        <ul className="list-disc list-inside text-sm">
          <li>Click on cards to reveal church-related words</li>
          <li>Match pairs of identical words</li>
          <li>Each match earns 10 points</li>
          <li>Complete the game by finding all pairs</li>
        </ul>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <div className="text-lg font-bold">
            Timer: {formatTime(timer)}
          </div>
          <div className="text-lg font-bold">
            Tries: {tries}
          </div>
        </div>
        <button
          onClick={initializeGame}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((word, index) => (
          <Card
            key={index}
            word={word}
            isFlipped={flippedIndices.includes(index) || matchedPairs.includes(word)}
            isMatched={matchedPairs.includes(word)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {isGameComplete && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <h3 className="text-xl font-bold text-center mb-2">🎉 Congratulations! 🎉</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-3 rounded-lg">
              <div className="font-bold">Time</div>
              <div>{formatTime(timer)}</div>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="font-bold">Tries</div>
              <div>{tries}</div>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="font-bold">Pairs Found</div>
              <div>{cards.length / 2}</div>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="font-bold">Accuracy</div>
              <div>{calculateAccuracy()}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
