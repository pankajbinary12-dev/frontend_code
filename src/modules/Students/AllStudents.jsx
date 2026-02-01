import { useState, useEffect } from 'react'
import { Eye, Edit2, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import Modal from '../../components/Modal'
import './Students.css'

const AllStudents = ({ onAddClick }) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      
      // Get token from user object in localStorage
      const userStr = localStorage.getItem('user')
      if (!userStr) {
        setError('No authentication token found. Please login again.')
        setLoading(false)
        return
      }

      const user = JSON.parse(userStr)
      const token = user.token
      
      if (!token) {
        setError('No authentication token found. Please login again.')
        setLoading(false)
        return
      }

      console.log('Fetching students with token:', token)
      
      const response = await fetch('http://127.0.0.1:8000/api/admin/students', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Students API Full Response:', JSON.stringify(data, null, 2))
      
      // Handle different response structures
      let studentsData = []
      if (Array.isArray(data)) {
        studentsData = data
      } else if (data.data && Array.isArray(data.data)) {
        studentsData = data.data
      } else if (data.students && Array.isArray(data.students)) {
        studentsData = data.students
      } else if (data.success && data.data) {
        studentsData = Array.isArray(data.data) ? data.data : []
      }
      
      console.log('Processed students data:', studentsData)
      console.log('First student:', studentsData[0])
      setStudents(studentsData)
      setError(null)
    } catch (err) {
      console.error('Error fetching students:', err)
      setError(err.message || 'Failed to fetch students. Please check if the API is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleView = (student) => {
    setSelectedStudent(student)
    setViewModal(true)
  }

  const handleEdit = (student) => {
    setSelectedStudent(student)
    setEditModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const userStr = localStorage.getItem('user')
        const user = JSON.parse(userStr)
        const token = user.token
        
        const response = await fetch(`http://127.0.0.1:8000/api/admin/students/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          setStudents(students.filter(s => s.id !== id))
          alert('Student deleted successfully')
        } else {
          alert('Failed to delete student')
        }
      } catch (err) {
        console.error('Error deleting student:', err)
        alert('Error deleting student')
      }
    }
  }

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll_number?.includes(searchTerm) ||
    student.class_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.section_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.section?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <div className="spinner" style={{ width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <p style={{ marginTop: '20px', fontSize: '18px', color: '#667eea', fontWeight: '600' }}>Loading Students...</p>
    </div>
  )
  
  if (error) {
    return (
      <div className="module-container">
        <div className="error-message">
          <p>⚠️ Error loading students: {error}</p>
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
            <p><strong>Possible solutions:</strong></p>
            <ul style={{ textAlign: 'left', display: 'inline-block' }}>
              <li>Check if the backend API is running on http://127.0.0.1:8000</li>
              <li>Verify your login token is valid (try logging in again)</li>
              <li>Check browser console (F12) for detailed error messages</li>
              <li>Ensure CORS is enabled on the backend for localhost:5174</li>
            </ul>
          </div>
          <button className="btn-primary" onClick={fetchStudents} style={{ marginTop: '20px' }}>
            🔄 Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>All Students</h2>
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary" onClick={onAddClick}>+ Add New Student</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
                  No students found
                </td>
              </tr>
            ) : (
              currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.roll_number}</td>
                  <td>{student.name}</td>
                  <td>{student.class_name }</td>
                  <td>{student.section_name }</td>
                  <td>{student.phone}</td>
                  <td>{student.email}</td>
                  <td>{student.gender}</td>
                  <td>
                    <span className={`badge ${student.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-view" onClick={() => handleView(student)} title="View">
                        <Eye size={16} />
                      </button>
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(student)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(student.id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredStudents.length > itemsPerPage && (
        <div className="pagination">
          <button 
            className="pagination-btn" 
            onClick={prevPage} 
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
          </div>
          
          <button 
            className="pagination-btn" 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      <div className="pagination-info">
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStudents.length)} of {filteredStudents.length} students
      </div>

      {/* View Modal */}
      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Student Details">
        {selectedStudent && (
          <div className="detail-view">
            <div className="detail-row">
              <span className="detail-label">Student ID:</span>
              <span className="detail-value">{selectedStudent.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{selectedStudent.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Roll Number:</span>
              <span className="detail-value">{selectedStudent.roll_number}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Class:</span>
              <span className="detail-value">{selectedStudent.class_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Section:</span>
              <span className="detail-value">{selectedStudent.section_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{selectedStudent.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{selectedStudent.phone}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date of Birth:</span>
              <span className="detail-value">{selectedStudent.date_of_birth}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Gender:</span>
              <span className="detail-value">{selectedStudent.gender}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{selectedStudent.address}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Parent Name:</span>
              <span className="detail-value">{selectedStudent.parent_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Parent Phone:</span>
              <span className="detail-value">{selectedStudent.parent_phone}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className="detail-value">
                <span className={`badge ${selectedStudent.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                  {selectedStudent.status}
                </span>
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Created At:</span>
              <span className="detail-value">{new Date(selectedStudent.created_at).toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Updated At:</span>
              <span className="detail-value">{new Date(selectedStudent.updated_at).toLocaleString()}</span>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Student">
        {selectedStudent && (
          <form className="data-form" onSubmit={(e) => {
            e.preventDefault()
            alert('Edit functionality will be implemented with API')
            setEditModal(false)
          }}>
            <div className="form-group">
              <label>Student Name</label>
              <input type="text" defaultValue={selectedStudent.name} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Roll Number</label>
                <input type="text" defaultValue={selectedStudent.roll_number} required />
              </div>
              <div className="form-group">
                <label>Class</label>
                <input type="text" defaultValue={selectedStudent.class_name} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Section</label>
                <input type="text" defaultValue={selectedStudent.section_name} required />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select defaultValue={selectedStudent.gender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue={selectedStudent.email} required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" defaultValue={selectedStudent.phone} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" defaultValue={selectedStudent.date_of_birth} required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select defaultValue={selectedStudent.status}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea defaultValue={selectedStudent.address} rows="2"></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Parent Name</label>
                <input type="text" defaultValue={selectedStudent.parent_name} required />
              </div>
              <div className="form-group">
                <label>Parent Phone</label>
                <input type="tel" defaultValue={selectedStudent.parent_phone} required />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Changes</button>
              <button type="button" className="btn-secondary" onClick={() => setEditModal(false)}>Cancel</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}

export default AllStudents
