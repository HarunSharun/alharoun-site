import { useState } from 'react'
import questions from '../data/questions.json'
import { shareLink } from '../config.js'
import GuessViewer from '../components/GuessViewer.jsx'

// Set to 0, 1, 2... to force one question while testing. Set back to null when done.
const TEST_INDEX = null

function readStreak() {
  try {
    return Number(localStorage.getItem('streak') || 0)
  } catch {
    return 0
  }
}

function saveStreak(n) {
  try {
    localStorage.setItem('streak', String(n))
  } catch {
    // storage blocked, ignore
  }
}

export default function Guess() {
  const day = Math.floor(Date.now() / 86400000)
  const q = TEST_INDEX !== null ? questions[TEST_INDEX] : questions[day % questions.length]
  const [picked, setPicked] = useState(null)
  const [streak, setStreak] = useState(readStreak())

  function choose(option) {
    if (picked) return
    setPicked(option)
    const next = option === q.answer ? streak + 1 : 0
    setStreak(next)
    saveStreak(next)
  }

  const correct = picked === q.answer
  const shareText = `I got today's Guess the Mercedes ${correct ? 'right' : 'wrong'}! Streak: ${streak}. Play here: ${window.location.origin}/guess`

  return (
    <main className="page" style={{ maxWidth: 720 }}>
      <h2>Guess the Mercedes</h2>
      <p className="muted">Streak: {streak}</p>
      <div className="card">
        {q.model ? (
          <GuessViewer url={q.model} />
        ) : (
          <img src={q.image} alt="Which AMG is this?" style={{ width: '100%', borderRadius: 8 }} />
        )}
      </div>
      <div className="row" style={{ marginTop: 16 }}>
        {q.options.map((option) => (
          <button
            key={option}
            className={`chip ${picked === option ? 'active' : ''}`}
            onClick={() => choose(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {picked && (
        <div style={{ marginTop: 16 }}>
          <p>{correct ? 'Correct!' : `Not quite. It was the ${q.answer}.`}</p>
          <a className="btn" href={shareLink(shareText)}>Share my result</a>
        </div>
      )}
    </main>
  )
}