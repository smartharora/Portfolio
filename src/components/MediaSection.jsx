import React, { useState } from 'react';
import { FaSpotify, FaGamepad, FaBook, FaSteam, FaWindows, FaBookOpen, FaGoodreads, FaChevronDown, FaLink, FaCode, FaGithub, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import SpotifyWidget from './SpotifyWidget';

// eslint-disable-next-line no-unused-vars
const MediaCard = ({ icon: Icon, title, children }) => {
  return (
    <div
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className="text-2xl text-green-400" />
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
};

const GamingWidget = () => {
  const [expandedGame, setExpandedGame] = useState(null);
  
  const games = [
    {
      title: "Black Myth: Wukong",
      platform: "PC",
      status: "Currently Playing",
      icon: FaWindows,
      image: "/images/games/wukong.jpg",
      description: "An action RPG based on Journey to the West, featuring stunning visuals and intense combat.",
      progress: "Chapter 2",
      link: "https://www.blackmythwukong.com"
    },
    {
      title: "Red Dead Redemption 2",
      platform: "PC",
      status: "Currently Playing",
      icon: FaSteam,
      image: "/images/games/rdr2.jpg",
      description: "An epic tale of life in America's unforgiving heartland.",
      progress: "Chapter 1",
      link: "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/"
    },
    {
      title: "Ghost of Tsushima",
      platform: "PlayStation",
      status: "Completed",
      icon: FaGamepad,
      image: "/images/games/ghost.jpg",
      description: "A samurai's journey through feudal Japan during the Mongol invasion.",
      progress: "100%",
      link: "https://www.playstation.com/en-us/games/ghost-of-tsushima/"
    },
    {
      title: "God of War Ragnarök",
      platform: "PlayStation",
      status: "Completed",
      icon: FaGamepad,
      image: "/images/games/gow.jpg",
      description: "Kratos and Atreus's journey through the Nine Realms.",
      progress: "100%",
      link: "https://www.playstation.com/en-us/games/god-of-war-ragnarok/"
    }
  ];

  return (
    <div className="space-y-4">
      {games.map((game, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-800/50 rounded-lg overflow-hidden"
        >
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/30 transition-colors"
            onClick={() => setExpandedGame(expandedGame === index ? null : index)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-white">{game.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{game.platform}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-sm text-gray-400">{game.status}</span>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expandedGame === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400"
            >
              <FaChevronDown />
            </motion.div>
          </div>
          
          <AnimatePresence>
            {expandedGame === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 border-t border-gray-700/50">
                  <p className="text-sm text-gray-400 mb-3">{game.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>Progress: {game.progress}</span>
                  </div>
                  <a 
                    href={game.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <FaLink />
                    View Game
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const ProjectsWidget = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  
  const projects = [
    {
      title: "AI Code Assistant",
      tech: "Python, OpenAI, FastAPI",
      status: "In Progress",
      description: "Building an AI-powered code assistant that helps with code review and suggestions.",
      github: "https://github.com/yourusername/ai-assistant",
      demo: "https://ai-assistant-demo.vercel.app"
    },
    {
      title: "Smart Home Dashboard",
      tech: "React, Node.js, MQTT",
      status: "Completed",
      description: "A real-time dashboard for monitoring and controlling smart home devices.",
      github: "https://github.com/yourusername/smart-home",
      demo: "https://smart-home-demo.vercel.app"
    }
  ];

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-gray-800/50 rounded-lg overflow-hidden"
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700/30 transition-colors"
            onClick={() => setExpandedProject(expandedProject === index ? null : index)}
          >
            <div className="flex items-center gap-4">
              <FaCode className="text-2xl text-purple-400" />
              <div>
                <h4 className="font-medium text-white">{project.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{project.tech}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="text-sm text-gray-400">{project.status}</span>
                </div>
              </div>
            </div>
            <div
              className="text-gray-400"
            >
              {expandedProject === index ? '▲' : '▼'}
            </div>
          </div>

          <div
            className={`overflow-hidden ${expandedProject === index ? '' : 'hidden'}`}
          >
            <div className="p-4 pt-0 border-t border-gray-700/50">
              <p className="text-sm text-gray-400 mb-3">{project.description}</p>
              <div className="flex items-center gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <FaGithub />
                  View Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ReadingWidget = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [expandedBook, setExpandedBook] = useState(null);
  
  const books = {
    current: [
      {
        title: "The Pragmatic Programmer",
        author: "Dave Thomas, Andy Hunt",
        progress: 75,
        link: "https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer",
        notes: "Essential reading for any developer. Key takeaways: DRY principle, orthogonality, and the importance of automation.",
        rating: 5
      }
    ],
    completed: [
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        link: "https://www.goodreads.com/book/show/3735293-clean-code",
        notes: "A must-read for writing maintainable code. Changed how I approach software development.",
        rating: 5,
        dateCompleted: "March 2024"
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        link: "https://www.goodreads.com/book/show/25744928-deep-work",
        notes: "Great insights on maintaining focus and productivity in a distracted world.",
        rating: 4,
        dateCompleted: "February 2024"
      }
    ]
  };

  const renderBook = (book, index, isCompleted = false) => (
    <div
      key={index}
      className="bg-gray-800/50 rounded-lg overflow-hidden"
    >
      <div 
        className="p-4 cursor-pointer hover:bg-gray-700/30 transition-colors"
        onClick={() => setExpandedBook(expandedBook === index ? null : index)}
      >
        <div className="flex items-center gap-2 mb-2">
          <FaBookOpen className="text-yellow-400" />
          <h4 className="font-medium text-white">{book.title}</h4>
          {isCompleted && (
            <FaCheckCircle className="text-green-400 ml-auto" />
          )}
        </div>
        <p className="text-sm text-gray-400 mb-3">by {book.author}</p>
        {!isCompleted && (
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-yellow-400"
            />
          </div>
        )}
        {isCompleted && (
          <p className="text-sm text-gray-500">Completed: {book.dateCompleted}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          {!isCompleted && (
            <span className="text-sm text-gray-400">{book.progress}% complete</span>
          )}
          <div
            className="text-gray-400"
          >
            {expandedBook === index ? '▲' : '▼'}
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden ${expandedBook === index ? '' : 'hidden'}`}
      >
        <div className="p-4 pt-0 border-t border-gray-700/50">
          <p className="text-sm text-gray-400 mb-3">{book.notes}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(book.rating)].map((_, i) => (
                <span
                  key={i}
                  className="text-yellow-400"
                >
                  ★
                </span>
              ))}
            </div>
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGoodreads className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            activeTab === 'current'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Currently Reading
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            activeTab === 'completed'
              ? 'bg-green-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Completed
        </button>
      </div>

      <div
        className="space-y-4"
      >
        {activeTab === 'current'
          ? books.current.map((book, index) => renderBook(book, index))
          : books.completed.map((book, index) => renderBook(book, index, true))}
      </div>
    </div>
  );
};

const MediaSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MediaCard icon={FaSpotify} title="My Playlists">
        <SpotifyWidget />
      </MediaCard>
      
      <MediaCard icon={FaGamepad} title="Gaming">
        <GamingWidget />
      </MediaCard>
      
      <MediaCard icon={FaCode} title="Side Projects">
        <ProjectsWidget />
      </MediaCard>
      
      <MediaCard icon={FaBook} title="Reading List">
        <ReadingWidget />
      </MediaCard>
    </div>
  );
};

export default MediaSection; 