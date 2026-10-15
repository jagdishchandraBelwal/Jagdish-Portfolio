import { useMemo } from 'react'
import { Sparkles } from '@react-three/drei'
import { STOPS } from '../data'
import { hostPos } from './shared'
import {
  Reception,
  Meeting,
  SkillsLab,
  OfficeFloor,
  Gallery,
  Library,
  ContactDesk,
} from './Rooms'

// Corridors between rooms, with a trail of orange dots to follow
function Corridors() {
  const segs = useMemo(
    () =>
      STOPS.slice(0, -1).map((_, i) => {
        const a = hostPos(i)
        const b = hostPos(i + 1)
        const dx = b.x - a.x
        const dz = b.z - a.z
        const len = Math.hypot(dx, dz)
        const n = Math.floor(len / 1.8)
        const dots = Array.from({ length: n }, (_, k) => {
          const t = (k + 0.5) / n
          return [a.x + dx * t, 0.07, a.z + dz * t]
        })
        return {
          mid: [(a.x + b.x) / 2, -0.06, (a.z + b.z) / 2],
          len,
          rot: Math.atan2(-dz, dx),
          dots,
        }
      }),
    []
  )
  return segs.map((s, i) => (
    <group key={i}>
      <mesh position={s.mid} rotation={[0, s.rot, 0]}>
        <boxGeometry args={[s.len + 3, 0.2, 3.4]} />
        <meshStandardMaterial color="#e9c9a3" flatShading roughness={0.9} />
      </mesh>
      {s.dots.map((p, k) => (
        <mesh key={k} position={p} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.13, 10]} />
          <meshBasicMaterial color="#ea580c" />
        </mesh>
      ))}
    </group>
  ))
}

export default function World() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[54, -0.3, -4]}>
        <planeGeometry args={[400, 200]} />
        <meshStandardMaterial color="#f8dcc0" />
      </mesh>
      <Corridors />
      <Reception />
      <Meeting />
      <SkillsLab />
      <OfficeFloor />
      <Gallery />
      <Library />
      <ContactDesk />
      <Sparkles
        count={140}
        scale={[130, 10, 30]}
        position={[54, 4, -4]}
        size={3}
        speed={0.3}
        color="#fb923c"
        opacity={0.5}
      />
    </>
  )
}
