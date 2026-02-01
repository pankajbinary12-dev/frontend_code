import { useState } from 'react'
import { Eye } from 'lucide-react'
import Modal from '../../components/Modal'
import '../Students/Students.css'

const StaffSalary = () => {
  const [staff] = useState([
    { id: 1, name: 'Dr. Rajesh Kumar', department: 'Mathematics', basicSalary: 50000, allowances: 10000, deductions: 2000, netSalary: 58000, status: 'Paid' },
    { id: 2, name: 'Mrs. Sunita Sharma', department: 'English', basicSalary: 45000, allowances: 8000, deductions: 1500, netSalary: 51500, status: 'Pending' },
  ])

  const [viewModal, setViewModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)

  const handleView = (member) => {
    setSelectedStaff(member)
    setViewModal(true)
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Staff Salary Management</h2>
        <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <option>January 2026</option>
          <option>December 2025</option>
          <option>November 2025</option>
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Department</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.department}</td>
                <td>₹{member.basicSalary.toLocaleString()}</td>
                <td>₹{member.netSalary.toLocaleString()}</td>
                <td>
                  <span className={`badge ${member.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                    {member.status}
                  </span>
                </td>
                <td>
                  <button className="btn-icon btn-view" onClick={() => handleView(member)}>
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Salary Details">
        {selectedStaff && (
          <div className="detail-view">
            <div className="detail-row">
              <span className="detail-label">Staff Name:</span>
              <span className="detail-value">{selectedStaff.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Department:</span>
              <span className="detail-value">{selectedStaff.department}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Basic Salary:</span>
              <span className="detail-value">₹{selectedStaff.basicSalary.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Allowances:</span>
              <span className="detail-value">₹{selectedStaff.allowances.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Deductions:</span>
              <span className="detail-value">₹{selectedStaff.deductions.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Net Salary:</span>
              <span className="detail-value" style={{ fontWeight: 'bold', color: '#48bb78' }}>
                ₹{selectedStaff.netSalary.toLocaleString()}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className="detail-value">
                <span className={`badge ${selectedStaff.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                  {selectedStaff.status}
                </span>
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default StaffSalary
