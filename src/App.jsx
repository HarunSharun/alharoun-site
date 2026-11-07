import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Builder from './pages/Builder.jsx'
import Guess from './pages/Guess.jsx'
import { whatsappLink } from './config.js'

const CREDITS = [
  { title: 'Mercedes-Benz CLK GTR', author: 'Dave Love SketchFab', url: 'https://skfb.ly/pLHO8' },
  { title: 'Mercedes-Benz 300sl Gullwing | www.vecarz.com', author: 'vecarz', url: 'https://skfb.ly/p8HoB' },
  { title: 'Mercedes-Benz W196', author: 'The_Nuke_Remolacha', url: '' },
  { title: 'Mercedes-Benz SSK', author: 'freeReef', url: '' },
  { title: 'Mercesdes_ Benz G-class Brabus', author: 'Es-star kings', url: 'https://skfb.ly/psKtT' },
  { title: 'AMG AERO 3 Rim 3pcs', author: 'dseoaudl', url: '' },
]
export default function App() {
  return (
    <>
      <nav className="nav">
        <Link to="/" className="logo">AL HAROUN</Link>
        <div className="nav-links">
          <Link to="/build">Build</Link>
          <Link to="/guess">Guess the Mercedes</Link>
        </div>
        <a className="btn" href={whatsappLink("Hi Al Haroun, I'd like to know more.")}>
          WhatsApp us
        </a>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<Builder />} />
        <Route path="/guess" element={<Guess />} />
      </Routes>

      <footer className="footer">
  <p>
    Follow us:{' '}
    <a href="https://www.instagram.com/alhar0un" target="_blank" rel="noreferrer">Instagram</a>
    {' · '}
    <a href="https://www.tiktok.com/@alharoun_mb" target="_blank" rel="noreferrer">TikTok</a>
    {' · '}
    <a href="https://x.com/alharoun_mb" target="_blank" rel="noreferrer">X</a>
  </p>
  <p>Al Haroun is an independent reseller, not affiliated with Mercedes-Benz or any tuning company.</p>
  <p>
    3D models from Sketchfab, licensed under{' '}
    <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
      CC BY 4.0
    </a>
    . Models were modified for web use (reduced detail, recoloured, parts added or removed).
  </p>
  <ul>
    {CREDITS.map((c) => (
      <li key={c.title}>
        {c.url ? (
          <a href={c.url} target="_blank" rel="noreferrer">
            "{c.title}"
          </a>
        ) : (
          <span>"{c.title}"</span>
        )}{' '}
        by {c.author}
      </li>
    ))}
  </ul>
</footer>
    </>
  )
}