import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, Briefcase, ExternalLink, Github, Linkedin, Mail, Calendar } from 'lucide-react';
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
  MySQL: 'https://cdn.simpleicons.org/mysql'
};

const TABS = [
  { id: 'about', label: 'About Me', icon: <User size={18} /> },
  { id: 'projects', label: 'Projects', icon: <Code size={18} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> }
];

const PROJECTS = [
  {
    title: "Vora",
    description: "Developed a personalized meal planning and tracking system using cosine similarity for meal recommendation, user profile-based filtering, and nutritional optimization, featuring a meal rating system with persistent storage and dynamic preference learning to enhance future suggestions.",
    tech: ["Flask", "Tailwind CSS", "Python", "React", "Selenium", "SQLAlchemy", "TypeScript"],
    link: "https://github.com/tbachu/Vora",
    liveLink: "https://vora-nutrition-git-main-tanish-bachus-projects.vercel.app/",
    image: "/Screenshot 2025-05-13 at 10.30.58 AM.png"
  },
  {
    title: "Insert Here",
    description: "Insert Description Here",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://github.com/yourusername/ecommerce"
  },
  {
    title: "Insert Here",
    description: "Insert Description Here",
    tech: ["React", "Firebase", "React DnD"],
    link: "https://github.com/yourusername/taskmanager"
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
    category: "Languages & Tools", 
    items: ["Git", "Docker", "AWS", "VS Code", "Selenium"] 
  }
];

const EXPERIENCE = [
  {
    title: "Insert Role Here",
    company: "Company Here",
    period: "2023 - Present",
    description: "Insert Description Here",
    technologies: ["React", "Node.js", "AWS"]
  },
  {
    title: "Insert Role Here",
    company: "Company Here",
    period: "2021 - 2023",
    description: "Developed and maintained full-stack applications",
    technologies: ["TypeScript", "Python", "MongoDB"]
  },
  {
    title: "Insert Role Here",
    company: "Company Here",
    period: "2020 - 2021",
    description: "Insert Description Here",
    technologies: ["JavaScript", "HTML/CSS", "Express"]
  }
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
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text flex items-center gap-4"
            variants={item}
          >
            <span>Hello, I'm Rohil!</span>
            <span className="animate-wave">👋</span>
          </motion.h1>
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
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-teal-500/20 p-2 rounded-full hover:bg-teal-500/30 transition-colors"
                        >
                          <Github size={24} className="text-white" />
                        </a>
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
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-teal-400/70 hover:text-teal-300">
                      <Github size={16} />
                    </a>
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
        <nav className="fixed top-0 left-0 right-0 p-6 flex justify-center gap-4 bg-slate-900/50 backdrop-blur-md border-b border-white/5">
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