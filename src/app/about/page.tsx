import React from 'react';
import './about.css';

export default function About(){
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to Danddy! Our mission is to improve the quality of life for Dungeon Masters (DMs) and players by making gameflow smoother and saving valuable time. 
      </p>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
            stuff here
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <p>
            stuff here
        </p>
      </section>

      <section className="team">
        <h2>Meet the Team</h2>
        <li>Adam Long</li>
        <li>Olivia Laurel</li>
        <li>Roman Merlick</li>
        <li>Joshua Mason</li>
        <li>Lorenz De Robles</li>
      </section>

    </div>
  );
};
