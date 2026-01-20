import React from 'react';
import './Dashboard.css';

const Dashboard = ({ currentPage }) => {
  const birthdayData = [
    { name: 'KAIRA CHUGH', class: 'III-G' },
    { name: 'HRIDHAY AGRAWAL', class: 'III-G' },
    { name: 'ARPAN AGGARWAL', class: 'III-G' }
  ];

  const attendanceClasses = [
    'NURSERY-C', 'NURSERY-B', 'NURSERY-A', 'KG-III', 'KG-A', 'KG-C', 'I-N', 'I-A', 'I-C', 'I-A', 'I-K',
    'III-D', 'III-A', 'IV-B', 'IV-A', 'IV-C', 'V-A', 'V-II', 'V-C', 'VII-B', 'VII-A', 'VIII-C',
    'VIII-B', 'VIII-A', 'IX-B', 'IX-C', 'IX-A', 'X-C', 'X-A', 'X-COMM-B', 'XI-HUMANITIES-A', 'XI-SCI-C',
    'XI-COMM-B', 'XII-COMM-C-C', 'XII-HUMANITIES-A', 'XII-SCI-C'
  ];

  const hwClasses = [
    'NURSERY-C', 'NURSERY-B', 'NURSERY-A', 'KG-III', 'KG-A', 'KG-C', 'I-N', 'I-A', 'I-C', 'I-A', 'I-K',
    'III-D', 'III-A', 'IV-B', 'IV-A', 'IV-C', 'V-A', 'V-II', 'V-C', 'VII-B', 'VII-A', 'VIII-C'
  ];

  const renderContent = () => {
    if (currentPage.menu === 'Dashboard' || !currentPage.submenu) {
      return (
        <>
          <div className="dashboard-row">
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Today's Leave Request</h3>
                <span className="view-all-badge">View All</span>
              </div>
              <div className="empty-content">No leave requests</div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3>Today's Birthday</h3>
                <span className="view-all-badge">View All</span>
              </div>
              <div className="birthday-list">
                {birthdayData.map((person, index) => (
                  <div key={index} className="birthday-item">
                    <div className="birthday-info">
                      <div className="birthday-name">{person.name}</div>
                      <div className="birthday-class">{person.class}</div>
                    </div>
                    <div className="birthday-cake">🎂</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3>Today's Staff Birthday</h3>
                <span className="view-all-badge">View All</span>
              </div>
              <div className="empty-content">No staff birthdays</div>
            </div>
          </div>

          <div className="dashboard-row">
            <div className="dashboard-card large">
              <div className="card-header">
                <h3>Today's Class Attendance Status</h3>
                <span className="view-all-badge">View All</span>
              </div>
              <div className="class-grid">
                {attendanceClasses.map((className, index) => (
                  <div key={index} className="class-badge">{className}</div>
                ))}
              </div>
            </div>

            <div className="dashboard-card large">
              <div className="card-header">
                <h3>Today's Class HW Status</h3>
                <span className="view-all-badge">View All</span>
              </div>
              <div className="class-grid">
                {hwClasses.map((className, index) => (
                  <div key={index} className="class-badge">{className}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-row">
            <div className="dashboard-card wide">
              <div className="card-header">
                <h3>📧 Today's & Yesterday's Messages</h3>
                <button className="print-btn">🖨️</button>
              </div>
              <div className="empty-content">No messages</div>
            </div>

            <div className="dashboard-card wide">
              <div className="card-header">
                <h3>📋 Student's Notice and Circular</h3>
                <span className="view-all-badge">View All</span>
              </div>
              <div className="notice-content">
                <div className="notice-item">
                  <span className="notice-title">TESTING</span>
                  <span className="notice-subtitle">[Class: NURSERY]</span>
                </div>
                <div className="notice-footer">
                  <span>SAS CREATED</span>
                  <span>#0298</span>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="page-content">
        <div className="page-header">
          <h1>{currentPage.menu}</h1>
          <h2>{currentPage.submenu}</h2>
        </div>
        <div className="page-body">
          <div className="content-card">
            <p>This is the <strong>{currentPage.submenu}</strong> page under <strong>{currentPage.menu}</strong> section.</p>
            <p>Content for this page will be implemented here.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="dashboard">
      {renderContent()}
    </main>
  );
};

export default Dashboard;
