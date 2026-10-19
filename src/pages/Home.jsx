import { Link } from 'react-router-dom'
import CarView from '../components/CarView.jsx'
import { whatsappLink } from '../config.js'

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero-text">
          <p className="muted">MERCEDES CULTURE</p>
          <h1>Mercedes-Benz, duty-paid. Sourced for Abuja.</h1>
          <p className="muted">
            Build your dream Mercedes. Play the daily game. When you're ready, we help you get it.
          </p>
          <div className="row">
            <Link to="/build" className="btn">Build yours</Link>
            <a
              className="btn btn-ghost"
              href={whatsappLink("Hi Al Haroun, I'd like to buy a Mercedes.")}
            >
              Buy through us
            </a>
          </div>
        </div>
        <div className="card hero-car">
          <CarView />
        </div>
      </section>

      <section className="grid3">
        <div className="card">
          <strong>Build</strong>
          <p className="muted">Customize paint, wheels and parts. Share your build.</p>
        </div>
        <div className="card">
          <strong>Play</strong>
          <p className="muted">Guess the AMG: a new car every day. Keep your streak.</p>
        </div>
        <div className="card">
          <strong>Buy</strong>
          <p className="muted">Sourced, duty-paid, delivered. Message us on WhatsApp.</p>
        </div>
      </section>
    </main>
  )
}