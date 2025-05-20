import React, { useState, useEffect } from 'react'
import { churchWords } from '../data/words'

function Game() {
  const [word, setWord] = useState('')
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')
  const maxGuesses = 6

  useEffect(() => {
    const randomWord = churchWords[Math.floor(Math.random() * churchWords.length)]
    setWord(randomWord)
  }, [])

  const handleKeyPress = (e) => {
    if (gameOver) return
    
    if (e.key === 'Enter' && currentGuess.length === word.length) {
      submitGuess()
    } else if (e.key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
    } else if (currentGuess.length < word.length && e.key.match(/^[A-Za-z]$/)) {
      setCurrentGuess(prev => (prev + e.key).toUpperCase())
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentGuess, gameOver, word])

  const submitGuess = () => {
    if (currentGuess.length !== word.length) return

    const newGuesses = [...guesses, currentGuess]
    setGuesses(newGuesses)
    
    if (currentGuess === word) {
      setGameOver(true)
      setMessage('Congratulations! You won! 🎉')
    } else if (newGuesses.length >= maxGuesses) {
      setGameOver(true)
      setMessage(`Game Over! The word was ${word}`)
    }
    
    setCurrentGuess('')
  }

  const getLetterClass = (letter, index, guess) => {
    if (!guess) return 'bg-gray-200'
    
    if (letter === word[index]) {
      return 'bg-green-500 text-white'
    } else if (word.includes(letter)) {
      return 'bg-yellow-500 text-white'
    } else {
      return 'bg-gray-400 text-white'
    }
  }

  const renderGuessBoxes = () => {
    const allGuesses = [...guesses, currentGuess, ...Array(maxGuesses - guesses.length - 1).fill('')]
    
    return allGuesses.map((guess, i) => (
      <div key={i} className="flex gap-1 mb-2">
        {Array.from({ length: word.length }).map((_, j) => (
          <div
            key={j}
            className={`w-12 h-12 border-2 flex items-center justify-center text-xl font-bold ${
              getLetterClass(guess[j], j, guess)
            }`}
          >
            {guess[j] || ''}
          </div>
        ))}
      </div>
    ))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Church Lingo Game
      </h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4 text-center">
          <p className="text-gray-600 mb-2">Guess the church-related word!</p>
          {message && (
            <p className="text-lg font-semibold text-green-600">{message}</p>
          )}
        </div>
        
        <div className="flex flex-col items-center gap-2">
          {renderGuessBoxes()}
        </div>

        {gameOver && (
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  )
}

export default Game
