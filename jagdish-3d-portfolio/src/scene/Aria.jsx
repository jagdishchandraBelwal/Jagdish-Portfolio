import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../store'
import { ariaPos, nodePos, targetNode, stopOfNode } from './shared'

const SKIN = '#f1c7a1'
const HAIR = '#2b1a16'
const BLAZER = '#ea580c'
const PANTS = '#2d2a3e'
const SHIRT = '#fff7ed'

const tmp = new THREE.Vector3()
const damp = THREE.MathUtils.damp

const range = (a, b) => {
  const out = []
  const step = a <= b ? 1 : -1
  for (let n = a; n !== b + step; n += step) out.push(n)
  return out
}

const angleDamp = (a, b, lambda, dt) => {
  const d = ((((b - a + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) - Math.PI
  return a + d * (1 - Math.exp(-lambda * dt))
}

function M({ c }) {
  return <meshStandardMaterial color={c} flatShading roughness={0.75} />
}

export default function Aria() {
  const group = useRef()
  const legL = useRef()
  const legR = useRef()
  const armA = useRef()
  const armB = useRef()
  const body = useRef()
  const head = useRef()

  const s = useRef({
    reached: 0,
    heading: null,
    path: [],
    target: null,
    hops: 0,
    done: false,
    yaw: 0,
    dirYaw: 0,
    t: 0,
    walk: 0,
  })

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    const st = s.current
    const store = useStore.getState()
    const target = targetNode(store.phase, store.stop)

    // ── new destination → plan a path through the walking graph
    if (st.target !== target) {
      const { reached, heading } = st
      let start
      if (heading !== null) {
        const dir = Math.sign(heading - reached)
        start = (target - reached) * dir > 0 ? heading : reached
      } else {
        start = target === reached ? reached : reached + Math.sign(target - reached)
      }
      st.path = range(start, target)
      st.heading = st.path[0]
      st.hops = Math.abs(stopOfNode(target) - stopOfNode(reached))
      st.target = target
      st.done = false
      if (store.arrived) store.setArrived(false)
    }

    // ── move along the path
    if (st.path.length) {
      const goal = nodePos(st.path[0])
      tmp.copy(goal).sub(ariaPos)
      tmp.y = 0
      const dist = tmp.length()
      const speed = st.hops > 1 ? 11 : 4.4
      const stepLen = speed * dt
      if (dist <= stepLen) {
        ariaPos.copy(goal)
        st.reached = st.path.shift()
        st.heading = st.path.length ? st.path[0] : null
      } else {
        ariaPos.addScaledVector(tmp, stepLen / dist)
        st.dirYaw = Math.atan2(tmp.x, tmp.z)
      }
    }
    const walking = st.path.length > 0
    if (!walking && !st.done) {
      st.done = true
      useStore.getState().setArrived(true)
    }

    // ── facing
    const yawTarget = walking ? st.dirYaw : st.reached === 0 ? 0 : 0.5
    st.yaw = angleDamp(st.yaw, yawTarget, walking ? 12 : 6, dt)

    // ── animation
    st.t += dt
    st.walk = damp(st.walk, walking ? 1 : 0, 8, dt)
    const freq = st.hops > 1 ? 16 : 9
    const sw = Math.sin(st.t * freq) * 0.65 * st.walk

    legL.current.rotation.x = sw
    legR.current.rotation.x = -sw

    const welcoming = store.phase === 'welcome' && !walking
    let aZ = 0.12
    let aX = -sw * 0.9
    let bX = sw * 0.9
    if (!walking) {
      aX = 0
      bX = 0
      aZ = welcoming ? 2.5 + Math.sin(st.t * 7) * 0.3 : 1.3 + Math.sin(st.t * 2) * 0.06
    }
    const a = armA.current
    const b = armB.current
    a.rotation.z = damp(a.rotation.z, aZ, 10, dt)
    a.rotation.x = damp(a.rotation.x, aX, 14, dt)
    b.rotation.z = damp(b.rotation.z, -0.12, 10, dt)
    b.rotation.x = damp(b.rotation.x, bX, 14, dt)

    body.current.position.y = 1.2 + Math.sin(st.t * 2) * 0.012
    head.current.rotation.z = Math.sin(st.t * 1.3) * 0.04
    head.current.rotation.y = walking ? 0 : Math.sin(st.t * 0.8) * 0.18

    const g = group.current
    g.position.set(ariaPos.x, Math.abs(Math.sin(st.t * freq)) * 0.06 * st.walk, ariaPos.z)
    g.rotation.y = st.yaw
  })

  return (
    <group ref={group} scale={1.15}>
      {/* soft blob shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[0.55, 16]} />
        <meshBasicMaterial color="#000" transparent opacity={0.18} />
      </mesh>

      {/* legs */}
      <group ref={legL} position={[-0.14, 0.85, 0]}>
        <mesh position={[0, -0.38, 0]}>
          <cylinderGeometry args={[0.11, 0.1, 0.76, 6]} />
          <M c={PANTS} />
        </mesh>
        <mesh position={[0, -0.8, 0.06]}>
          <boxGeometry args={[0.2, 0.1, 0.34]} />
          <M c="#1f1b2e" />
        </mesh>
      </group>
      <group ref={legR} position={[0.14, 0.85, 0]}>
        <mesh position={[0, -0.38, 0]}>
          <cylinderGeometry args={[0.11, 0.1, 0.76, 6]} />
          <M c={PANTS} />
        </mesh>
        <mesh position={[0, -0.8, 0.06]}>
          <boxGeometry args={[0.2, 0.1, 0.34]} />
          <M c="#1f1b2e" />
        </mesh>
      </group>

      {/* torso */}
      <group ref={body} position={[0, 1.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.33, 0.75, 8]} />
          <M c={BLAZER} />
        </mesh>
        <mesh position={[0, 0.12, 0.27]}>
          <boxGeometry args={[0.2, 0.4, 0.05]} />
          <M c={SHIRT} />
        </mesh>
        <mesh position={[0.15, 0.0, 0.31]}>
          <boxGeometry args={[0.12, 0.08, 0.02]} />
          <M c="#ffffff" />
        </mesh>
        {/* neck */}
        <mesh position={[0, 0.46, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.14, 6]} />
          <M c={SKIN} />
        </mesh>

        {/* head */}
        <group ref={head} position={[0, 0.82, 0]}>
          <mesh>
            <icosahedronGeometry args={[0.3, 1]} />
            <M c={SKIN} />
          </mesh>
          {/* hair */}
          <mesh position={[0, 0.05, -0.04]} scale={[1.07, 1.02, 1.1]}>
            <sphereGeometry args={[0.3, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
            <M c={HAIR} />
          </mesh>
          <mesh position={[0, -0.02, -0.34]}>
            <sphereGeometry args={[0.13, 8, 6]} />
            <M c={HAIR} />
          </mesh>
          <mesh position={[0, -0.22, -0.4]} scale={[1, 1.7, 1]}>
            <sphereGeometry args={[0.09, 8, 6]} />
            <M c={HAIR} />
          </mesh>
          {/* face */}
          <mesh position={[-0.1, 0.03, 0.28]}>
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshStandardMaterial color="#1f1411" />
          </mesh>
          <mesh position={[0.1, 0.03, 0.28]}>
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshStandardMaterial color="#1f1411" />
          </mesh>
          <mesh position={[0, -0.1, 0.29]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.07, 0.014, 5, 10, Math.PI]} />
            <meshStandardMaterial color="#9f1239" />
          </mesh>
          {/* headset */}
          <mesh position={[0, 0.02, 0]}>
            <torusGeometry args={[0.34, 0.022, 6, 16, Math.PI]} />
            <M c="#1f2937" />
          </mesh>
          <mesh position={[0.33, 0, 0]}>
            <boxGeometry args={[0.08, 0.16, 0.14]} />
            <M c="#1f2937" />
          </mesh>
          <mesh position={[-0.33, 0, 0]}>
            <boxGeometry args={[0.08, 0.16, 0.14]} />
            <M c="#1f2937" />
          </mesh>
          <mesh position={[-0.22, -0.14, 0.24]} rotation={[0, -0.6, 0]}>
            <boxGeometry args={[0.22, 0.025, 0.025]} />
            <M c="#1f2937" />
          </mesh>
        </group>

        {/* arms: A is on the +x side, B on the -x side */}
        <group ref={armA} position={[0.4, 0.3, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.075, 0.065, 0.6, 6]} />
            <M c={BLAZER} />
          </mesh>
          <mesh position={[0, -0.66, 0]}>
            <sphereGeometry args={[0.075, 6, 6]} />
            <M c={SKIN} />
          </mesh>
        </group>
        <group ref={armB} position={[-0.4, 0.3, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.075, 0.065, 0.6, 6]} />
            <M c={BLAZER} />
          </mesh>
          <mesh position={[0, -0.66, 0]}>
            <sphereGeometry args={[0.075, 6, 6]} />
            <M c={SKIN} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
