import { useState, useEffect } from 'react'
import { Eye, Edit2, Trash2, Search, Plus, ChevronLeft, ChevronRight, User, FileText } from 'lucide-react'
import Modal from '../../components/Modal'
import { Swal } from '../../components/CustomAlert'
import './Students.css'

const AllAdmissions = ({ onAddClick, onEditClick }) => {
  const [admissions, setAdmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    fetchAdmissions()
  }, [])

  const fetchAdmissions = async () => {
    try {
      setLoading(true)
      const userStr = localStorage.getItem('user')
      if (!userStr) {
        setError('Please login again')
        setLoading(false)
        return
      }
      
      const user = JSON.parse(userStr)
      const token = user.token

      const response = await fetch('http://127.0.0.1:8000/api/admin/student-admissions/get_studnt_admssn', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Admissions:', data)
        const list = Array.isArray(data) ? data : (data.data || [])
        setAdmissions(list)
        setError(null)
      } else {
        setError('Failed to fetch admissions')
      }
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.confirm('Are you sure?', 'You want to delete this admission?')
    
    if (result.isConfirmed) {
      try {
        const userStr = localStorage.getItem('user')
        const user = JSON.parse(userStr)
        const token = user.token

        const response = await fetch(`http://127.0.0.1:8000/api/admin/student-admissions/delete_studnt_admssn_by_id/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()
        console.log('Delete Response:', response.status, data)

        if (response.ok && data.success) {
          await Swal.success('Deleted!', data.message || 'Admission deleted successfully')
          fetchAdmissions()
        } else {
          await Swal.error('Error!', data.message || data.error || 'Failed to delete admission')
        }
      } catch (err) {
        console.error('Delete Error:', err)
        await Swal.error('Error!', err.message || 'Failed to delete admission')
      }
    }
  }

  const filtered = admissions.filter(item => {
    const searchLower = searchTerm.toLowerCase()
    return (
      item.student_name?.toLowerCase().includes(searchLower) ||
      item.admission_no?.toLowerCase().includes(searchLower) ||
      item.father_name?.toLowerCase().includes(searchLower) ||
      item.mother_name?.toLowerCase().includes(searchLower) ||
      item.class_name?.toLowerCase().includes(searchLower) ||
      item.section_name?.toLowerCase().includes(searchLower) ||
      item.phone?.toLowerCase().includes(searchLower) ||
      item.father_phone?.toLowerCase().includes(searchLower) ||
      item.student_email?.toLowerCase().includes(searchLower) ||
      item.city_name?.toLowerCase().includes(searchLower) ||
      item.state_name?.toLowerCase().includes(searchLower) ||
      item.religion?.toLowerCase().includes(searchLower) ||
      item.blood_group?.toLowerCase().includes(searchLower)
    )
  })

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const current = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <div className="spinner" style={{ width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <p style={{ marginTop: '20px', fontSize: '18px', color: '#667eea', fontWeight: '600' }}>Loading Admissions...</p>
    </div>
  )

  if (error) {
    return (
      <div className="module-container">
        <div className="error-message">
          <p>⚠️ Error: {error}</p>
          <button className="btn-primary" onClick={fetchAdmissions} style={{ marginTop: '20px' }}>🔄 Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Student Admissions</h2>
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by name, admission no, class..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary" onClick={onAddClick}>
            <Plus size={18} /> New Admission
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Admission No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Father Name</th>
              <th>Phone</th>
              <th>Admission Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {current.length === 0 ? (
              <tr><td colSpan="10" style={{ textAlign: 'center', padding: '20px' }}>No admissions found</td></tr>
            ) : (
              current.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.student_photo ? (
                      <img 
                        src={`http://127.0.0.1:8000/storage/${item.student_photo}`} 
                        alt={item.student_name}
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '50%', 
                          objectFit: 'cover',
                          border: '2px solid #667eea',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setSelectedImage(`http://127.0.0.1:8000/storage/${item.student_photo}`)
                          setImageModal(true)
                        }}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.student_name)}&background=667eea&color=fff&size=40`
                        }}
                      />
                    ) : (
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.student_name)}&background=667eea&color=fff&size=40`}
                        alt={item.student_name}
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '50%',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setSelectedImage(`https://ui-avatars.com/api/?name=${encodeURIComponent(item.student_name)}&background=667eea&color=fff&size=400`)
                          setImageModal(true)
                        }}
                      />
                    )}
                  </td>
                  <td><strong>{item.admission_no}</strong></td>
                  <td>{item.student_name}</td>
                  <td>{item.class_name}</td>
                  <td>{item.section_name}</td>
                  <td>{item.father_name}</td>
                  <td>{item.phone || item.father_phone}</td>
                  <td>{item.admission_date ? new Date(item.admission_date).toLocaleDateString() : 'N/A'}</td>
                  <td><span className={`status-badge ${item.status ? 'active' : 'inactive'}`}>{item.status ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-view" onClick={() => { setSelectedItem(item); setViewModal(true); }} title="View">
                        <Eye size={16} />
                      </button>
                      <button className="btn-icon btn-edit" onClick={() => onEditClick(item.id)} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(item.id)} title="Delete">
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

      {filtered.length > itemsPerPage && (
        <div className="pagination">
          <button className="pagination-btn" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            <ChevronLeft size={18} /> Previous
          </button>
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button key={num} className={`pagination-number ${currentPage === num ? 'active' : ''}`} onClick={() => setCurrentPage(num)}>{num}</button>
            ))}
          </div>
          <button className="pagination-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}

      <div className="pagination-info">
        Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filtered.length)} of {filtered.length} admissions
      </div>

      {/* View Modal */}
      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Admission Details">
        {selectedItem && (
          <div className="detail-view">
            {/* Photos Section */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Student Photo */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '600', marginBottom: '10px', color: '#667eea' }}>Student Photo</p>
                {selectedItem.student_photo ? (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${selectedItem.student_photo}`}
                    alt="Student"
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      borderRadius: '12px', 
                      objectFit: 'cover',
                      border: '3px solid #667eea',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedItem.student_name)}&background=667eea&color=fff&size=120`
                    }}
                  />
                ) : (
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '12px', 
                    background: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                  }}>
                    <User size={40} />
                  </div>
                )}
              </div>

              {/* Father Photo */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '600', marginBottom: '10px', color: '#48bb78' }}>Father Photo</p>
                {selectedItem.father_photo ? (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${selectedItem.father_photo}`}
                    alt="Father"
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      borderRadius: '12px', 
                      objectFit: 'cover',
                      border: '3px solid #48bb78',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedItem.father_name)}&background=48bb78&color=fff&size=120`
                    }}
                  />
                ) : (
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '12px', 
                    background: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                  }}>
                    <User size={40} />
                  </div>
                )}
              </div>

              {/* Mother Photo */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '600', marginBottom: '10px', color: '#f56565' }}>Mother Photo</p>
                {selectedItem.mother_photo ? (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${selectedItem.mother_photo}`}
                    alt="Mother"
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      borderRadius: '12px', 
                      objectFit: 'cover',
                      border: '3px solid #f56565',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedItem.mother_name)}&background=f56565&color=fff&size=120`
                    }}
                  />
                ) : (
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '12px', 
                    background: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                  }}>
                    <User size={40} />
                  </div>
                )}
              </div>
            </div>

            <h4 style={{ marginBottom: '15px', color: '#667eea' }}>Student Information</h4>
            <div className="detail-row"><span className="detail-label">Admission No:</span><span className="detail-value">{selectedItem.admission_no}</span></div>
            <div className="detail-row"><span className="detail-label">Student Name:</span><span className="detail-value">{selectedItem.student_name}</span></div>
            <div className="detail-row"><span className="detail-label">Email:</span><span className="detail-value">{selectedItem.student_email || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Phone:</span><span className="detail-value">{selectedItem.phone || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Date of Birth:</span><span className="detail-value">{selectedItem.dob ? new Date(selectedItem.dob).toLocaleDateString() : 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Gender:</span><span className="detail-value">{selectedItem.gender}</span></div>
            <div className="detail-row"><span className="detail-label">Class:</span><span className="detail-value">{selectedItem.class_name}</span></div>
            <div className="detail-row"><span className="detail-label">Section:</span><span className="detail-value">{selectedItem.section_name}</span></div>
            <div className="detail-row"><span className="detail-label">Blood Group:</span><span className="detail-value">{selectedItem.blood_group || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Religion:</span><span className="detail-value">{selectedItem.religion || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Caste:</span><span className="detail-value">{selectedItem.caste || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Nationality:</span><span className="detail-value">{selectedItem.nationality || 'N/A'}</span></div>
            
            <h4 style={{ marginTop: '20px', marginBottom: '15px', color: '#667eea' }}>Address</h4>
            <div className="detail-row"><span className="detail-label">Current Address:</span><span className="detail-value">{selectedItem.stu_address || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Permanent Address:</span><span className="detail-value">{selectedItem.permanent_address || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">City:</span><span className="detail-value">{selectedItem.city_name || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">State:</span><span className="detail-value">{selectedItem.state_name || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Pin Code:</span><span className="detail-value">{selectedItem.pin_code || 'N/A'}</span></div>
            
            <h4 style={{ marginTop: '20px', marginBottom: '15px', color: '#667eea' }}>Parent Information</h4>
            <div className="detail-row"><span className="detail-label">Father Name:</span><span className="detail-value">{selectedItem.father_name}</span></div>
            <div className="detail-row"><span className="detail-label">Father Phone:</span><span className="detail-value">{selectedItem.father_phone}</span></div>
            <div className="detail-row"><span className="detail-label">Father Occupation:</span><span className="detail-value">{selectedItem.father_occupation || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Father Email:</span><span className="detail-value">{selectedItem.father_email || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Mother Name:</span><span className="detail-value">{selectedItem.mother_name}</span></div>
            <div className="detail-row"><span className="detail-label">Mother Phone:</span><span className="detail-value">{selectedItem.mother_phone || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Mother Occupation:</span><span className="detail-value">{selectedItem.mother_occupation || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Mother Email:</span><span className="detail-value">{selectedItem.mother_email || 'N/A'}</span></div>
            
            {selectedItem.guardian_name && (
              <>
                <h4 style={{ marginTop: '20px', marginBottom: '15px', color: '#667eea' }}>Guardian Information</h4>
                <div className="detail-row"><span className="detail-label">Guardian Name:</span><span className="detail-value">{selectedItem.guardian_name}</span></div>
                <div className="detail-row"><span className="detail-label">Guardian Phone:</span><span className="detail-value">{selectedItem.guardian_phone || 'N/A'}</span></div>
                <div className="detail-row"><span className="detail-label">Guardian Email:</span><span className="detail-value">{selectedItem.guardian_email || 'N/A'}</span></div>
              </>
            )}
            
            {selectedItem.emergency_contact && (
              <>
                <h4 style={{ marginTop: '20px', marginBottom: '15px', color: '#667eea' }}>Emergency Contact</h4>
                <div className="detail-row"><span className="detail-label">Contact Name:</span><span className="detail-value">{selectedItem.emergency_contact}</span></div>
                <div className="detail-row"><span className="detail-label">Contact Phone:</span><span className="detail-value">{selectedItem.contact_phone || 'N/A'}</span></div>
                <div className="detail-row"><span className="detail-label">Relation:</span><span className="detail-value">{selectedItem.relation || 'N/A'}</span></div>
              </>
            )}
            
            <h4 style={{ marginTop: '20px', marginBottom: '15px', color: '#667eea' }}>Other Information</h4>
            <div className="detail-row"><span className="detail-label">Admission Date:</span><span className="detail-value">{selectedItem.admission_date ? new Date(selectedItem.admission_date).toLocaleDateString() : 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Previous School:</span><span className="detail-value">{selectedItem.previous_school_name || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Previous Class:</span><span className="detail-value">{selectedItem.previous_class || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">TC Number:</span><span className="detail-value">{selectedItem.tc_number || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Medical Info:</span><span className="detail-value">{selectedItem.medical_info || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Allergies:</span><span className="detail-value">{selectedItem.allergies || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Status:</span><span className="detail-value">{selectedItem.status ? 'Active' : 'Inactive'}</span></div>
            
            {/* Documents Section */}
            <h4 style={{ marginTop: '30px', marginBottom: '15px', color: '#667eea' }}>Documents</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {/* Birth Certificate */}
              {selectedItem.birth_certificate && (
                <div style={{ 
                  padding: '15px', 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '8px',
                  textAlign: 'center',
                  background: '#f7fafc'
                }}>
                  <p style={{ fontWeight: '600', marginBottom: '10px', color: '#667eea' }}>Birth Certificate</p>
                  <a 
                    href={`http://127.0.0.1:8000/storage/${selectedItem.birth_certificate}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-block',
                      padding: '8px 16px',
                      background: '#667eea',
                      color: 'white',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                  >
                    View Document
                  </a>
                </div>
              )}

              {/* Aadhar Front */}
              {selectedItem.aadhar_card_front && (
                <div style={{ 
                  padding: '15px', 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '8px',
                  textAlign: 'center',
                  background: '#f7fafc'
                }}>
                  <p style={{ fontWeight: '600', marginBottom: '10px', color: '#667eea' }}>Aadhar Card (Front)</p>
                  <a 
                    href={`http://127.0.0.1:8000/storage/${selectedItem.aadhar_card_front}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-block',
                      padding: '8px 16px',
                      background: '#667eea',
                      color: 'white',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                  >
                    View Document
                  </a>
                </div>
              )}

              {/* Aadhar Back */}
              {selectedItem.aadhar_card_back && (
                <div style={{ 
                  padding: '15px', 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '8px',
                  textAlign: 'center',
                  background: '#f7fafc'
                }}>
                  <p style={{ fontWeight: '600', marginBottom: '10px', color: '#667eea' }}>Aadhar Card (Back)</p>
                  <a 
                    href={`http://127.0.0.1:8000/storage/${selectedItem.aadhar_card_back}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-block',
                      padding: '8px 16px',
                      background: '#667eea',
                      color: 'white',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                  >
                    View Document
                  </a>
                </div>
              )}
            </div>
            
            {!selectedItem.birth_certificate && !selectedItem.aadhar_card_front && !selectedItem.aadhar_card_back && (
              <p style={{ textAlign: 'center', color: '#718096', padding: '20px' }}>No documents uploaded</p>
            )}
          </div>
        )}
      </Modal>

      {/* Image Popup Modal */}
      <Modal isOpen={imageModal} onClose={() => setImageModal(false)} title="Student Photo">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <img 
            src={selectedImage} 
            alt="Student" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '70vh', 
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default AllAdmissions
