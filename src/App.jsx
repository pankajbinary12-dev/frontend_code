import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { AlertContainer } from './components/CustomAlert'

// Students Modules
import AllStudents from './modules/Students/AllStudents'
import AddStudent from './modules/Students/AddStudent'
import StudentAdmission from './modules/Students/StudentAdmission'
import AllAdmissions from './modules/Students/AllAdmissions'
import EditAdmission from './modules/Students/EditAdmission'
import StudentStrength from './modules/Students/StudentStrength'
import StudentPromotion from './modules/Students/StudentPromotion'
import StudentDetails from './modules/Students/StudentDetails'

// Staff Modules
import AllStaff from './modules/Staff/AllStaff'
import AddStaff from './modules/Staff/AddStaff'
import StaffAttendance from './modules/Staff/StaffAttendance'
import StaffSalary from './modules/Staff/StaffSalary'

// Attendance Modules
import MarkAttendance from './modules/Attendance/MarkAttendance'
import AttendanceReport from './modules/Attendance/AttendanceReport'
import LeaveRequests from './modules/Attendance/LeaveRequests'

// Academic Modules
import Classes from './modules/Academic/Classes'
import Sections from './modules/Academic/Sections'
import Subjects from './modules/Academic/Subjects'
import Syllabus from './modules/Academic/Syllabus'
import Assignments from './modules/Academic/Assignments'

// Library Modules
import AllBooks from './modules/Library/AllBooks'
import AddBook from './modules/Library/AddBook'
import IssueBook from './modules/Library/IssueBook'
import ReturnBook from './modules/Library/ReturnBook'

// Fees Modules
import CollectFees from './modules/Fees/CollectFees'
import FeesReport from './modules/Fees/FeesReport'
import PendingFees from './modules/Fees/PendingFees'

// Examination Modules
import ExamSchedule from './modules/Examination/ExamSchedule'
import ExamResults from './modules/Examination/ExamResults'
import GradeSystem from './modules/Examination/GradeSystem'
import ReportCards from './modules/Examination/ReportCards'

// Settings Modules
import Designations from './modules/Settings/Designations'
import Departments from './modules/Settings/Departments'

function App() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [editAdmissionId, setEditAdmissionId] = useState(null)

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    // Also save token separately for easier access
    localStorage.setItem('token', userData.token)
    localStorage.setItem('schoolName', userData.schoolName)
    localStorage.setItem('userName', userData.name)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('schoolName')
    localStorage.removeItem('userName')
    setActiveTab('dashboard')
  }

  // If not logged in, show login page
  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard />
      
      // Students
      case 'all-students':
        return <AllStudents onAddClick={() => setActiveTab('add-student')} />
      case 'add-student':
        return <AddStudent />
      case 'student-admission':
        return <StudentAdmission />
      case 'all-admissions':
        return <AllAdmissions 
          onAddClick={() => setActiveTab('student-admission')}
          onEditClick={(id) => {
            setEditAdmissionId(id)
            setActiveTab('edit-admission')
          }}
        />
      case 'edit-admission':
        return <EditAdmission 
          admissionId={editAdmissionId}
          onBack={() => {
            setEditAdmissionId(null)
            setActiveTab('all-admissions')
          }}
        />
      case 'student-strength':
        return <StudentStrength />
      case 'student-promotion':
        return <StudentPromotion />
      case 'student-details':
        return <StudentDetails />
      
      // Staff
      case 'all-staff':
        return <AllStaff onAddClick={() => setActiveTab('add-staff')} />
      case 'add-staff':
        return <AddStaff />
      case 'staff-attendance':
        return <StaffAttendance />
      case 'staff-salary':
        return <StaffSalary />
      
      // Attendance
      case 'mark-attendance':
        return <MarkAttendance />
      case 'attendance-report':
        return <AttendanceReport />
      case 'leave-requests':
        return <LeaveRequests />
      
      // Academic
      case 'classes':
        return <Classes />
      case 'sections':
        return <Sections />
      case 'subjects':
        return <Subjects />
      case 'syllabus':
        return <Syllabus />
      case 'assignments':
        return <Assignments />
      
      // Library
      case 'all-books':
        return <AllBooks />
      case 'add-book':
        return <AddBook />
      case 'issue-book':
        return <IssueBook />
      case 'return-book':
        return <ReturnBook />
      
      // Fees
      case 'collect-fees':
        return <CollectFees />
      case 'fees-report':
        return <FeesReport />
      case 'pending-fees':
        return <PendingFees />
      
      // Examination
      case 'exam-schedule':
        return <ExamSchedule />
      case 'exam-results':
        return <ExamResults />
      case 'grade-system':
        return <GradeSystem />
      case 'report-cards':
        return <ReportCards />
      
      // Settings
      case 'designations':
        return <Designations />
      case 'departments':
        return <Departments />
      
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <AlertContainer />
      <Navbar user={user} onLogout={handleLogout} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content-wrapper">
        {renderContent()}
      </div>
    </div>
  )
}

export default App
