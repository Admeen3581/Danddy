import React from "react";
import "./NavBar.css"; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">DANDDY</div>
      <div className="nav-links">
        <a href="/">Link1</a>
        <a href="/">Link2</a>
        <a href="/">Link3</a>
        <a href="/">Link4</a>
      </div>
    </nav>
  );
};

export default NavBar;
