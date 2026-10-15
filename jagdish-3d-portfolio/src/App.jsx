import { Component, lazy, Suspense } from 'react'
import { useStore } from './store'
import Portfolio2D from './Portfolio2D'

// three.js is only downloaded when someone actually opens the 3D tour
const Experience = lazy(() => import('./Experience'))

function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-3 bg-orange-100 text-orange-700">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-300 border-t-orange-600" />
      <p className="font-semibold">Opening the lobby…</p>
    </div>
  )
}

// If WebGL or anything in the 3D scene blows up, drop back to the 2D site
class Guard extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    console.error('3D tour failed, switching to 2D:', err)
    useStore.getState().setMode('2d')
  }
  render() {
    return this.state.failed ? <Portfolio2D /> : this.props.children
  }
}

export default function App() {
  const mode = useStore((s) => s.mode)
  if (mode === '2d') return <Portfolio2D />
  return (
    <Guard>
      <Suspense fallback={<Loader />}>
        <Experience />
      </Suspense>
    </Guard>
  )
}
