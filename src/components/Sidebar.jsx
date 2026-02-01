import { LayoutDashboard, Users, GraduationCap, Calendar, FileText, BookOpen, DollarSign, Settings, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import './Sidebar.css'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [openDropdown, setOpenDropdown] = useState(null)

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { 
      id: 'students', 
      icon: GraduationCap, 
      label: 'Students',
      submenu: [
        { id: 'all-students', label: 'All Students' },
        { id: 'student-admission', label: 'Student Admission' },
        { id: 'all-admissions', label: 'All Admissions' },
        { id: 'add-student', label: 'Add Student' },
        { id: 'student-strength', label: 'Student Strength' },
        { id: 'student-promotion', label: 'Student Promotion' },
        { id: 'student-details', label: 'Student Details' },
      ]
    },
    { 
      id: 'staff', 
      icon: Users, 
      label: 'Staff',
      submenu: [
        { id: 'all-staff', label: 'All Staff' },
        { id: 'add-staff', label: 'Add Staff' },
        { id: 'designations', label: 'Designations' },
        { id: 'departments', label: 'Departments' },
        { id: 'staff-attendance', label: 'Staff Attendance' },
        { id: 'staff-salary', label: 'Staff Salary' },
      ]
    },
    { 
      id: 'attendance', 
      icon: Calendar, 
      label: 'Attendance',
      submenu: [
        { id: 'mark-attendance', label: 'Mark Attendance' },
        { id: 'attendance-report', label: 'Attendance Report' },
        { id: 'leave-requests', label: 'Leave Requests' },
      ]
    },
    { 
      id: 'academic', 
      icon: BookOpen, 
      label: 'Academic',
      submenu: [
        { id: 'classes', label: 'Classes' },
        { id: 'sections', label: 'Sections' },
        { id: 'subjects', label: 'Subjects' },
        { id: 'syllabus', label: 'Syllabus' },
        { id: 'assignments', label: 'Assignments' },
      ]
    },
    { 
      id: 'examination', 
      icon: FileText, 
      label: 'Examination',
      submenu: [
        { id: 'exam-schedule', label: 'Exam Schedule' },
        { id: 'exam-results', label: 'Exam Results' },
        { id: 'grade-system', label: 'Grade System' },
        { id: 'report-cards', label: 'Report Cards' },
      ]
    },
    { 
      id: 'library', 
      icon: BookOpen, 
      label: 'Library',
      submenu: [
        { id: 'all-books', label: 'All Books' },
        { id: 'add-book', label: 'Add Book' },
        { id: 'issue-book', label: 'Issue Book' },
        { id: 'return-book', label: 'Return Book' },
      ]
    },
    { 
      id: 'fees', 
      icon: DollarSign, 
      label: 'Fees',
      submenu: [
        { id: 'collect-fees', label: 'Collect Fees' },
        { id: 'fees-report', label: 'Fees Report' },
        { id: 'pending-fees', label: 'Pending Fees' },
        { id: 'fee-structure', label: 'Fee Structure' },
      ]
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings',
      submenu: [
        { id: 'school-settings', label: 'School Settings' },
        { id: 'user-management', label: 'User Management' },
        { id: 'backup', label: 'Backup & Restore' },
      ]
    },
  ]

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  const handleMenuClick = (item) => {
    if (item.submenu) {
      toggleDropdown(item.id)
    } else {
      setActiveTab(item.id)
      setOpenDropdown(null)
    }
  }

  const handleSubmenuClick = (parentId, submenuId) => {
    setActiveTab(submenuId)
    setOpenDropdown(null)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="menu-item-wrapper">
              <button
                className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {item.submenu && <ChevronDown size={16} className={`dropdown-icon ${openDropdown === item.id ? 'open' : ''}`} />}
              </button>
              
              {item.submenu && openDropdown === item.id && (
                <div className="submenu">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.id}
                      className={`submenu-item ${activeTab === subitem.id ? 'active' : ''}`}
                      onClick={() => handleSubmenuClick(item.id, subitem.id)}
                    >
                      {subitem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar
