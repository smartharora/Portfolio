import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import FloatingPortals from './components/FloatingPortals';

function App() {
  return (
    <div className="bg-gray-800 text-gray-100">
      <main>
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <FloatingPortals />
    </div>
  );
}

export default App;
