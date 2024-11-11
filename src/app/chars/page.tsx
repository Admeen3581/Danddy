import React from 'react';
import CSHeader from '../../../components/CharSheetsComponents/CSHeader/csheader';
import CSButtons from '../../../components/CharSheetsComponents/CSButtons/csbuttons';
import CSStats from '../../../components/CharSheetsComponents/CSStats/csstats';
import CSNotes from '../../../components/CharSheetsComponents/CSNotes/csnotes';
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
