import React from 'react';
import './charsheets.css';

const TestChar = () => {
  return (
    <div className="charsheets-section">
       <div className="headerBox">
          <h1>Character Sheets</h1>
       </div>
       <div className="ButtonsBox">
          <h1>Characters:</h1>
          <button className='button'>Character 1</button>
          <button className='button'>Character 2</button>
          <button className='button'>Character 3</button>
       </div>
    </div>
  );
};

export default TestChar;