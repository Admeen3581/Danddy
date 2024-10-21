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
         We aim to enhance the overall experience of Dungeons & Dragons campaigns, 
         ensuring that DMs and players can focus more on the story and less on the logistics.
         By improving the flow of combat and gameplay, we help players and DMs stay connected and engaged.
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <p>
            Device Connectivity: Players and DMs can connect to each other to keep the game updated, particularly for combat updates.<br />
            DM Interface: DMs can access a list of players, character sheets, and take notes.<br />
            Player Interface: Players have their own character sheets and can toggle the dice roller or update their status in real time.
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
