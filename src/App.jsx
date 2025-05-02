import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-2">
            Hi, I'm YourName
          </h2>
          <h3 className="text-2xl mb-8">
            Software Developer | Python Expert
          </h3>
          <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg text-indigo-600 hover:bg-indigo-50">
            View My Work
          </button>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            About Me
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            I'm a software developer with expertise in backlolend technologies and Python.
            Currently focusing on improving my frontend skills with      React and Tailwind CSS.
          </p>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="font-bold text-xl">YourName</p>
          <p className="text-gray-400">© 2025 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;