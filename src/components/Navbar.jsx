import { Bell, MessageSquare, User, LogOut } from 'lucide-react'
import './Navbar.css'

const Navbar = ({ user, onLogout }) => {
  const schoolName = user?.schoolName || 'School Name'
  const userName = user?.name || user?.username || 'Admin'
  const schoolLogo = user?.schoolLogo

  console.log('Navbar - User data:', user)
  console.log('Navbar - School Name:', schoolName)
  console.log('Navbar - User Name:', userName)

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          {schoolLogo ? (
            <img src={schoolLogo} alt="School Logo" className="logo-icon-img" />
          ) : (
            <div className="logo-icon">{schoolName.charAt(0).toUpperCase()}</div>
          )}
          <div className="logo-text">
            <h2>{schoolName}</h2>
            <p>Management System</p>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        <button className="icon-btn">
          <MessageSquare size={20} />
          <span className="badge">5</span>
        </button>
        <div className="user-profile">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=667eea&color=fff`} alt="User" />
          <span>{userName}</span>
        </div>
        <button className="logout-btn" onClick={onLogout} title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
