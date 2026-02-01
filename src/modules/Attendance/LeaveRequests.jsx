import { useState } from 'react'
import { Check, X } from 'lucide-react'
import '../Students/Students.css'

const LeaveRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, studentName: 'Rahul Kumar', class: 'X-A', fromDate: '2026-02-01', toDate: '2026-02-03', reason: 'Medical', status: 'Pending' },
    { id: 2, studentName: 'Priya Sharma', class: 'X-A', fromDate: '2026-02-05', toDate: '2026-02-05', reason: 'Family Function', status: 'Pending' },
  ])

  const handleApprove = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'Approved' } : r))
  }

  const handleReject = (id) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'Rejected' } : r))
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Leave Requests</h2>
        <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <option>All Requests</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.studentName}</td>
                <td><span className="badge badge-primary">{request.class}</span></td>
                <td>{request.fromDate}</td>
                <td>{request.toDate}</td>
                <td>{request.reason}</td>
                <td>
                  <span className={`badge ${
                    request.status === 'Approved' ? 'badge-success' : 
                    request.status === 'Rejected' ? 'badge-danger' : 
                    'badge-warning'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td>
                  {request.status === 'Pending' && (
                    <div className="action-buttons">
                      <button className="btn-icon btn-edit" onClick={() => handleApprove(request.id)} title="Approve">
                        <Check size={16} />
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleReject(request.id)} title="Reject">
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaveRequests
