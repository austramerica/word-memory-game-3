import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Church Lingo
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Learn and test your knowledge of church terminology!
      </p>
      <Link
        to="/game"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Start Playing
      </Link>
    </div>
  )
}

export default Home
