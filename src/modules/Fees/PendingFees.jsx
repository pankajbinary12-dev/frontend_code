import { useState } from 'react'
import { Send } from 'lucide-react'
import '../Students/Students.css'

const PendingFees = () => {
  const [pendingFees] = useState([
    { id: 1, rollNo: '001', name: 'Rahul Kumar', class: 'X-A', totalFees: 5000, paid: 3000, pending: 2000, dueDate: '2026-02-01' },
    { id: 2, rollNo: '003', name: 'Amit Singh', class: 'X-B', totalFees: 5000, paid: 0, pending: 5000, dueDate: '2026-01-15' },
    { id: 3, rollNo: '005', name: 'Neha Gupta', class: 'IX-A', totalFees: 4500, paid: 2000, pending: 2500, dueDate: '2026-02-05' },
  ])

  const handleSendReminder = (id) => {
    alert('Reminder sent successfully!')
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Pending Fees</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>All Classes</option>
            <option>X-A</option>
            <option>X-B</option>
          </select>
          <button className="btn-primary">Send All Reminders</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Total Fees</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingFees.map((student) => (
              <tr key={student.id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td><span className="badge badge-primary">{student.class}</span></td>
                <td>₹{student.totalFees.toLocaleString()}</td>
                <td><span className="badge badge-success">₹{student.paid.toLocaleString()}</span></td>
                <td><span className="badge badge-danger">₹{student.pending.toLocaleString()}</span></td>
                <td>{student.dueDate}</td>
                <td>
                  <button 
                    className="btn-icon" 
                    style={{ color: '#667eea' }}
                    onClick={() => handleSendReminder(student.id)}
                    title="Send Reminder"
                  >
                    <Send size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PendingFees
