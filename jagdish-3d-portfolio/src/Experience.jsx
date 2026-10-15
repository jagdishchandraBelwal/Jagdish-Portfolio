import { Canvas } from '@react-three/fiber'
import World from './scene/World'
import Aria from './scene/Aria'
import CameraRig from './scene/CameraRig'
import Overlay from './ui/Overlay'

export default function Experience() {
  return (
    <div className="fixed inset-0 bg-orange-100">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 45, near: 0.1, far: 220, position: [0, 6.2, 13] }}
      >
        <color attach="background" args={['#fde7cf']} />
        <fog attach="fog" args={['#fde7cf', 38, 100]} />
        <ambientLight intensity={0.9} />
        <hemisphereLight args={['#fff7ed', '#f5d0a9', 0.5]} />
        <directionalLight position={[12, 22, 14]} intensity={1.6} />
        <World />
        <Aria />
        <CameraRig />
      </Canvas>
      <Overlay />
    </div>
  )
}
