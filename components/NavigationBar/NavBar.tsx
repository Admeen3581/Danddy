import React from "react";
import "./NavBar.css"; 
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo"><a href='/'>DANDDY</a></div>
      <div className="nav-links">
        <a href="/">Link1</a>
        <a href="/">Link2</a>
        <a href="/">Link3</a>
        <Link href="/signup"> {}
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
