import { useState } from 'react'
import { Upload, Eye } from 'lucide-react'
import Modal from '../../components/Modal'
import '../Students/Students.css'

const ExamResults = () => {
  const [results] = useState([
    { id: 1, rollNo: '001', name: 'Rahul Kumar', class: 'X-A', exam: 'Mid Term', totalMarks: 500, obtained: 425, percentage: 85, grade: 'A' },
    { id: 2, rollNo: '002', name: 'Priya Sharma', class: 'X-A', exam: 'Mid Term', totalMarks: 500, obtained: 465, percentage: 93, grade: 'A+' },
    { id: 3, rollNo: '003', name: 'Amit Singh', class: 'X-B', exam: 'Mid Term', totalMarks: 500, obtained: 380, percentage: 76, grade: 'B' },
  ])

  const [viewModal, setViewModal] = useState(false)
  const [selectedResult, setSelectedResult] = useState(null)

  const handleView = (result) => {
    setSelectedResult(result)
    setViewModal(true)
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Exam Results</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>Mid Term</option>
            <option>Final Term</option>
            <option>Unit Test 1</option>
          </select>
          <button className="btn-primary">
            <Upload size={18} style={{ marginRight: '8px' }} />
            Upload Results
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Total Marks</th>
              <th>Obtained</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.rollNo}</td>
                <td>{result.name}</td>
                <td><span className="badge badge-primary">{result.class}</span></td>
                <td>{result.totalMarks}</td>
                <td>{result.obtained}</td>
                <td>{result.percentage}%</td>
                <td>
                  <span className={`badge ${
                    result.grade === 'A+' || result.grade === 'A' ? 'badge-success' :
                    result.grade === 'B' ? 'badge-warning' : 'badge-danger'
                  }`}>
                    {result.grade}
                  </span>
                </td>
                <td>
                  <button className="btn-icon btn-view" onClick={() => handleView(result)}>
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={viewModal} onClose={() => setViewModal(false)} title="Detailed Result">
        {selectedResult && (
          <div className="detail-view">
            <div className="detail-row">
              <span className="detail-label">Student Name:</span>
              <span className="detail-value">{selectedResult.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Roll Number:</span>
              <span className="detail-value">{selectedResult.rollNo}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Class:</span>
              <span className="detail-value">{selectedResult.class}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Exam:</span>
              <span className="detail-value">{selectedResult.exam}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Total Marks:</span>
              <span className="detail-value">{selectedResult.totalMarks}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Obtained Marks:</span>
              <span className="detail-value">{selectedResult.obtained}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Percentage:</span>
              <span className="detail-value" style={{ fontWeight: 'bold', color: '#48bb78' }}>
                {selectedResult.percentage}%
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Grade:</span>
              <span className="detail-value">
                <span className={`badge ${
                  selectedResult.grade === 'A+' || selectedResult.grade === 'A' ? 'badge-success' :
                  selectedResult.grade === 'B' ? 'badge-warning' : 'badge-danger'
                }`}>
                  {selectedResult.grade}
                </span>
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ExamResults
