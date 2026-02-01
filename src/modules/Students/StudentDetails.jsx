import { useState } from 'react'
import { Search, Eye } from 'lucide-react'
import Modal from '../../components/Modal'
import './Students.css'

const StudentDetails = () => {
  const [students] = useState([
    { 
      id: 1, 
      name: 'Rahul Kumar', 
      class: 'X-A', 
      rollNo: '001', 
      phone: '9876543210',
      fatherName: 'Mr. Suresh Kumar',
      motherName: 'Mrs. Anita Kumar',
      dob: '2010-05-15',
      bloodGroup: 'O+',
      address: 'Delhi',
      admissionDate: '2026-04-01'
    },
  ])
  
  const [viewModal, setViewModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const handleView = (student) => {
    setSelectedStudent(student)
    setViewModal(true)
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Student Details</h2>
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search by name or roll number..." />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Father Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td><span className="badge badge-primary">{student.class}</span></td>
                <td>{student.fatherName}</td>
                <td>{student.phone}</td>
                <td>
                  <button className="btn-icon btn-view" onClick={() => handleView(student)}>
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Complete Student Details" size="large">
        {selectedStudent && (
          <div className="detail-view">
            <h3 style={{ marginBottom: '15px', color: '#667eea' }}>Personal Information</h3>
            <div className="detail-row">
              <span className="detail-label">Student Name:</span>
              <span className="detail-value">{selectedStudent.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Roll Number:</span>
              <span className="detail-value">{selectedStudent.rollNo}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Class:</span>
              <span className="detail-value">{selectedStudent.class}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date of Birth:</span>
              <span className="detail-value">{selectedStudent.dob}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Blood Group:</span>
              <span className="detail-value">{selectedStudent.bloodGroup}</span>
            </div>
            
            <h3 style={{ margin: '20px 0 15px', color: '#667eea' }}>Parent Information</h3>
            <div className="detail-row">
              <span className="detail-label">Father's Name:</span>
              <span className="detail-value">{selectedStudent.fatherName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Mother's Name:</span>
              <span className="detail-value">{selectedStudent.motherName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Contact Number:</span>
              <span className="detail-value">{selectedStudent.phone}</span>
            </div>
            
            <h3 style={{ margin: '20px 0 15px', color: '#667eea' }}>Other Details</h3>
            <div className="detail-row">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{selectedStudent.address}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Admission Date:</span>
              <span className="detail-value">{selectedStudent.admissionDate}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default StudentDetails
