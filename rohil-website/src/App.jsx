import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, Briefcase, ExternalLink, Github, Linkedin, Mail, Calendar, Heart } from 'lucide-react';
import '@fontsource/playfair-display/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/orbitron/700.css';
import './App.css';

// Tech Icons mapping
const TECH_ICONS = {
  React: 'https://cdn.simpleicons.org/react',
  TypeScript: 'https://cdn.simpleicons.org/typescript',
  "Tailwind CSS": 'https://cdn.simpleicons.org/tailwindcss',
  'Framer Motion': 'https://cdn.simpleicons.org/framer',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs',
  Python: 'https://cdn.simpleicons.org/python',
  PostgreSQL: 'https://cdn.simpleicons.org/postgresql',
  Git: 'https://cdn.simpleicons.org/git',
  Docker: 'https://cdn.simpleicons.org/docker',
  AWS: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_179x109.png',
  "VS Code": 'https://cdn.jsdelivr.net/gh/vscode-icons/vscode-icons@master/icons/file_type_vscode.svg',
  Flask: 'https://cdn.simpleicons.org/flask',
  Selenium: 'https://cdn.simpleicons.org/selenium',
  SQLAlchemy: 'https://cdn.simpleicons.org/postgresql',
  Firebase: 'https://cdn.simpleicons.org/firebase',
  JavaScript: 'https://cdn.simpleicons.org/javascript',
  HTML: 'https://cdn.simpleicons.org/html5',
  CSS: 'https://cdn.simpleicons.org/css3',
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  C: 'https://cdn.simpleicons.org/c/white',
  'C++': 'https://cdn.simpleicons.org/cplusplus',
  MySQL: 'https://cdn.simpleicons.org/mysql',
  Jira: 'https://cdn.simpleicons.org/jira'
};

const TABS = [
  { id: 'about', label: 'Home', icon: <User size={18} /> },
  { id: 'interests', label: 'Interests', icon: <Heart size={18} /> },
  { id: 'projects', label: 'Projects', icon: <Code size={18} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> }
];

const PROJECTS = [
  {
    title: "Vora",
    description: <>
      <div className="text-lg md:text-xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text">🏆 HackDuke Track Winner 2025</div>
      <div>Developed a personalized meal planning and tracking system using cosine similarity for meal recommendation, user profile-based filtering, and nutritional optimization, featuring a meal rating system with persistent storage and dynamic preference learning to enhance future suggestions.</div>
    </>,
    tech: ["Flask", "Tailwind CSS", "JavaScript", "Python", "React", "Selenium", "SQLAlchemy", "TypeScript", "Anthropic API"],
    link: "https://github.com/tbachu/Vora",
    liveLink: "https://vora-nutrition-git-main-tanish-bachus-projects.vercel.app/",
    image: "/rohil-website/images/vora.png"
  },
  {
    title: "Algorithmic Trading Bot",
    description: <>
      <div>Built an algorithmic trading bot that analyzes S&P 500 equities using technical indicators (SMA, EMA, RSI, MACD), statistical arbitrage, machine learning models (regression, classification), and Monte Carlo simulations to optimize stock selection.</div>
    </>,
    tech: ["Python", "Random forest", "Scikit-learn", "YFinance API", "SVM", "Monte-Carlo simulations"],
    link: "https://github.com/rohiljain2/algorithmic_trading",
    image: "/rohil-website/images/trading.png"
  },
  {
    title: "Fiscatch - Phishing Detection App",
    description: <>
      <div className="text-lg md:text-xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text">🏆 CT Science Fair 5th Place Winner</div>
      <div>Developed a phishing detection system using RoBERTa-based LLM and RNN models in Python to classify over 20,000 emails through advanced NLP and metadata analysis.</div>
    </>,
    tech: ["Python", "PyTorch", "NLP", "Transformers", "Neural Networks", "LLMs", "Streamlit"],
    image: "/rohil-website/images/cyber.png"
  }
];

const SKILLS = [
  { 
    category: "Frontend", 
    items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML", "CSS"] 
  },
  { 
    category: "Backend", 
    items: ["Node.js", "Python", "Java", "C", "C++", "PostgreSQL", "MySQL", "Flask"] 
  },
  { 
    category: "Tools", 
    items: ["Git", "Docker", "AWS", "VS Code", "Selenium", "Jira"] 
  }
];

const EXPERIENCE = [
  {
    title: "Early Insights Participant",
    company: "Morgan Stanley",
    period: "Feb. 2025 - Feb. 2025",
    description: "Selected as a participant in Morgan Stanley’s Early Insights Tech Program, gaining hands-on exposure to technology-driven finance, software engineering, and innovation through technical workshops, mentorship, and networking with senior technologists.",
    technologies: [],
    image: "/rohil-website/images/morgan_stanely.png",
    imagePosition: "right"
  },
  {
    title: "AI Researcher",
    company: "UNC Gillings School of Global Public Health",
    period: "Sept. 2024 - Present",
    description: "Developed AI models using NLP and reinforcement learning on 15,000+ patient data points, improving cancer treatment recommendations by 25% and reducing healthcare decision-making bias by 30% through comparative analysis of KTO, DPO, and RLHF.",
    technologies: ["Python", "PyTorch", "Tensorflow", "Hugging Face Transformers", "Optuna", "Google Cloud"],
    image: "/rohil-website/images/gillings.png",
    imagePosition: "right"
  },
  {
    title: "Software Engineering Intern",
    company: "AdhereHealth",
    period: " Jun. 2023 - Sept. 2023",
    description: "Engineered automated ETL pipelines and implemented 300+ SQL-based data quality rules, reducing processing time by 40%, enhancing data integrity in healthcare analytics, and streamlining onboarding with detailed technical documentation and validation workflows.",
    technologies: ["SQL", "Python", "PyTest", "Jira", "AWS", "Bash", "Confluence"],
    image: "/rohil-website/images/adherehealth.png",
    imagePosition: "right"
  },
];

const SOCIAL_LINKS = [
  { icon: <Github size={20} />, url: "https://github.com/rohiljain2", label: "GitHub" },
  { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/rohil-jain-b5370a28b/", label: "LinkedIn" },
  { icon: <Mail size={20} />, url: "mailto:rohil.jain.66@gmail.com", label: "Email" }
];

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const skillsCardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 0 30px rgba(45,212,191,0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

// Add new animation variants for creative effects
const floatingCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const TypeWriter = ({ text, className, delay = 0.05 }) => {
  const characters = text.split('');
  
  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: delay * index }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const Star = ({ top, left, size, delay }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: size,
      height: size,
      boxShadow: `0 0 ${parseFloat(size) * 2}px rgba(255, 255, 255, 0.5)`,
    }}
    animate={{
      opacity: [0.2, 1, 0.2],
      scale: [1, 1.2, 1],
      boxShadow: [
        `0 0 ${parseFloat(size) * 2}px rgba(255, 255, 255, 0.2)`,
        `0 0 ${parseFloat(size) * 3}px rgba(255, 255, 255, 0.5)`,
        `0 0 ${parseFloat(size) * 2}px rgba(255, 255, 255, 0.2)`,
      ],
    }}
    transition={{
      duration: Math.random() * 2 + 2,
      repeat: Infinity,
      delay: delay,
    }}
  />
);

const Stars = ({ count = 50 }) => {
  const stars = Array.from({ length: count }, (_, i) => {
    // Create some larger stars randomly
    const isLargeStar = Math.random() < 0.2; // 20% chance of being a larger star
    const baseSize = isLargeStar ? 
      Math.random() * 3 + 3 : // 3-6px for large stars
      Math.random() * 2 + 2;  // 2-4px for regular stars
    
    return {
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: baseSize + 'px',
      delay: Math.random() * 2,
    };
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <Star key={star.id} {...star} />
      ))}
    </div>
  );
};

function TabContent({ tab }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={container}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      {tab === 'about' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-8">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text flex items-center gap-4"
              variants={item}
            >
              <span>Hello, I'm Rohil!</span>
              <span className="animate-wave">👋</span>
            </motion.h1>
            <motion.div
              variants={item}
              className="hidden md:block flex-shrink-0"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse"></div>
                <img 
                  src="/rohil-website/images/profile.png" 
                  alt="Rohil Jain"
                  className="relative w-80 h-80 rounded-full border-4 border-white/10 object-cover object-[center_15%] shadow-lg 
                    hover:border-teal-400/40 transition-all duration-300
                    ring-2 ring-teal-500/20 ring-offset-4 ring-offset-[#0d1117]
                    group-hover:ring-teal-500/40 group-hover:shadow-teal-500/20"
                />
              </div>
            </motion.div>
          </div>
          <motion.div 
            variants={item}
            className="bg-[#1a2234] backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-teal-500/20 transition-colors"
          >
            <TypeWriter 
              text="I'm a Computer Science and Business student at the University of North Carolina at Chapel Hill!"
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto inline-block"
              delay={0.05}
            />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text mb-6">
            Professional Tech Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                variants={skillsCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-[#1a2234] backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-teal-500/40 transition-all"
              >
                <h3 className="text-xl font-semibold mb-4 text-teal-400">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {skillGroup.items.map((skill, i) => (
                    <motion.div 
                      key={skill} 
                      className="flex items-center gap-2 text-gray-300"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <img 
                        src={TECH_ICONS[skill]} 
                        alt={skill} 
                        className={`${
                          skill === 'AWS' ? 'w-12 h-5' :
                          skill === 'C' ? 'w-4 h-4' :
                          'w-5 h-5'
                        } object-contain`}
                      />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text mb-6">
              Let's Connect!
            </h2>
            <div className="bg-[#1a2234] backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-teal-500/20 transition-colors">
              <p className="text-lg text-gray-300 mb-6">
                Feel free to reach out if you'd like to collaborate, discuss opportunities, or just chat about technology!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {SOCIAL_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500/10 rounded-lg text-teal-300 hover:bg-teal-500/20 transition-colors border border-teal-500/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {tab === 'projects' && (
        <div className="space-y-8">
          <motion.h2 
            variants={item}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text"
          >
            Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-[#1a2234] backdrop-blur-sm rounded-xl p-5 border border-white/5 hover:border-teal-500/40 transition-all flex flex-col h-full hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] hover:bg-[#1c2538]"
              >
                {project.image && (
                  <div className="mb-4 rounded-lg overflow-hidden group relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-auto max-h-[280px] object-contain rounded-lg hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex gap-4">
                        {project.liveLink && (
                          <a 
                            href={project.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-teal-500/20 p-2 rounded-full hover:bg-teal-500/30 transition-colors"
                          >
                            <ExternalLink size={24} className="text-white" />
                          </a>
                        )}
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-teal-500/20 p-2 rounded-full hover:bg-teal-500/30 transition-colors"
                          >
                            <Github size={24} className="text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-teal-400">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-teal-400/70 hover:text-teal-300">
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-teal-400/70 hover:text-teal-300">
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded-full bg-teal-500/10 text-xs text-teal-300/90 border border-teal-500/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {tab === 'interests' && (
        <div className="space-y-12">
          <motion.h2 
            variants={item}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text text-center"
          >
            Background & Interests
          </motion.h2>

          {/* Intro section with floating animation */}
          <motion.div 
            variants={item}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 blur-xl rounded-3xl"></div>
            <div className="bg-[#1a2234]/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 relative">
              <TypeWriter 
                text="I am originally from Wilton, CT. I'm passionate about combining technology and finance to make a change. My career interests are in Software Engineering or Quantitative Trading, leveraging my technical skills to create innovative solutions in the financial sector."
                className="text-xl md:text-2xl text-gray-300 text-center"
                delay={0.05}
              />
            </div>
          </motion.div>

          {/* Hexagonal grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Trading & Finance */}
            <motion.div
              variants={floatingCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-[#1a2234]/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 transform hover:border-teal-500/40 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative">
                  <div className="h-64 overflow-hidden rounded-xl mb-6">
                    <img 
                      src="/rohil-website/images/investopedia.png"
                      alt="Trading setup"
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text mb-4">Trading & Finance</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I am very passionate about algorithmic trading and financial markets. I combine technical analysis with machine learning to develop trading strategies, allowing me to grow my portfolio from $100,000 to approximately $5,000,000.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Karate */}
            <motion.div
              variants={floatingCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-[#1a2234]/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 transform hover:border-teal-500/40 transition-all duration-300 group md:translate-y-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative">
                  <div className="h-64 overflow-hidden rounded-xl mb-6">
                    <img 
                      src="/rohil-website/images/karate.png"
                      alt="Karate practice"
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-4">Martial Arts</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I am a dedicated First-Degree Black Belt martial artist with years of training, learning discipline, focus, and perseverance through the art.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Volunteering */}
            <motion.div
              variants={floatingCardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-[#1a2234]/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 transform hover:border-teal-500/40 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative">
                  <div className="h-64 overflow-hidden rounded-xl mb-6">
                    <img 
                      src="/rohil-website/images/hindiusa.png"
                      alt="Volunteering"
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-4">Community Service</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I am actively involved in community service through HindiUSA, a nonprofit teaching Hindi and Indian culture. I am giving back to my heritage through various volunteering initiatives and a positive impact.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      
      {tab === 'experience' && (
        <div className="space-y-8">
          <motion.h2 
            variants={item}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text"
          >
            Experience
          </motion.h2>
          <div className="space-y-6">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-[#1a2234] backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-teal-500/40 transition-all hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] hover:bg-[#1c2538]"
              >
                <div className={`flex ${exp.imagePosition === 'right' ? 'flex-row' : 'flex-col'} gap-6`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-teal-400" />
                      <span className="text-teal-400">{exp.period}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-100">{exp.title}</h3>
                    <h4 className="text-xl text-teal-400 mb-2">{exp.company}</h4>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 rounded-full bg-teal-500/10 text-sm text-teal-300 border border-teal-500/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {exp.image && (
                    <div className={`flex-1 ${exp.imagePosition === 'right' ? 'ml-4' : 'mt-4'} flex items-center`}>
                      <img 
                        src={exp.image} 
                        alt={`${exp.company} work`}
                        className={`w-full h-auto rounded-lg hover:scale-[1.02] transition-transform duration-300 object-contain
                          ${exp.company === "AdhereHealth" ? "max-h-[200px]" : "max-h-[280px]"}`}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Stars count={100} />
      {/* Animated background accents */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-6 z-50"
      >
        <div
          className="text-3xl font-['Pacifico'] bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 text-transparent bg-clip-text logo-animate"
          style={{
            fontFamily: 'Pacifico, cursive'
          }}
        >
          RJ
        </div>
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 p-6 flex justify-center gap-4 bg-slate-900/50 backdrop-blur-md border-b border-white/5 z-50">
        {TABS.map((tab, i) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'bg-white/10 text-white' 
                : 'hover:bg-white/5 text-white/70'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Content */}
      <main className="container mx-auto pt-24 px-6">
        <AnimatePresence mode="wait">
          <TabContent tab={activeTab} />
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 px-6 text-center">
        <div className="flex justify-center gap-4 mb-4">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        <p className="text-gray-500">© {new Date().getFullYear()} Rohil Jain. All rights reserved.</p>
      </footer>
      </div>
    </div>
  );
}