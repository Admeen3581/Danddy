import React from 'react';
import CSHeader from '../../../CharSheetsCompon/CSHeader/csheader';
import CSButtons from '../../../CharSheetsCompon/CSButtons/csbuttons';
import CSStats from '../../../CharSheetsCompon/CSStats/csstats';

const CharHome = () => {
  return (
    <div className="container">
      <CSHeader />
      <CSButtons />
      <CSStats />
    </div>
  );
};

export default CharHome;
