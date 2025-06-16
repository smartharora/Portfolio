import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useInView } from 'react-intersection-observer';
import { FaDownload, FaPlay, FaPause, FaRandom } from 'react-icons/fa';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const downloadButton = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

export default function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const videoRefs = useRef([]);

  const backgroundVideos = [
    {
      src: "/videos/background.mp4",
      title: "Main Background"
    },
    {
      src: "/videos/background2.mp4",
      title: "Alternative Background"
    }
  ];

  useEffect(() => {
    // Initialize video refs array
    videoRefs.current = videoRefs.current.slice(0, backgroundVideos.length);

    // Play the current video
    const playCurrentVideo = async () => {
      const video = videoRefs.current[currentVideoIndex];
      if (video) {
        try {
          if (isPlaying) {
            await video.play();
            console.log('Video started playing');
          } else {
            video.pause();
          }
        } catch (error) {
          console.error('Error playing video:', error);
        }
      }
    };

    // Add event listeners for better debugging
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.addEventListener('loadeddata', () => {
          console.log(`Video ${index} loaded successfully`);
          if (index === currentVideoIndex) {
            playCurrentVideo();
          }
        });

        video.addEventListener('error', (e) => {
          console.error(`Video ${index} error:`, e);
        });
      }
    });

    // Initial attempt to play
    playCurrentVideo();
  }, [currentVideoIndex, isPlaying]);

  const handleVideoEnd = () => {
    if (isAutoPlay) {
      // Switch to next video when current one ends
      setCurrentVideoIndex((prevIndex) => 
        (prevIndex + 1) % backgroundVideos.length
      );
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const switchVideo = () => {
    setCurrentVideoIndex((prevIndex) => 
      (prevIndex + 1) % backgroundVideos.length
    );
  };

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center text-white px-4 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideoIndex}
            ref={el => videoRefs.current[currentVideoIndex] = el}
            autoPlay
            loop={!isAutoPlay}
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ backgroundColor: 'black' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <source src={backgroundVideos[currentVideoIndex].src} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </AnimatePresence>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-6 left-6 z-10 flex items-center gap-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
        <button
          onClick={togglePlay}
          className="text-white hover:text-blue-400 transition-colors"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        
        <button
          onClick={switchVideo}
          className="text-white hover:text-blue-400 transition-colors"
          aria-label="Switch video"
        >
          <FaRandom />
        </button>

        <div className="h-4 w-px bg-white/30" />

        <button
          onClick={toggleAutoPlay}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            isAutoPlay 
              ? 'bg-blue-500 text-white' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Auto
        </button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative max-w-4xl mx-auto text-center z-10"
      >
        <motion.h1 
          variants={item}
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Hello, I'm <span className="text-white">Smarth Arora</span>
        </motion.h1>
        
        <motion.p 
          variants={item}
          className="text-xl md:text-2xl mb-8 text-gray-300"
        >
          Full-Stack Developer & Platform Engineer with{' '}
          <span className="text-blue-400 font-semibold">7+ years</span> crafting scalable, high-performance systems.
        </motion.p>

        <motion.div 
          variants={item}
          className="text-xl md:text-2xl mb-12 h-12 text-blue-400"
        >
          <Typewriter
            words={[
              'I build real-time IoT back-ends',
              'I automate CI/CD pipelines',
              'I experiment with modern frontend',
              'I optimize database performance',
              'I design microservices architecture',
              'I fly drones',
              'I Also try to not crash drones',
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.div>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="#contact"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.a>
          
          <motion.a
            href="/resume/SmarthArora-Resume.pdf"
            download
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            variants={downloadButton}
            whileHover="hover"
            whileTap="tap"
          >
            <FaDownload />
            Download Resume
          </motion.a>
        </motion.div>

        <motion.div 
          variants={item}
          className="mt-12 text-gray-400 text-sm"
        >
          Scroll down to explore more
        </motion.div>
      </motion.div>
    </section>
  );
}
