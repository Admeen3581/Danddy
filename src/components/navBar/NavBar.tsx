import React from "react";
import "./NavBar.css"; 
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo"><a href='/'>DANDDY</a></div>
      <div className="nav-links">
        <Link href="/contact">Contact Us</Link>
      </div>
    </nav>
  );
};

export default NavBar;
