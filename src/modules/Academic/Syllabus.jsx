import { useState } from 'react'
import { Upload, Download, Eye } from 'lucide-react'
import '../Students/Students.css'

const Syllabus = () => {
  const [syllabus] = useState([
    { id: 1, subject: 'Mathematics', class: 'X', term: 'Term 1', uploadDate: '2026-01-15', status: 'Active' },
    { id: 2, subject: 'English', class: 'X', term: 'Term 1', uploadDate: '2026-01-16', status: 'Active' },
    { id: 3, subject: 'Science', class: 'X', term: 'Term 2', uploadDate: '2026-01-17', status: 'Draft' },
  ])

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Syllabus Management</h2>
        <button className="btn-primary">
          <Upload size={18} style={{ marginRight: '8px' }} />
          Upload Syllabus
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Term</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {syllabus.map((item) => (
              <tr key={item.id}>
                <td>{item.subject}</td>
                <td><span className="badge badge-primary">{item.class}</span></td>
                <td>{item.term}</td>
                <td>{item.uploadDate}</td>
                <td>
                  <span className={`badge ${item.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon btn-view" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="btn-icon btn-edit" title="Download">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Syllabus
