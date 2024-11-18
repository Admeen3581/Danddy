import React, { ChangeEvent, useRef } from 'react';
import './Hero.css';
import Link from 'next/link';
import useLocalStore from '@/utils/store';

const Hero = () => {

  const {roomId, setRoomId} = useLocalStore()
  const entryBoxRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };


  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>DANDDY</h1>
        <p></p>

        <input
          type="text"
          ref={entryBoxRef}
          onChange={handleInputChange}
          placeholder="Enter your room code..."
          className="hero-input"
        />

        <Link href="/playerhome" className="hero-button">
            Join
        </Link>
        <Link href="/dmhome" className="hero-button">
            Create
          </Link>
      </div>
    </div>
  );
};

export default Hero;