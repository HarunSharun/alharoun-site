import parts from '../data/parts.json'
import { useBuild } from '../store.js'

// Change this to true once your car images are in public/parts
const ART_READY = false

const LAYER_SLOTS = ['bumper', 'wheels', 'spoiler']

const layer = { position: 'absolute', inset: 0, width: '100%', height: '100%' }

export default function CarView() {
  const build = useBuild()
  const paint = parts.paint.find((p) => p.id === build.paint)

  if (!ART_READY) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 12,
          background: paint.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: 8 }}>
          Car art coming soon
        </span>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 900, aspectRatio: '16 / 9' }}>
      <div
        style={{
          ...layer,
          backgroundColor: paint.color,
          WebkitMaskImage: 'url(/parts/body.png)',
          maskImage: 'url(/parts/body.png)',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
      <img src="/parts/shade.png" style={layer} alt="" />
      {LAYER_SLOTS.map((slot) => {
        const part = parts[slot].find((p) => p.id === build[slot])
        return part && part.image ? <img key={slot} src={part.image} style={layer} alt="" /> : null
      })}
    </div>
  )
}
