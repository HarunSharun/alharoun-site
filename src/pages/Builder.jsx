import { useEffect, useState } from 'react'
import parts from '../data/parts.json'
import CarView from '../components/CarView.jsx'
import { useBuild, SLOTS } from '../store.js'
import { whatsappLink } from '../config.js'

const LABELS = { paint: 'Paint', wheels: 'Wheels', bumper: 'Bumper', spoiler: 'Spoiler' }

export default function Builder() {
  const build = useBuild()
  const { setPart, setBuild } = build
  const [activeSlot, setActiveSlot] = useState('paint')
  const [copied, setCopied] = useState(false)

  // If the address has a shared build in it, load it
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const shared = {}
    SLOTS.forEach((slot) => {
      const id = params.get(slot)
      if (id && parts[slot].some((p) => p.id === id)) shared[slot] = id
    })
    if (Object.keys(shared).length > 0) setBuild(shared)
  }, [setBuild])

  const chosen = SLOTS.map((slot) => parts[slot].find((p) => p.id === build[slot]))
  const total = chosen.reduce((sum, part) => sum + (part ? part.priceNgn : 0), 0)
  const priceText = total > 0 ? `₦${total.toLocaleString()}` : 'Ask us for a price'
  const summary = SLOTS.map((slot, i) => `${LABELS[slot]}: ${chosen[i].name}`).join(', ')
  const message = `Hi Al Haroun, here is my build: ${summary}. Estimated price: ${priceText}.`

  const shareParams = new URLSearchParams()
  SLOTS.forEach((slot) => shareParams.set(slot, build[slot]))
  const shareUrl = `${window.location.origin}/build?${shareParams.toString()}`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked, ignore
    }
  }

  return (
    <main className="page builder">
      <div className="builder-view">
        <CarView />
      </div>

      <div className="builder-panel">
        <div className="row">
          {SLOTS.map((slot) => (
            <button
              key={slot}
              className={`chip ${slot === activeSlot ? 'active' : ''}`}
              onClick={() => setActiveSlot(slot)}
            >
              {LABELS[slot]}
            </button>
          ))}
        </div>

        <div className="card">
          <strong>{LABELS[activeSlot]}</strong>
          <div className="row" style={{ marginTop: 12 }}>
            {parts[activeSlot].map((p) =>
              activeSlot === 'paint' ? (
                <button
                  key={p.id}
                  title={p.name}
                  aria-label={p.name}
                  className={`swatch ${build.paint === p.id ? 'active' : ''}`}
                  style={{ background: p.color }}
                  onClick={() => setPart('paint', p.id)}
                />
              ) : (
                <button
                  key={p.id}
                  className={`chip ${build[activeSlot] === p.id ? 'active' : ''}`}
                  onClick={() => setPart(activeSlot, p.id)}
                >
                  {p.name}
                </button>
              )
            )}
          </div>
        </div>

        <div className="card">
          <div className="muted">Estimated price (duty-paid)</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{priceText}</div>
        </div>

        <a className="btn" href={whatsappLink(message)}>Send my build to Al Haroun</a>
        <button className="btn btn-ghost" onClick={copyLink}>
          {copied ? 'Link copied!' : 'Copy share link'}
        </button>
      </div>
    </main>
  )
}