import React from 'react';
import './Hero.css';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Danddy</h1>
        <p>Stuff here</p>
        <Link href="/dmhome" className="hero-button">
            DM Start
          </Link>
          <Link href="/dmhome" className="hero-button">
            Player Start
          </Link>
      </div>
    </div>
  );
};

export default Hero;