import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Builder from './pages/Builder.jsx'
import Guess from './pages/Guess.jsx'
import { whatsappLink } from './config.js'

export default function App() {
  return (
    <>
      <nav className="nav">
        <Link to="/" className="logo">AL HAROUN</Link>
        <div className="nav-links">
          <Link to="/build">Build</Link>
          <Link to="/guess">Guess the AMG</Link>
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
        Al Haroun is an independent reseller, not affiliated with Mercedes-Benz or any tuning company.
      </footer>
    </>
  )
}