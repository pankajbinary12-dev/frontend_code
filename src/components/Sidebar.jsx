import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <div className="card-header">
          <h3>Absent Staff</h3>
          <span className="view-all-badge">View All</span>
        </div>
        <div className="empty-state">No data available</div>
      </div>

      <div className="sidebar-card">
        <div className="card-header">
          <h3>Absent/Leave Student's</h3>
          <span className="view-all-badge">View All</span>
        </div>
        <div className="empty-state">No data available</div>
      </div>
    </aside>
  );
};

export default Sidebar;
