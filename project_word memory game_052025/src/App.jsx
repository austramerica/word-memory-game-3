import React, { useState, useEffect } from 'react'
import Game from './components/Game'
import Header from './components/Header'

export default function App() {
  const [score, setScore] = useState(0)
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header score={score} />
      <main className="container mx-auto px-4 py-8">
        <Game setScore={setScore} />
      </main>
    </div>
  )
}
