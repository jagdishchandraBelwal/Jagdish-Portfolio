import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import 'animate.css';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-sans bg-white text-black">
      {/* Header Section */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 animate__animated animate__fadeInDown">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex justify-between items-center w-full md:w-auto">
            <h1 className="text-xl font-bold text-orange-600 transition-transform duration-300 hover:scale-105">
              Jagdish Belwal
            </h1>
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <ul
            className={`flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-700 w-full md:w-auto mt-4 md:mt-0 transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'flex' : 'hidden md:flex'
            }`}
          >
            {['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'].map((section) => (
              <li key={section} className="mb-2 md:mb-0">
                <a
                  href={`#${section}`}
                  className="block md:inline-block hover:text-orange-600 transition-colors duration-300 hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Rest of the sections remain unchanged */}
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 flex flex-col justify-center items-center text-center px-4 pt-20 animate__animated animate__fadeIn"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate__animated animate__zoomIn animate__delay-1s">
          Hi, I'm <span className="text-orange-600">Jagdish Chandra Belwal</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mb-6 animate__animated animate__fadeInUp animate__delay-2s">
          A Passionate Frontend Developer crafting high-performance web & mobile applications using React.js and React Native.
        </p>
        <div className="flex gap-4 animate__animated animate__fadeInUp animate__delay-3s">
          <a
            href="https://drive.google.com/file/d/1lDC1dR3bJeHSvNgPkRwW4iQRex7D8axT/view?usp=sharing"
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
        </div>
      </section>

 

      {/* About Section */}
      <section id="about" className="py-20 px-6 max-w-6xl mx-auto animate__animated animate__fadeInLeft">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          I'm a Frontend Developer based in Gurgaon, India, currently working at <strong>Novaigu</strong>. I specialize in modern UI/UX development using React and React Native for both web and mobile platforms.
          With a B.Tech degree in Computer Science and a passion for intuitive interfaces, I aim to build fast, scalable, and accessible applications.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-gray-100 py-20 px-6 animate__animated animate__fadeIn">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Frontend', skills: ['React.js', 'React Native', 'HTML5 / CSS3', 'JavaScript', 'Backend Integration'] },
              { title: 'Development Tools', skills: ['Visual Studio Code', 'Android Studio', 'XCode'] },
              { title: 'Relevant Skills', skills: ['Git / GitHub', 'SEO Basics', 'Code Debugging'] },
            ].map((category, index) => (
              <div key={category.title} className={`animate__animated animate__fadeInUp animate__delay-${index + 1}s`}>
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {category.skills.map((skill) => (
                    <li key={skill} className="transition-transform duration-300 hover:translate-x-2">{skill}</li>
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
          {[
            {
              title: 'Frontend Developer – Novaigu',
              period: 'Aug 2024 – Present',
              tasks: [
                'Developed License Manager UI using React.js',
                'Created cross-platform shopping app using React Native',
                'Integrated REST APIs and built reusable UI modules',
              ],
            },
            {
              title: 'Software Development Intern – Cairovision',
              period: 'Jul 2023 – Aug 2023',
              tasks: [
                'Built responsive websites with HTML, CSS, JavaScript',
                'Worked with Node.js, Express.js, and MongoDB',
              ],
            },
          ].map((job, index) => (
            <div key={job.title} className={`animate__animated animate__fadeInUp animate__delay-${index + 1}s`}>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.period}</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {job.tasks.map((task) => (
                  <li key={task} className="transition-transform duration-300 hover:translate-x-2">{task}</li>
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
            {[
              {
                title: '🛒 ScannyCloset Shopping Website',
                description: 'MERN stack shopping platform with cart, authentication, MongoDB backend.',
              },
              {
                title: '💃 Dance Learning Website',
                description: 'HTML, CSS, JS based responsive site for interactive dance tutorials.',
              },
            ].map((project, index) => (
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
          {[
            {
              degree: 'B.Tech – Computer Science',
              institution: 'GRD Institute of Management and Technology – 75% (2024)',
            },
            {
              degree: 'Intermediate',
              institution: 'Board of School Education Uttarakhand – 75% (2019)',
            },
          ].map((edu, index) => (
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
        <p className="mb-6 text-gray-700 animate__animated animate__fadeInUp animate__delay-1s">
          I'm always open to discussing new projects, freelance work, or joining creative teams.
        </p>
        <div className="flex justify-center gap-6 text-xl animate__animated animate__fadeInUp animate__delay-2s">
          {[
            { href: 'mailto:jaggibelwal2002@gmail.com', icon: <FaEnvelope /> },
            { href: 'tel:+919667309616', icon: <FaPhone /> },
            { href: 'https://www.linkedin.com/in/jagdish-chandra-belwal-76981929b', icon: <FaLinkedin /> },
            { href: 'https://github.com/', icon: <FaGithub /> },
          ].map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-orange-600 transition-transform duration-300 hover:scale-125"
              target={link.href.includes('http') ? '_blank' : '_self'}
              rel={link.href.includes('http') ? 'noopener noreferrer' : undefined}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </section>
    </div>

  );
}