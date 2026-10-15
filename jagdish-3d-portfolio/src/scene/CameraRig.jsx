import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store'
import { STOPS } from '../data'
import { ariaPos } from './shared'

const goal = new THREE.Vector3()
const delta = new THREE.Vector3()
const START_TARGET = [STOPS[0].pos[0], 2.4, STOPS[0].pos[2]]

// Follows Aria while she walks, settles on the room when she arrives,
// and still lets the visitor drag to look around.
export default function CameraRig() {
  const controls = useRef()
  const camera = useThree((s) => s.camera)

  useFrame((_, dt) => {
    const c = controls.current
    if (!c) return
    const { phase, stop, arrived } = useStore.getState()
    const settled = phase === 'welcome' || arrived

    if (phase === 'welcome') goal.set(STOPS[0].pos[0], 2.4, STOPS[0].pos[2])
    else if (arrived) goal.set(STOPS[stop].pos[0], 2.4, STOPS[stop].pos[2])
    else goal.set(ariaPos.x + 3, 2.4, ariaPos.z)

    const k = 1 - Math.exp(-Math.min(dt, 0.1) * (settled ? 2.2 : 4))
    delta.copy(goal).sub(c.target).multiplyScalar(k)
    c.target.add(delta)
    camera.position.add(delta)
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={8}
      maxDistance={20}
      minPolarAngle={0.55}
      maxPolarAngle={1.5}
      minAzimuthAngle={-0.8}
      maxAzimuthAngle={0.8}
      target={START_TARGET}
    />
  )
}
