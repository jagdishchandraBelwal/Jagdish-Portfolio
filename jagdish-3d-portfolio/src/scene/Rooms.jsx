import { useMemo } from 'react'
import { Float, Html } from '@react-three/drei'
import { useStore } from '../store'
import {
  STOPS,
  PROFILE,
  ABOUT,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  EDUCATION,
  CONTACT,
  CONTACT_INTRO,
} from '../data'
import { Box, Cyl, Ball, Plant, Spin, Chair } from './prims'

// ── visibility helpers ───────────────────────────────────────
// Content appears only once Aria has walked to the room.
const useShow = (i) =>
  useStore((s) => (s.phase === 'welcome' ? i === 0 : s.stop === i && s.arrived))
const useNear = (i) =>
  useStore((s) => Math.abs((s.phase === 'welcome' ? 0 : s.stop) - i) <= 1)

// ── shared HTML pieces ───────────────────────────────────────
function Card({ width = 480, className = '', children }) {
  return (
    <div
      className={`pop-in rounded-2xl border border-orange-200 bg-white/95 p-6 text-gray-800 shadow-2xl shadow-orange-500/20 backdrop-blur ${className}`}
      style={{ width }}
    >
      {children}
    </div>
  )
}

function Panel({ position, df = 12, children }) {
  return (
    <Html position={position} center distanceFactor={df} zIndexRange={[20, 0]}>
      {children}
    </Html>
  )
}

// ── room shell: floor pad, back wall, trims, sign ────────────
function Shell({ i, floor, children }) {
  const near = useNear(i)
  const [x, , z] = STOPS[i].pos
  return (
    <group position={[x, 0, z]}>
      <Box p={[0, -0.05, 0]} s={[14, 0.2, 11]} c={floor} />
      <Box p={[0, 3.5, -5.35]} s={[14, 7, 0.3]} c="#fff4e6" />
      <Box p={[0, 0.3, -5.15]} s={[14, 0.6, 0.12]} c="#e8c8a4" />
      <Box p={[0, 7.1, -5.3]} s={[14.4, 0.3, 0.6]} c="#ea580c" />
      <Box p={[-7.1, 3.5, -5.3]} s={[0.35, 7, 0.6]} c="#ea580c" />
      <Box p={[7.1, 3.5, -5.3]} s={[0.35, 7, 0.6]} c="#ea580c" />
      {near && (
        <Html position={[-5.2, 6.35, -5.1]} center distanceFactor={12} zIndexRange={[20, 0]}>
          <div className="whitespace-nowrap rounded-full bg-orange-600 px-3 py-1 text-xs font-bold tracking-widest text-white shadow">
            {String(i + 1).padStart(2, '0')} · {STOPS[i].label.toUpperCase()}
          </div>
        </Html>
      )}
      {children}
    </group>
  )
}

// ── 1 · Reception ────────────────────────────────────────────
export function Reception() {
  const show = useShow(0)
  const goTo = useStore((s) => s.goTo)
  return (
    <Shell i={0} floor="#fdba74">
      <Box p={[0, 0.06, 1.2]} s={[7, 0.04, 4.6]} c="#fb923c" />

      {/* desk */}
      <Box p={[0, 1.05, 0]} s={[5, 0.16, 1.6]} c="#c08457" />
      <Box p={[0, 0.5, 0.65]} s={[5, 1, 0.2]} c="#ea580c" />
      <Box p={[-2.4, 0.5, -0.3]} s={[0.2, 1, 1.2]} c="#ea580c" />
      <Box p={[2.4, 0.5, -0.3]} s={[0.2, 1, 1.2]} c="#ea580c" />
      <Html position={[0, 0.6, 0.78]} center distanceFactor={9} zIndexRange={[20, 0]}>
        <div className="whitespace-nowrap rounded bg-white px-3 py-1 text-[11px] font-bold tracking-widest text-orange-700 shadow">
          JAGDISH BELWAL · RECEPTION
        </div>
      </Html>

      {/* monitor, bell */}
      <Box p={[1.4, 1.65, -0.2]} s={[1.1, 0.7, 0.06]} c="#111827" />
      <Box p={[1.4, 1.65, -0.16]} s={[0.98, 0.58, 0.02]} c="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
      <Box p={[1.4, 1.3, -0.2]} s={[0.12, 0.3, 0.12]} c="#374151" />
      <Cyl p={[-1.6, 1.2, 0.1]} rt={0.18} rb={0.22} h={0.2} c="#fbbf24" />

      {/* waiting area */}
      <Plant p={[-5.2, 0, -3.8]} s={1.2} />
      <Plant p={[5.6, 0, 1.0]} />
      <Box p={[5, 0.4, -3.6]} s={[3, 0.8, 1.3]} c="#9a3412" />
      <Box p={[5, 1.1, -4.1]} s={[3, 0.9, 0.3]} c="#7c2d12" />

      {show && (
        <Panel position={[0, 4.1, -4.9]}>
          <Card width={520} className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
              Welcome to my studio
            </p>
            <h1 className="mt-2 text-4xl font-bold leading-tight">
              Hi, I'm <span className="text-orange-600">{PROFILE.name}</span>
            </h1>
            <p className="mt-3 text-gray-600">{PROFILE.tagline}</p>
            <div className="mt-5 flex justify-center gap-3">
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-orange-600 px-5 py-2 text-white shadow transition hover:bg-orange-700"
              >
                View Resume
              </a>
              <button
                onClick={() => goTo(6)}
                className="rounded border border-orange-600 px-5 py-2 text-orange-600 transition hover:bg-orange-100"
              >
                Let's Connect
              </button>
            </div>
          </Card>
        </Panel>
      )}
    </Shell>
  )
}

// ── 2 · Meeting room (About) ─────────────────────────────────
export function Meeting() {
  const show = useShow(1)
  return (
    <Shell i={1} floor="#fed7aa">
      {/* big wall display */}
      <Box p={[0, 3.8, -5.15]} s={[11.6, 5.8, 0.1]} c="#ea580c" />
      <Box p={[0, 3.8, -5.07]} s={[11.2, 5.4, 0.1]} c="#1f2937" emissive="#7c2d12" emissiveIntensity={0.25} />

      {/* table + chairs */}
      <Cyl p={[0, 1, 1]} rt={2.4} h={0.16} c="#b8794a" seg={24} sc={[1.4, 1, 0.75]} />
      <Cyl p={[0, 0.5, 1]} rt={0.4} rb={0.55} h={1} c="#7c2d12" seg={8} />
      {[-2, 0, 2].map((x) => (
        <Chair key={`b${x}`} p={[x, 0, -1.5]} back={-1} />
      ))}
      {[-2, 0, 2].map((x) => (
        <Chair key={`f${x}`} p={[x, 0, 3.6]} back={1} />
      ))}
      {/* laptop + mugs */}
      <Box p={[-1.2, 1.12, 0.8]} s={[0.8, 0.05, 0.55]} c="#d1d5db" />
      <Box p={[-1.2, 1.4, 0.55]} s={[0.8, 0.55, 0.04]} c="#111827" r={[-0.25, 0, 0]} />
      <Cyl p={[1.4, 1.2, 1.3]} rt={0.12} h={0.22} c="#ffffff" seg={8} />
      <Cyl p={[0.6, 1.2, 0.5]} rt={0.12} h={0.22} c="#fbbf24" seg={8} />

      <Plant p={[5.6, 0, -3.8]} s={1.2} />
      <Plant p={[-5.8, 0, 3]} />

      {show && (
        <Panel position={[0, 3.9, -4.9]}>
          <Card width={540}>
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-700">
              {ABOUT.before}
              <strong>{ABOUT.company}</strong>
              {ABOUT.after} {ABOUT.second}
            </p>
          </Card>
        </Panel>
      )}
    </Shell>
  )
}

// ── 3 · Skills lab ───────────────────────────────────────────
function Tile({ p, color, label, show, big }) {
  return (
    <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.7} position={p}>
      <Box s={[big ? 3.1 : 2.9, big ? 0.9 : 0.78, 0.22]} c={color} />
      {show && (
        <Html position={[0, 0, 0.14]} center distanceFactor={9} zIndexRange={[20, 0]}>
          <div
            className={`pop-in whitespace-nowrap font-semibold text-white drop-shadow ${
              big ? 'text-[13px] uppercase tracking-widest' : 'text-[15px]'
            }`}
          >
            {label}
          </div>
        </Html>
      )}
    </Float>
  )
}

export function SkillsLab() {
  const show = useShow(2)
  const cols = [-4.6, 0, 4.6]
  return (
    <Shell i={2} floor="#fcd9b6">
      {/* glowing ring + spinning icosahedron */}
      <Cyl p={[0, 0.07, 2.4]} rt={1.4} h={0.06} c="#fb923c" emissive="#f97316" emissiveIntensity={0.5} seg={24} />
      <Spin p={[0, 1.7, 2.4]} speed={0.8}>
        <mesh>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color="#ea580c" wireframe />
        </mesh>
      </Spin>

      {SKILLS.map((cat, ci) => (
        <group key={cat.title}>
          <Tile p={[cols[ci], 5.9, -3.2]} color="#1f2937" label={cat.title} show={show} big />
          {cat.skills.map((sk, k) => (
            <Tile
              key={sk}
              p={[cols[ci], 4.8 - k * 0.95, -3.2]}
              color={cat.color}
              label={sk}
              show={show}
            />
          ))}
        </group>
      ))}
      <Plant p={[6, 0, 2]} />
    </Shell>
  )
}

// ── 4 · Office floor (Experience) ────────────────────────────
function Desk({ x }) {
  return (
    <group position={[x, 0, -1.4]}>
      <Box p={[0, 1, 0]} s={[3.4, 0.14, 1.5]} c="#c08457" />
      {[
        [-1.55, -0.6],
        [1.55, -0.6],
        [-1.55, 0.6],
        [1.55, 0.6],
      ].map(([lx, lz]) => (
        <Box key={`${lx}${lz}`} p={[lx, 0.5, lz]} s={[0.12, 1, 0.12]} c="#7c2d12" />
      ))}
      <Box p={[0, 1.75, -0.3]} s={[1.5, 0.95, 0.07]} c="#111827" />
      <Box p={[0, 1.75, -0.25]} s={[1.36, 0.8, 0.02]} c="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.6} />
      <Box p={[0, 1.2, -0.3]} s={[0.14, 0.3, 0.14]} c="#374151" />
      <Box p={[0, 1.1, 0.25]} s={[1.1, 0.05, 0.35]} c="#e5e7eb" />
      <Chair p={[0, 0, 1.5]} back={1} />
    </group>
  )
}

function JobCard({ job }) {
  return (
    <Card width={340} className="!p-5">
      <h3 className="text-lg font-semibold leading-snug">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.period}</p>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
        {job.tasks.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </Card>
  )
}

export function OfficeFloor() {
  const show = useShow(3)
  return (
    <Shell i={3} floor="#fed7aa">
      <Desk x={-3.9} />
      <Desk x={3.9} />
      <Plant p={[-6.2, 0, 3.2]} />
      <Plant p={[6.2, 0, -4]} />
      {/* wall clock */}
      <Cyl p={[0, 6, -5.1]} rt={0.5} h={0.1} c="#ffffff" r={[Math.PI / 2, 0, 0]} seg={20} />
      <Box p={[0, 6.1, -5.03]} s={[0.04, 0.35, 0.02]} c="#111827" />
      <Box p={[0.1, 6, -5.03]} s={[0.25, 0.04, 0.02]} c="#ea580c" />
      {show && (
        <>
          <Panel position={[-3.9, 3.6, -3.4]}>
            <div className="pop-in" style={{ animationDelay: '0s' }}>
              <JobCard job={EXPERIENCE[0]} />
            </div>
          </Panel>
          <Panel position={[3.9, 3.6, -3.4]}>
            <div className="pop-in" style={{ animationDelay: '0.15s' }}>
              <JobCard job={EXPERIENCE[1]} />
            </div>
          </Panel>
        </>
      )}
    </Shell>
  )
}

// ── 5 · Gallery (Projects) ───────────────────────────────────
function Frame({ x }) {
  return (
    <group position={[x, 3.7, -5.05]}>
      <Box s={[6, 4.6, 0.2]} c="#7c2d12" />
      <Box p={[0, 0, 0.12]} s={[5.6, 4.2, 0.05]} c="#fff7ed" />
      <Cyl p={[0, 2.85, 0.5]} rt={0.12} rb={0.2} h={0.4} c="#1f2937" r={[0.4, 0, 0]} seg={8} />
    </group>
  )
}

export function Gallery() {
  const show = useShow(4)
  return (
    <Shell i={4} floor="#fdd5ad">
      <Frame x={-3.6} />
      <Frame x={3.6} />

      {/* pedestal with a rotating showpiece */}
      <Cyl p={[0, 0.5, 1.8]} rt={0.9} h={1} c="#ffffff" seg={16} />
      <Spin p={[0, 1.95, 1.8]} speed={0.9}>
        <mesh>
          <torusKnotGeometry args={[0.5, 0.16, 64, 8]} />
          <meshStandardMaterial color="#ea580c" flatShading roughness={0.5} />
        </mesh>
      </Spin>
      <Plant p={[-6, 0, 2.5]} />
      <Plant p={[6, 0, 2.5]} />

      {show &&
        PROJECTS.map((pr, i) => (
          <Panel key={pr.title} position={[i === 0 ? -3.6 : 3.6, 3.7, -4.8]}>
            <div className="pop-in" style={{ animationDelay: `${i * 0.15}s` }}>
              <Card width={300} className="!p-5 transition-transform duration-300 hover:scale-105">
                <h3 className="text-xl font-bold">{pr.title}</h3>
                <p className="mt-2 text-gray-700">{pr.description}</p>
              </Card>
            </div>
          </Panel>
        ))}
    </Shell>
  )
}

// ── 6 · Library (Education) ──────────────────────────────────
const BOOK_COLORS = ['#ea580c', '#0ea5e9', '#16a34a', '#a855f7', '#eab308', '#ef4444', '#14b8a6', '#334155']

function useBooks() {
  return useMemo(() => {
    let seed = 7
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647
    const out = []
    ;[1.4, 2.9, 4.4].forEach((y) => {
      let x = -5.6
      while (x < 5.4) {
        const w = 0.2 + rand() * 0.25
        const h = 0.7 + rand() * 0.6
        out.push({ x: x + w / 2, y: y + h / 2 + 0.06, w, h, c: BOOK_COLORS[Math.floor(rand() * BOOK_COLORS.length)] })
        x += w + 0.03
      }
    })
    return out
  }, [])
}

export function Library() {
  const show = useShow(5)
  const books = useBooks()
  return (
    <Shell i={5} floor="#fcd9b6">
      <Box p={[0, 3.1, -4.9]} s={[12.2, 6, 0.2]} c="#7c2d12" />
      {[1.3, 2.8, 4.3, 5.8].map((y) => (
        <Box key={y} p={[0, y, -4.5]} s={[12.2, 0.12, 0.9]} c="#a16207" />
      ))}
      {books.map((b, i) => (
        <Box key={i} p={[b.x, b.y, -4.5]} s={[b.w, b.h, 0.6]} c={b.c} />
      ))}

      {/* reading corner */}
      <Cyl p={[5, 0.55, 1.4]} rt={0.7} h={0.1} c="#c08457" seg={16} />
      <Cyl p={[5, 0.28, 1.4]} rt={0.1} h={0.55} c="#7c2d12" seg={6} />
      <Cyl p={[5, 0.3, 1.4]} rt={0.5} rb={0.5} h={0.04} c="#a16207" seg={16} />
      <Ball p={[5, 1.05, 1.4]} rad={0.28} c="#fde68a" emissive="#fbbf24" emissiveIntensity={0.9} />
      {/* globe */}
      <Cyl p={[-5, 0.6, 1.2]} rt={0.1} rb={0.4} h={1.2} c="#7c2d12" seg={8} />
      <Spin p={[-5, 1.7, 1.2]} speed={0.5}>
        <mesh>
          <sphereGeometry args={[0.7, 14, 10]} />
          <meshStandardMaterial color="#0ea5e9" flatShading wireframe />
        </mesh>
      </Spin>
      <Plant p={[6.2, 0, -3]} />

      {show &&
        EDUCATION.map((ed, i) => (
          <Panel key={ed.degree} position={[i === 0 ? -3.6 : 3.6, 3.7, -4.0]}>
            <div className="pop-in" style={{ animationDelay: `${i * 0.15}s` }}>
              <Card width={320} className="!p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
                  {i === 0 ? 'Degree' : 'Schooling'}
                </p>
                <h3 className="mt-1 text-xl font-bold">{ed.degree}</h3>
                <p className="mt-1 text-sm text-gray-600">{ed.institution}</p>
              </Card>
            </div>
          </Panel>
        ))}
    </Shell>
  )
}

// ── 7 · Contact desk ─────────────────────────────────────────
export function ContactDesk() {
  const show = useShow(6)
  const xs = [-5.4, -1.8, 1.8, 5.4]
  return (
    <Shell i={6} floor="#fdba74">
      <Box p={[0, 0.55, 0.6]} s={[8, 1.1, 1.4]} c="#ea580c" />
      <Box p={[0, 1.15, 0.6]} s={[8.4, 0.14, 1.7]} c="#c08457" />
      <Plant p={[-6, 0, 2]} />
      <Plant p={[6, 0, 2]} />

      {CONTACT.map((c, i) => (
        <Float key={c.key} speed={1.4} floatIntensity={0.8} rotationIntensity={0.2} position={[xs[i], 3.5, -3.4]}>
          <Ball rad={1.35} c={c.color} seg={12} opacity={0.35} transparent />
        </Float>
      ))}

      {show && (
        <>
          <Panel position={[0, 6.0, -4.8]}>
            <Card width={520} className="text-center !py-4">
              <h2 className="text-3xl font-bold">Get in Touch</h2>
              <p className="mt-1 text-gray-700">{CONTACT_INTRO}</p>
            </Card>
          </Panel>
          {CONTACT.map((c, i) => (
            <Panel key={c.key} position={[xs[i], 3.5, -3.2]} df={11}>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : '_self'}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="pop-in flex w-40 flex-col items-center gap-2 rounded-2xl bg-white/95 p-4 text-center shadow-xl transition-transform duration-300 hover:scale-110"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white"
                  style={{ background: c.color }}
                >
                  <c.Icon />
                </span>
                <span className="text-sm font-semibold text-gray-900">{c.label}</span>
                <span className="break-all text-[11px] text-gray-500">{c.value}</span>
              </a>
            </Panel>
          ))}
          <Panel position={[0, 1.7, 0.6]} df={10}>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="pop-in whitespace-nowrap rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-700"
            >
              📄 View Resume
            </a>
          </Panel>
        </>
      )}
    </Shell>
  )
}
