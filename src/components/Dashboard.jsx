import { useState, useEffect } from 'react'
import { Calendar, Users, UserCheck, Cake, FileText, TrendingUp, GraduationCap, UserCog } from 'lucide-react'
import Modal from './Modal'
import './Dashboard.css'
import StatsCard from './StatsCard'

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalStaff: 0,
    presentToday: 0,
    attendanceRate: 0,
    classSummary: []
  })
  const [loading, setLoading] = useState(true)
  const [strengthModal, setStrengthModal] = useState(false)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      const userStr = localStorage.getItem('user')
      if (!userStr) return
      
      const user = JSON.parse(userStr)
      const token = user.token

      // Fetch student summary
      const studentResponse = await fetch('http://127.0.0.1:8000/api/admin/students/summary', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      // Fetch staff count
      const staffResponse = await fetch('http://127.0.0.1:8000/api/admin/staff/get_staff', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      let totalStaff = 0
      if (staffResponse.ok) {
        const staffData = await staffResponse.json()
        const staffList = Array.isArray(staffData) ? staffData : (staffData.data || [])
        totalStaff = staffList.length
      }

      if (studentResponse.ok) {
        const data = await studentResponse.json()
        console.log('Student Summary:', data)
        
        // Handle the actual API response format
        let classSummary = []
        
        if (Array.isArray(data)) {
          classSummary = data
        } else if (data.data && data.data.by_class_and_section && Array.isArray(data.data.by_class_and_section)) {
          classSummary = data.data.by_class_and_section
        } else if (data.by_class_and_section && Array.isArray(data.by_class_and_section)) {
          classSummary = data.by_class_and_section
        } else if (data.data && Array.isArray(data.data)) {
          classSummary = data.data
        } else if (data.class_summary && Array.isArray(data.class_summary)) {
          classSummary = data.class_summary
        } else if (data.classSummary && Array.isArray(data.classSummary)) {
          classSummary = data.classSummary
        }
        
        // Calculate totals from the class summary or use API provided totals
        const totalStudents = data.data?.total_students || 
                             classSummary.reduce((sum, item) => sum + (item.total_students || item.total || 0), 0)
        const totalBoys = data.data?.gender_wise?.male || 
                         classSummary.reduce((sum, item) => sum + (item.male || item.boys || 0), 0)
        const totalGirls = data.data?.gender_wise?.female || 
                          classSummary.reduce((sum, item) => sum + (item.female || item.girls || 0), 0)
        
        setSummary({
          totalStudents,
          totalStaff,
          presentToday: data.present_today || data.presentToday || 0,
          attendanceRate: data.attendance_rate || data.attendanceRate || 0,
          classSummary
        })
      }
    } catch (err) {
      console.error('Error fetching summary:', err)
    } finally {
      setLoading(false)
    }
  }
  const todayBirthdays = [
    { name: 'SAIBA CHERJI', class: 'II - C' },
    { name: 'KRISHN AGRAWAL', class: 'II - C' },
    { name: 'ARPAN AGARWAL', class: 'II - C' },
  ]

  const leaveRequests = [
    { type: 'Leave Request', count: 3, status: 'pending' },
  ]

  const attendanceClasses = [
    'NURSERY-C', 'NURSERY-B', 'NURSERY-A', 'KG-II', 'KG-I', 'KG-C', 'I-H', 'I-A', 'I-C', 'I-I',
    'II-H', 'III-A', 'IV-H', 'IV-A', 'IV-C', 'V-A', 'V-C', 'VI-H', 'VII-A', 'VIII-C'
  ]

  const hwClasses = [
    'XII-A', 'XII-B', 'XII-C', 'XI-COMM-I', 'XI-COMM-C', 'XII-HUMANITIES-A', 'XII-COMM-I', 'XII-COMM-C'
  ]

  return (
    <main className="dashboard">
      {/* Stats Overview */}
      <div className="stats-grid">
        <div onClick={() => setStrengthModal(true)} style={{ cursor: 'pointer' }}>
          <StatsCard 
            icon={GraduationCap}
            title="Total Students"
            value={loading ? '...' : summary.totalStudents.toLocaleString()}
            color="#667eea"
            trend={5.2}
          />
        </div>
        <StatsCard 
          icon={UserCog}
          title="Total Staff"
          value={loading ? '...' : summary.totalStaff.toString()}
          color="#48bb78"
          trend={2.1}
        />
        <StatsCard 
          icon={UserCheck}
          title="Present Today"
          value={loading ? '...' : summary.presentToday.toLocaleString()}
          color="#f6ad55"
          trend={1.5}
        />
        <StatsCard 
          icon={Users}
          title="Attendance Rate"
          value={loading ? '...' : `${summary.attendanceRate}%`}
          color="#fc8181"
          trend={0.8}
        />
      </div>

      {/* Student Strength Modal */}
      <Modal isOpen={strengthModal} onClose={() => setStrengthModal(false)} title="Class-wise Student Strength">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="spinner" style={{ width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            <p style={{ marginTop: '20px', color: '#667eea' }}>Loading...</p>
          </div>
        ) : summary.classSummary && summary.classSummary.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Total Students</th>
                  <th>Boys</th>
                  <th>Girls</th>
                </tr>
              </thead>
              <tbody>
                {summary.classSummary.map((item, index) => (
                  <tr key={index}>
                    <td><span className="badge badge-primary">{item.class_name || item.class}</span></td>
                    <td><span className="badge badge-info">{item.section_name || item.section}</span></td>
                    <td><strong>{item.total_students || item.total}</strong></td>
                    <td>{item.male || item.boys || 0}</td>
                    <td>{item.female || item.girls || 0}</td>
                  </tr>
                ))}
                <tr style={{ background: '#f7fafc', fontWeight: 'bold' }}>
                  <td colSpan="2">Total</td>
                  <td><strong>{summary.totalStudents}</strong></td>
                  <td>{summary.classSummary.reduce((sum, item) => sum + (item.male || item.boys || 0), 0)}</td>
                  <td>{summary.classSummary.reduce((sum, item) => sum + (item.female || item.girls || 0), 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>No data available</p>
        )}
      </Modal>

      {/* Class-wise Student Strength - Removed from main view, now in modal */}

      <div className="dashboard-grid">
        {/* Leave Requests Card */}
        <div className="card leave-card">
          <div className="card-header">
            <h3>Today's Leave Request</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="leave-content">
            <div className="leave-item">
              <FileText size={24} color="#667eea" />
              <span>Leave Request</span>
              <span className="count">3</span>
            </div>
          </div>
        </div>

        {/* Absent Staff Card */}
        <div className="card absent-card">
          <div className="card-header">
            <h3>Absent Staff</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="absent-content">
            <Users size={48} color="#cbd5e0" />
            <p>No absent staff today</p>
          </div>
        </div>

        {/* Birthday Card */}
        <div className="card birthday-card">
          <div className="card-header">
            <h3>Today's Birthday</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="birthday-list">
            {todayBirthdays.map((person, index) => (
              <div key={index} className="birthday-item">
                <Cake size={24} color="#f56565" />
                <div className="birthday-info">
                  <p className="name">{person.name}</p>
                  <p className="class">{person.class}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Birthday Card */}
        <div className="card staff-birthday-card">
          <div className="card-header">
            <h3>Today's Staff Birthday</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="staff-birthday-content">
            <Cake size={48} color="#cbd5e0" />
            <p>No staff birthdays today</p>
          </div>
        </div>

        {/* Absent/Leave Students Card */}
        <div className="card students-card">
          <div className="card-header">
            <h3>Absent/Leave Student's</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="students-content">
            <UserCheck size={48} color="#cbd5e0" />
            <p>All students present</p>
          </div>
        </div>

        {/* Class Attendance Status */}
        <div className="card attendance-card">
          <div className="card-header">
            <h3>Today's Class Attendance Status</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="class-grid-simple">
            {attendanceClasses.map((className, index) => (
              <div key={index} className="class-badge-simple">
                {className}
              </div>
            ))}
          </div>
        </div>

        {/* Class HW Status */}
        <div className="card hw-card">
          <div className="card-header">
            <h3>Today's Class HW Status</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="class-grid-simple">
            {hwClasses.map((className, index) => (
              <div key={index} className="class-badge-simple">
                {className}
              </div>
            ))}
          </div>
        </div>

        {/* Messages Card */}
        <div className="card messages-card">
          <div className="card-header">
            <h3>Today's & Yesterday's Messages</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="messages-content">
            <div className="message-item">
              <div className="message-icon">📧</div>
              <div className="message-info">
                <p className="message-title">TESTING</p>
                <p className="message-subtitle">Class: NURSERY</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Card */}
        <div className="card notice-card">
          <div className="card-header">
            <h3>Student's Notice and Circular</h3>
            <span className="view-all">View All</span>
          </div>
          <div className="notice-content">
            <div className="notice-item">
              <div className="notice-icon">📢</div>
              <div className="notice-info">
                <p className="notice-title">TESTING</p>
                <p className="notice-subtitle">Class: NURSERY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
