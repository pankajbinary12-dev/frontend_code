import { useState } from 'react'
import '../Students/Students.css'

const AttendanceReport = () => {
  const [report] = useState([
    { id: 1, rollNo: '001', name: 'Rahul Kumar', class: 'X-A', totalDays: 20, present: 18, absent: 2, percentage: 90 },
    { id: 2, rollNo: '002', name: 'Priya Sharma', class: 'X-A', totalDays: 20, present: 20, absent: 0, percentage: 100 },
    { id: 3, rollNo: '003', name: 'Amit Singh', class: 'X-B', totalDays: 20, present: 15, absent: 5, percentage: 75 },
  ])

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Attendance Report</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>Select Class</option>
            <option>X-A</option>
            <option>X-B</option>
          </select>
          <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>January 2026</option>
            <option>December 2025</option>
          </select>
          <button className="btn-primary">Generate Report</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Total Days</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {report.map((student) => (
              <tr key={student.id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td><span className="badge badge-primary">{student.class}</span></td>
                <td>{student.totalDays}</td>
                <td><span className="badge badge-success">{student.present}</span></td>
                <td><span className="badge badge-danger">{student.absent}</span></td>
                <td>
                  <span className={`badge ${student.percentage >= 75 ? 'badge-success' : 'badge-warning'}`}>
                    {student.percentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendanceReport
