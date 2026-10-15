import { useEffect, useState } from 'react'
import { useStore } from '../store'
import { STOPS, PROFILE } from '../data'

const WELCOME =
  "Hi, I'm Aria, the receptionist here! 👋 Would you like a quick tour of Jagdish's work?"
const WALK_LINES = [
  'Follow me! 🚶‍♀️',
  'This way, please…',
  'Almost there…',
  'Right this way!',
]

function useTyped(text) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id)
          return v
        }
        return v + 1
      })
    }, 16)
    return () => clearInterval(id)
  }, [text])
  return { shown: text.slice(0, n), typing: n < text.length }
}

const primary =
  'rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-orange-700'
const ghost =
  'rounded-full border border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40'
const pill =
  'rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-gray-800 shadow backdrop-blur transition hover:bg-white'

export default function Overlay() {
  const phase = useStore((s) => s.phase)
  const stop = useStore((s) => s.stop)
  const arrived = useStore((s) => s.arrived)
  const bubbleOpen = useStore((s) => s.bubbleOpen)
  const menuOpen = useStore((s) => s.menuOpen)
  const { startTour, next, prev, goTo, restart, setBubble, toggleMenu, setMode } =
    useStore.getState()

  const last = STOPS.length - 1
  const text =
    phase === 'welcome' ? WELCOME : arrived ? STOPS[stop].line : WALK_LINES[stop % WALK_LINES.length]
  const { shown, typing } = useTyped(text)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') useStore.getState().next()
      else if (e.key === 'ArrowLeft') useStore.getState().prev()
      else if (e.key === 'Escape') useStore.setState({ menuOpen: false })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* top bar */}
      <div className="pointer-events-auto absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
        <div className="rounded-full bg-white/90 px-4 py-2 font-bold text-orange-600 shadow backdrop-blur">
          {PROFILE.shortName}
        </div>
        <div className="relative flex flex-wrap justify-end gap-2">
          <button className={pill} onClick={toggleMenu}>
            🗺️ Rooms
          </button>
          <a className={pill} href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
            📄 Resume
          </a>
          <button className={pill} onClick={() => setMode('2d')}>
            2D version
          </button>
          {menuOpen && (
            <ul className="absolute right-0 top-12 w-60 overflow-hidden rounded-2xl bg-white py-1 shadow-2xl">
              {STOPS.map((s, i) => {
                const current = phase === 'tour' && stop === i
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => goTo(i)}
                      className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-orange-50 ${
                        current ? 'bg-orange-100 font-semibold text-orange-700' : 'text-gray-800'
                      }`}
                    >
                      <span className="w-5 text-xs text-gray-400">{String(i + 1).padStart(2, '0')}</span>
                      {s.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Aria's speech bubble */}
      {bubbleOpen ? (
        <div className="pointer-events-auto absolute bottom-4 left-1/2 w-[min(660px,calc(100%-1.5rem))] -translate-x-1/2">
          <div className="pop-in rounded-3xl border border-orange-200 bg-white/95 p-4 shadow-2xl shadow-orange-500/25 backdrop-blur">
            <div className="flex gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-3xl shadow">
                👩‍💼
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                    Aria · Receptionist
                  </p>
                  <button
                    onClick={() => setBubble(false)}
                    className="text-gray-400 hover:text-gray-700"
                    aria-label="Hide Aria's bubble"
                  >
                    ✕
                  </button>
                </div>
                <p className={`mt-1 min-h-[3rem] text-[15px] leading-snug text-gray-800 ${typing ? 'caret' : ''}`}>
                  {shown}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              {phase === 'welcome' ? (
                <div className="flex flex-wrap gap-2">
                  <button className={primary} onClick={startTour}>
                    Start Tour
                  </button>
                  <a className={ghost} href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
                    Skip to Resume
                  </a>
                  <button className={ghost} onClick={() => setBubble(false)}>
                    Look around myself
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    {STOPS.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => goTo(i)}
                        title={s.label}
                        aria-label={`Go to ${s.label}`}
                        className={`h-2.5 rounded-full transition-all ${
                          i === stop ? 'w-6 bg-orange-600' : 'w-2.5 bg-orange-200 hover:bg-orange-400'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className={ghost} disabled={stop === 0} onClick={prev}>
                      ← Back
                    </button>
                    {stop === last && arrived && (
                      <a className={ghost} href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
                        Resume
                      </a>
                    )}
                    <button className={primary} onClick={next}>
                      {stop === last ? 'Restart tour ↺' : 'Follow me →'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setBubble(true)}
          className="pointer-events-auto absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-700 shadow-xl hover:bg-orange-50"
        >
          <span className="text-xl">👩‍💼</span> Ask Aria
        </button>
      )}
    </div>
  )
}
