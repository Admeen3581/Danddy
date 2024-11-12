import React from 'react';
import CSHeader from '../../components/charSheets/CSHeader/csheader';
import CSButtons from '../../components/charSheets/CSButtons/csbuttons';
import CSStats from '../../components/charSheets/CSStats/csstats';
import CSNotes from '../../components/charSheets/CSNotes/csnotes';
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
