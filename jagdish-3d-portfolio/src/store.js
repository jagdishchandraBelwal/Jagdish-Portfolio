import { create } from 'zustand'
import { STOPS } from './data'

function canWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

// Phones, low-power devices, reduced-motion users and no-WebGL browsers
// start on the 2D version. Everyone can still switch manually.
function detectMode(webgl) {
  if (typeof window === 'undefined') return '3d'
  const small = window.innerWidth < 768
  const reduce = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const weak =
    (navigator.hardwareConcurrency || 8) <= 2 ||
    (navigator.deviceMemory !== undefined && navigator.deviceMemory <= 2)
  return !webgl || small || reduce || weak ? '2d' : '3d'
}

const LAST = STOPS.length - 1
const webgl = canWebGL()

export const useStore = create((set, get) => ({
  webgl,
  mode: detectMode(webgl), // '3d' | '2d'
  phase: 'welcome', // 'welcome' | 'tour'
  stop: 0,
  arrived: false,
  bubbleOpen: true,
  menuOpen: false,

  setMode: (mode) => set({ mode }),
  setArrived: (arrived) => set({ arrived }),
  setBubble: (bubbleOpen) => set({ bubbleOpen }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),

  startTour: () =>
    set({ phase: 'tour', stop: 0, arrived: false, bubbleOpen: true, menuOpen: false }),

  goTo: (i) => {
    const s = get()
    const idx = Math.max(0, Math.min(LAST, i))
    const same = s.phase === 'tour' && s.stop === idx
    set({
      phase: 'tour',
      stop: idx,
      arrived: same ? s.arrived : false,
      bubbleOpen: true,
      menuOpen: false,
    })
  },

  next: () => {
    const s = get()
    if (s.phase === 'welcome') return s.startTour()
    if (s.stop >= LAST) return s.restart()
    s.goTo(s.stop + 1)
  },

  prev: () => {
    const s = get()
    if (s.phase === 'welcome' || s.stop <= 0) return
    s.goTo(s.stop - 1)
  },

  restart: () =>
    set({ phase: 'welcome', stop: 0, arrived: false, bubbleOpen: true, menuOpen: false }),
}))
