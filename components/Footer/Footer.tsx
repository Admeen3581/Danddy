import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerLeft">
          <h4>Danddy</h4>
          <p>Stuff here</p>
        </div>
        <div className="footerRight">
          <p>&copy; {new Date().getFullYear()} Danddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

