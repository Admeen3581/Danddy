import React from 'react';
import './Stat.css';

const Stat = ({ label, value }: { label: string; value: any }) => {
  return (
    <div className="stat">
      <span className="stat-label">{label}:</span>
      <span className="stat-value">{value}</span>
    </div>
  );
};

export default Stat;
