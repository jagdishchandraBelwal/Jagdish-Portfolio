import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Mat({ c, ...p }) {
  return <meshStandardMaterial color={c} flatShading roughness={0.8} {...p} />
}

export function Box({ p = [0, 0, 0], s = [1, 1, 1], c = '#ffffff', r, ...m }) {
  return (
    <mesh position={p} rotation={r}>
      <boxGeometry args={s} />
      <Mat c={c} {...m} />
    </mesh>
  )
}

export function Cyl({ p = [0, 0, 0], rt = 0.5, rb, h = 1, c = '#ffffff', seg = 12, sc, r, ...m }) {
  return (
    <mesh position={p} scale={sc} rotation={r}>
      <cylinderGeometry args={[rt, rb ?? rt, h, seg]} />
      <Mat c={c} {...m} />
    </mesh>
  )
}

export function Ball({ p = [0, 0, 0], rad = 0.5, c = '#ffffff', sc, seg = 10, ...m }) {
  return (
    <mesh position={p} scale={sc}>
      <sphereGeometry args={[rad, seg, Math.max(5, seg - 2)]} />
      <Mat c={c} {...m} />
    </mesh>
  )
}

export function Plant({ p = [0, 0, 0], s = 1 }) {
  return (
    <group position={p} scale={s}>
      <Cyl p={[0, 0.35, 0]} rt={0.4} rb={0.3} h={0.7} c="#c2410c" />
      <Ball p={[0, 1.1, 0]} rad={0.55} c="#16a34a" seg={7} />
      <Ball p={[0.3, 1.5, 0.1]} rad={0.4} c="#22c55e" seg={7} />
      <Ball p={[-0.3, 1.45, -0.1]} rad={0.38} c="#15803d" seg={7} />
    </group>
  )
}

export function Spin({ speed = 0.6, children, ...rest }) {
  const ref = useRef()
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * speed
  })
  return (
    <group ref={ref} {...rest}>
      {children}
    </group>
  )
}

// back = -1: backrest towards -z, back = 1: backrest towards +z
export function Chair({ p, back = -1, c = '#ea580c' }) {
  return (
    <group position={p}>
      <Box p={[0, 0.55, 0]} s={[0.85, 0.14, 0.85]} c={c} />
      <Box p={[0, 1.05, 0.4 * back]} s={[0.85, 0.9, 0.12]} c="#c2410c" />
      <Cyl p={[0, 0.28, 0]} rt={0.07} h={0.55} c="#374151" seg={6} />
    </group>
  )
}
