import React from 'react';
import CSHeader from '../../../CharSheetsCompon/CSHeader/csheader';
import CSButtons from '../../../CharSheetsCompon/CSButtons/csbuttons';
import CSStats from '../../../CharSheetsCompon/CSStats/csstats';
import CSNotes from '../../../CharSheetsCompon/CSNotes/csnotes';
import './styles.css'; 

const CharHome = () => {
  return (
    <>
    <div className="container">
      <CSHeader />
      </div>
      
    <div className="stats-container">
      <CSButtons/>
      <CSStats />
      <CSNotes/>
    </div>
    </>
  );
};

export default CharHome;
