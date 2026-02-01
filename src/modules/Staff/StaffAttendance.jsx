import { useState } from 'react'
import '../Students/Students.css'

const StaffAttendance = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Dr. Rajesh Kumar', department: 'Mathematics', status: 'present' },
    { id: 2, name: 'Mrs. Sunita Sharma', department: 'English', status: 'present' },
    { id: 3, name: 'Mr. Amit Verma', department: 'Science', status: 'absent' },
  ])

  const handleMarkAttendance = (id, status) => {
    setStaff(staff.map(s => s.id === id ? { ...s, status } : s))
  }

  const handleSave = () => {
    alert('Attendance saved successfully!')
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Staff Attendance</h2>
        <input type="date" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.department}</td>
                <td>
                  <span className={`badge ${member.status === 'present' ? 'badge-success' : 'badge-danger'}`}>
                    {member.status === 'present' ? 'Present' : 'Absent'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-action" 
                      style={{ background: member.status === 'present' ? '#48bb78' : '#f7fafc', color: member.status === 'present' ? 'white' : '#48bb78' }}
                      onClick={() => handleMarkAttendance(member.id, 'present')}
                    >
                      Present
                    </button>
                    <button 
                      className="btn-action"
                      style={{ background: member.status === 'absent' ? '#f56565' : '#f7fafc', color: member.status === 'absent' ? 'white' : '#f56565' }}
                      onClick={() => handleMarkAttendance(member.id, 'absent')}
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button className="btn-primary" onClick={handleSave}>Save Attendance</button>
      </div>
    </div>
  )
}

export default StaffAttendance
