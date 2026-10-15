import * as THREE from 'three'
import { STOPS, HOST_OFFSET } from '../data'

// Aria's live position, shared between her component and the camera rig
export const ariaPos = new THREE.Vector3()

export const hostPos = (i) =>
  new THREE.Vector3(
    STOPS[i].pos[0] + HOST_OFFSET[0],
    0,
    STOPS[i].pos[2] + HOST_OFFSET[2]
  )

// Walking graph:  node 0 = behind the desk, node 1 = end of the desk,
// node n (>=2) = host spot of stop n-2.
const DESK_SPOT = new THREE.Vector3(STOPS[0].pos[0], 0, STOPS[0].pos[2] - 1.35)
const DESK_END = new THREE.Vector3(
  STOPS[0].pos[0] + HOST_OFFSET[0],
  0,
  STOPS[0].pos[2] - 1.35
)

export const nodePos = (n) => (n === 0 ? DESK_SPOT : n === 1 ? DESK_END : hostPos(n - 2))
export const targetNode = (phase, stop) => (phase === 'welcome' ? 0 : stop + 2)
export const stopOfNode = (n) => Math.max(0, n - 2)

ariaPos.copy(DESK_SPOT)
