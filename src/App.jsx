import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-gray-800 text-gray-100">
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Contact />
    </div>
  );
}

export default App;
