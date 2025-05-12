import React, { useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';


const tabs = ['About', 'Projects', 'Experience'];

const App = () => {
  const [activeTab, setActiveTab] = useState('About');

  const renderContent = () => {
    switch (activeTab) {
      case 'About':
        return <About />;
      case 'Projects':
        return <Projects />;
      case 'Experience':
        return <Experience />;
      default:
        return <About />;
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="text-2xl font-bold text-purple-300">MyPortfolio</h1>
        <div className="flex space-x-6">
          {tabs.map(tab => (
            <div
              key={tab}
              className={`nav-link ${activeTab === tab ? 'text-purple-400 font-semibold' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </nav>

      <main className="pt-32 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

const About = () => (
  <section>
    <h2 className="text-4xl font-bold mb-4 text-purple-300">About Me</h2>
    <p className="text-lg leading-relaxed max-w-2xl mx-auto">
      Hi! I'm a passionate developer with a love for tech and design. I work on building beautiful,
      functional web apps that make a difference. When I'm not coding, I enjoy hiking and exploring the unknown.
    </p>
  </section>
);

const Projects = () => (
  <section>
    <h2 className="text-4xl font-bold mb-8 text-purple-300">Projects</h2>
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
      <div className="tab">
        <h3 className="text-2xl font-semibold mb-2">Project One</h3>
        <p>A full-stack social media app built with React, Node.js, and MongoDB.</p>
      </div>
      <div className="tab">
        <h3 className="text-2xl font-semibold mb-2">Project Two</h3>
        <p>Algorithmic trading bot using Python and financial indicators to automate strategies.</p>
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section>
    <h2 className="text-4xl font-bold mb-8 text-purple-300">Work Experience</h2>
    <div className="space-y-6">
      <div className="tab">
        <h3 className="text-2xl font-semibold mb-2">Software Engineering Intern @ AdhereHealth</h3>
        <p>Built scalable data pipelines using AWS Glue and wrote over 300+ data quality SQL rules.</p>
      </div>
      <div className="tab">
        <h3 className="text-2xl font-semibold mb-2">Quant Analyst @ Quant Club</h3>
        <p>Backtested trading strategies, ran regressions, and presented insights on risk-adjusted returns.</p>
      </div>
    </div>
  </section>
);

export default App;
