import { useState, useEffect } from 'react'
import { Eye, Edit2, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import Modal from '../../components/Modal'
import '../Students/Students.css'

const AllStaff = ({ onAddClick }) => {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    try {
      setLoading(true)
      
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

      console.log('Fetching staff with token:', token)
      
      const response = await fetch('http://127.0.0.1:8000/api/admin/staff/get_staff', {
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
      console.log('Staff API Full Response:', JSON.stringify(data, null, 2))
      
      // Handle different response structures
      let staffData = []
      if (Array.isArray(data)) {
        staffData = data
      } else if (data.data && Array.isArray(data.data)) {
        staffData = data.data
      } else if (data.staff && Array.isArray(data.staff)) {
        staffData = data.staff
      } else if (data.success && data.data) {
        staffData = Array.isArray(data.data) ? data.data : []
      }
      
      console.log('Processed staff data:', staffData)
      setStaff(staffData)
      setError(null)
    } catch (err) {
      console.error('Error fetching staff:', err)
      setError(err.message || 'Failed to fetch staff. Please check if the API is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleView = (member) => {
    setSelectedStaff(member)
    setViewModal(true)
  }

  const handleEdit = (member) => {
    setSelectedStaff(member)
    setEditModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const userStr = localStorage.getItem('user')
        const user = JSON.parse(userStr)
        const token = user.token
        
        const response = await fetch(`http://127.0.0.1:8000/api/admin/staff/delete_staff_by_id`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        })

        if (response.ok) {
          setStaff(staff.filter(s => s.id !== id))
          alert('Staff member deleted successfully')
        } else {
          alert('Failed to delete staff member')
        }
      } catch (err) {
        console.error('Error deleting staff:', err)
        alert('Error deleting staff member')
      }
    }
  }

  const filteredStaff = staff.filter(member =>
    member.staff_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentStaff = filteredStaff.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <div className="spinner" style={{ width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <p style={{ marginTop: '20px', fontSize: '18px', color: '#667eea', fontWeight: '600' }}>Loading Staff...</p>
    </div>
  )
  
  if (error) {
    return (
      <div className="module-container">
        <div className="error-message">
          <p>⚠️ Error loading staff: {error}</p>
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
            <p><strong>Possible solutions:</strong></p>
            <ul style={{ textAlign: 'left', display: 'inline-block' }}>
              <li>Check if the backend API is running on http://127.0.0.1:8000</li>
              <li>Verify your login token is valid (try logging in again)</li>
              <li>Check browser console (F12) for detailed error messages</li>
              <li>Ensure CORS is enabled on the backend for localhost:5174</li>
            </ul>
          </div>
          <button className="btn-primary" onClick={fetchStaff} style={{ marginTop: '20px' }}>
            🔄 Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>All Staff Members</h2>
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search staff..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary" onClick={onAddClick}>+ Add New Staff</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                  No staff members found
                </td>
              </tr>
            ) : (
              currentStaff.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.staff_name || member.name}</td>
                  <td>{member.department_name || member.department}</td>
                  <td>{member.designation_name || member.designation}</td>
                  <td>{member.phone}</td>
                  <td>{member.email_id || member.email}</td>
                  <td>
                    <span className={`badge ${member.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {member.status || 'active'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-view" onClick={() => handleView(member)} title="View">
                        <Eye size={16} />
                      </button>
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(member)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(member.id)} title="Delete">
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
      {filteredStaff.length > itemsPerPage && (
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
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStaff.length)} of {filteredStaff.length} staff members
      </div>

      {/* View Modal */}
      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Staff Details">
        {selectedStaff && (
          <div className="detail-view">
            <div className="detail-row">
              <span className="detail-label">Staff ID:</span>
              <span className="detail-value">{selectedStaff.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{selectedStaff.staff_name || selectedStaff.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Department:</span>
              <span className="detail-value">{selectedStaff.department_name || selectedStaff.department}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Designation:</span>
              <span className="detail-value">{selectedStaff.designation_name || selectedStaff.designation}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Class:</span>
              <span className="detail-value">{selectedStaff.class_name || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Section:</span>
              <span className="detail-value">{selectedStaff.section_name || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{selectedStaff.email_id || selectedStaff.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{selectedStaff.phone}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date of Birth:</span>
              <span className="detail-value">{selectedStaff.dob || selectedStaff.date_of_birth || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{selectedStaff.address || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Qualification:</span>
              <span className="detail-value">{selectedStaff.qualification || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Joining Date:</span>
              <span className="detail-value">{selectedStaff.joining_date || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className="detail-value">
                <span className={`badge ${selectedStaff.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                  {selectedStaff.status || 'active'}
                </span>
              </span>
            </div>
            {selectedStaff.created_at && (
              <div className="detail-row">
                <span className="detail-label">Created At:</span>
                <span className="detail-value">{new Date(selectedStaff.created_at).toLocaleString()}</span>
              </div>
            )}
            {selectedStaff.updated_at && (
              <div className="detail-row">
                <span className="detail-label">Updated At:</span>
                <span className="detail-value">{new Date(selectedStaff.updated_at).toLocaleString()}</span>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Staff Member">
        {selectedStaff && (
          <form className="data-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" defaultValue={selectedStaff.name} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <input type="text" defaultValue={selectedStaff.department} />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input type="text" defaultValue={selectedStaff.designation} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" defaultValue={selectedStaff.phone} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue={selectedStaff.email} />
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

export default AllStaff
