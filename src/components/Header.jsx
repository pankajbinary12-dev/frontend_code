import { useState } from 'react';
import './Header.css';

const Header = ({ currentPage, setCurrentPage }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    {
      name: 'Student',
      icon: '👨‍🎓',
      hasDropdown: true,
      submenu: ['Student List', 'Add New Student', 'Student Promotion', 'Student Attendance', 'Student Report']
    },
    {
      name: 'Staff',
      icon: '👥',
      hasDropdown: true,
      submenu: ['Staff List', 'Add New Staff', 'Staff Attendance', 'Staff Salary', 'Staff Leave']
    },
    {
      name: 'Attendance',
      icon: '📋',
      hasDropdown: true,
      submenu: ['Mark Attendance', 'Attendance Report', 'Absent Students', 'Leave Requests']
    },
    {
      name: 'Academic',
      icon: '🎓',
      hasDropdown: true,
      submenu: ['Class Management', 'Subject Management', 'Syllabus', 'Assignments', 'Exam Schedule']
    },
    {
      name: 'Timetable',
      icon: '📅',
      hasDropdown: true,
      submenu: ['Create Timetable', 'View Timetable', 'Class Routine', 'Teacher Schedule']
    },
    {
      name: 'Report Card',
      icon: '📊',
      hasDropdown: true,
      submenu: ['Generate Report', 'View Reports', 'Grade Management', 'Result Analysis']
    },
    {
      name: 'Library',
      icon: '📚',
      hasDropdown: true,
      submenu: ['Book List', 'Add New Book', 'Issue Book', 'Return Book', 'Library Members']
    },
    {
      name: 'HW',
      icon: '📝',
      hasDropdown: true,
      submenu: ['Assign Homework', 'View Homework', 'Homework Status', 'Submission Report']
    },
    {
      name: 'Message',
      icon: '💬',
      hasDropdown: true,
      submenu: ['Send Message', 'Inbox', 'Sent Messages', 'Compose Notice']
    },
    {
      name: 'Chat Report',
      icon: '📈',
      hasDropdown: true,
      submenu: ['Chat Analytics', 'Message History', 'User Activity', 'Reports']
    }
  ];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleSubmenuClick = (menuName, subItem) => {
    setCurrentPage({ menu: menuName, submenu: subItem });
    setOpenDropdown(null);
  };

  const isActiveMenu = (menuName) => {
    return currentPage.menu === menuName;
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">🏫</span>
          <span className="logo-text">Accretion</span>
        </div>
      </div>
      
      <nav className="header-nav">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`nav-item ${isActiveMenu(item.name) ? 'active' : ''}`}
            onClick={() => item.hasDropdown && toggleDropdown(index)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
            {item.hasDropdown && <span className="dropdown-arrow">▼</span>}
            {item.hasDropdown && item.submenu && openDropdown === index && (
              <div className="dropdown-menu open">
                {item.submenu.map((subItem, subIndex) => (
                  <div 
                    key={subIndex} 
                    className="dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmenuClick(item.name, subItem);
                    }}
                  >
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="header-right">
        <button className="data-campaign-btn">Data Campaign</button>
        <div className="user-avatar">
          <img src="https://via.placeholder.com/40" alt="User" />
        </div>
      </div>
    </header>
  );
};

export default Header;
