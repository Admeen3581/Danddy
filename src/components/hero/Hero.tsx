import React, { ChangeEvent, useRef, useState } from 'react';
import './Hero.css';
import Link from 'next/link';
import useLocalStore from '@/utils/store';

const Hero = () => {
  const { roomId, setRoomId } = useLocalStore();
  const entryBoxRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setRoomId(value);


    if (value.match(/^[a-zA-Z0-9]{6}$/)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    // Reset error message visibility when typing
    setShowErrorMessage(false);
  };

  const handleJoinClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isValid) {
      event.preventDefault(); // Prevent navigation if the room code is invalid
      setShowErrorMessage(true); // Show the error message
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>DANDDY</h1>
        <p>Welcome to Danddy!</p>

        <input
          type="text"
          ref={entryBoxRef}
          onChange={handleInputChange}
          placeholder="Enter your room code..."
          className="hero-input"
        />
        {showErrorMessage && <p className="error-message">Invalid room code.</p>}

        <Link
          href={isValid ? "/playerhome" : "#"}
          className={`hero-button ${!isValid ? 'disabled' : ''}`}
          onClick={handleJoinClick}
        >
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
