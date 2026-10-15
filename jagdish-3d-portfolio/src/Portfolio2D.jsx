import React, { useState } from 'react'
import 'animate.css'
import { useStore } from './store'
import {
  PROFILE,
  ABOUT,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  EDUCATION,
  CONTACT,
  CONTACT_INTRO,
} from './data'

// The original 2D portfolio. It's the fallback for phones, low-power
// devices and browsers without WebGL, and visitors can pick it any time.
// (Fix: the "Intro" link now points at #hero instead of a missing #intro.)
const NAV = [
  ['hero', 'Intro'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['education', 'Education'],
  ['contact', 'Contact'],
]

export default function Portfolio2D() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const webgl = useStore((s) => s.webgl)
  const setMode = useStore((s) => s.setMode)

  return (
    <div className="font-sans bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 animate__animated animate__fadeInDown">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex justify-between items-center w-full md:w-auto">
            <h1 className="text-xl font-bold text-orange-600 transition-transform duration-300 hover:scale-105">
              {PROFILE.shortName}
            </h1>
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          <ul
            className={`flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-700 w-full md:w-auto mt-4 md:mt-0 transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'flex' : 'hidden md:flex'
            }`}
          >
            {NAV.map(([id, label]) => (
              <li key={id} className="mb-2 md:mb-0">
                <a
                  href={`#${id}`}
                  className="block md:inline-block hover:text-orange-600 transition-colors duration-300 hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 flex flex-col justify-center items-center text-center px-4 pt-20 animate__animated animate__fadeIn"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate__animated animate__zoomIn animate__delay-1s">
          Hi, I'm <span className="text-orange-600">{PROFILE.name}</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mb-6 animate__animated animate__fadeInUp animate__delay-2s">
          {PROFILE.tagline}
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate__animated animate__fadeInUp animate__delay-3s">
          <a
            href={PROFILE.resume}
            className="bg-orange-600 text-white px-6 py-2 rounded shadow hover:bg-orange-700 transition-all duration-300 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
          <a
            href="#contact"
            className="border border-orange-600 text-orange-600 px-6 py-2 rounded hover:bg-orange-100 transition-all duration-300 hover:scale-105"
          >
            Let's Connect
          </a>
          {webgl && (
            <button
              onClick={() => setMode('3d')}
              className="bg-gray-900 text-white px-6 py-2 rounded shadow hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              ✨ Take the 3D tour
            </button>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 max-w-6xl mx-auto animate__animated animate__fadeInLeft">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {ABOUT.before}
          <strong>{ABOUT.company}</strong>
          {ABOUT.after} {ABOUT.second}
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-gray-100 py-20 px-6 animate__animated animate__fadeIn">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILLS.map((category, index) => (
              <div key={category.title} className={`animate__animated animate__fadeInUp animate__delay-${index + 1}s`}>
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {category.skills.map((skill) => (
                    <li key={skill} className="transition-transform duration-300 hover:translate-x-2">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 max-w-6xl mx-auto animate__animated animate__fadeInRight">
        <h2 className="text-3xl font-bold mb-10">Work Experience</h2>
        <div className="space-y-8">
          {EXPERIENCE.map((job, index) => (
            <div key={job.title} className={`animate__animated animate__fadeInUp animate__delay-${index + 1}s`}>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.period}</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {job.tasks.map((task) => (
                  <li key={task} className="transition-transform duration-300 hover:translate-x-2">
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-gray-100 py-20 px-6 animate__animated animate__fadeIn">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <div
                key={project.title}
                className={`bg-white rounded shadow p-6 transition-transform duration-300 hover:scale-105 animate__animated animate__fadeInUp animate__delay-${index + 1}s`}
              >
                <h3 className="font-bold text-xl">{project.title}</h3>
                <p className="text-gray-700 mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-20 px-6 max-w-6xl mx-auto animate__animated animate__fadeInLeft">
        <h2 className="text-3xl font-bold mb-10">Education</h2>
        <div className="space-y-4">
          {EDUCATION.map((edu, index) => (
            <div key={edu.degree} className={`animate__animated animate__fadeInUp animate__delay-${index + 1}s`}>
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-sm text-gray-500">{edu.institution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-orange-100 py-20 px-6 text-center animate__animated animate__fadeIn">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="mb-6 text-gray-700 animate__animated animate__fadeInUp animate__delay-1s">{CONTACT_INTRO}</p>
        <div className="flex justify-center gap-6 text-xl animate__animated animate__fadeInUp animate__delay-2s">
          {CONTACT.map((c) => (
            <a
              key={c.key}
              href={c.href}
              aria-label={c.label}
              className="hover:text-orange-600 transition-transform duration-300 hover:scale-125"
              target={c.href.startsWith('http') ? '_blank' : '_self'}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <c.Icon />
            </a>
          ))}
        </div>
      </section>

      {/* Floating 3D switch */}
      {webgl && (
        <button
          onClick={() => setMode('3d')}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-orange-700"
        >
          ✨ 3D tour with Aria
        </button>
      )}
    </div>
  )
}
