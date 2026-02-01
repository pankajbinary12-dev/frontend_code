import { useState, useEffect } from 'react'
import { Eye, Edit2, Trash2, Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import Modal from '../../components/Modal'
import { Swal } from '../../components/CustomAlert'
import '../Students/Students.css'

const Subjects = () => {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({ name: '', code: '', description: '' })
  
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
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

      const response = await fetch('http://127.0.0.1:8000/api/admin/subjects/get_subject', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Subjects:', data)
        const list = Array.isArray(data) ? data : (data.data || [])
        setSubjects(list)
        setError(null)
      } else {
        setError('Failed to fetch subjects')
      }
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      const userStr = localStorage.getItem('user')
      const user = JSON.parse(userStr)
      const token = user.token

      const response = await fetch('http://127.0.0.1:8000/api/admin/subjects/store_subject', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      console.log('Add Response:', response.status, data)
      
      if (response.ok && data.success) {
        await Swal.success('Success!', data.message || 'Subject added successfully')
        setAddModal(false)
        setFormData({ name: '', code: '', description: '' })
        fetchSubjects()
      } else {
        await Swal.error('Error!', data.message || data.error || 'Failed to add subject')
      }
    } catch (err) {
      console.error('Add Error:', err)
      await Swal.error('Error!', err.message || 'Failed to add subject')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const userStr = localStorage.getItem('user')
      const user = JSON.parse(userStr)
      const token = user.token

      const response = await fetch(`http://127.0.0.1:8000/api/admin/subjects/update_subject_by_id/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      console.log('Update Response:', response.status, data)

      if (response.ok && data.success) {
        await Swal.success('Success!', data.message || 'Subject updated successfully')
        setEditModal(false)
        fetchSubjects()
      } else {
        await Swal.error('Error!', data.message || data.error || 'Failed to update subject')
      }
    } catch (err) {
      console.error('Update Error:', err)
      await Swal.error('Error!', err.message || 'Failed to update subject')
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.confirm('Are you sure?', 'You want to delete this subject?')
    
    if (result.isConfirmed) {
      try {
        const userStr = localStorage.getItem('user')
        const user = JSON.parse(userStr)
        const token = user.token

        const response = await fetch(`http://127.0.0.1:8000/api/admin/subjects/delete_subject_by_id/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()
        console.log('Delete Response:', response.status, data)

        if (response.ok && data.success) {
          await Swal.success('Deleted!', data.message || 'Subject deleted successfully')
          fetchSubjects()
        } else {
          await Swal.error('Error!', data.message || data.error || 'Failed to delete subject')
        }
      } catch (err) {
        console.error('Delete Error:', err)
        await Swal.error('Error!', err.message || 'Failed to delete subject')
      }
    }
  }

  const filtered = subjects.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const current = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <div className="spinner" style={{ width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <p style={{ marginTop: '20px', fontSize: '18px', color: '#667eea', fontWeight: '600' }}>Loading Subjects...</p>
    </div>
  )

  if (error) {
    return (
      <div className="module-container">
        <div className="error-message">
          <p>⚠️ Error: {error}</p>
          <button className="btn-primary" onClick={fetchSubjects} style={{ marginTop: '20px' }}>🔄 Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Subjects</h2>
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary" onClick={() => { setAddModal(true); setFormData({ name: '', code: '', description: '' }); }}>
            <Plus size={18} /> Add Subject
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {current.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No subjects found</td></tr>
            ) : (
              current.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td><strong>{item.code}</strong></td>
                  <td>{item.name}</td>
                  <td>{item.description || 'N/A'}</td>
                  <td><span className={`status-badge ${item.status}`}>{item.status || 'active'}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-view" onClick={() => { setSelectedItem(item); setViewModal(true); }} title="View">
                        <Eye size={16} />
                      </button>
                      <button className="btn-icon btn-edit" onClick={() => { setSelectedItem(item); setFormData({ name: item.name, code: item.code, description: item.description || '' }); setEditModal(true); }} title="Edit">
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
        Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filtered.length)} of {filtered.length} subjects
      </div>

      {/* View Modal */}
      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Subject Details">
        {selectedItem && (
          <div className="detail-view">
            <div className="detail-row"><span className="detail-label">ID:</span><span className="detail-value">{selectedItem.id}</span></div>
            <div className="detail-row"><span className="detail-label">Subject Code:</span><span className="detail-value">{selectedItem.code}</span></div>
            <div className="detail-row"><span className="detail-label">Subject Name:</span><span className="detail-value">{selectedItem.name}</span></div>
            <div className="detail-row"><span className="detail-label">Description:</span><span className="detail-value">{selectedItem.description || 'N/A'}</span></div>
            <div className="detail-row"><span className="detail-label">Status:</span><span className="detail-value">{selectedItem.status || 'active'}</span></div>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Add Subject">
        <form className="data-form" onSubmit={handleAdd}>
          <div className="form-group">
            <label>Subject Code *</label>
            <input type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} required placeholder="e.g., MATH101, ENG102" />
          </div>
          <div className="form-group">
            <label>Subject Name *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="e.g., Mathematics, English" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" placeholder="Optional description"></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Add Subject</button>
            <button type="button" className="btn-secondary" onClick={() => setAddModal(false)}>Cancel</button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Subject">
        <form className="data-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Subject Code *</label>
            <input type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Subject Name *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3"></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Update Subject</button>
            <button type="button" className="btn-secondary" onClick={() => setEditModal(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Subjects
