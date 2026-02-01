import { useState } from 'react'
import { Edit2, Plus } from 'lucide-react'
import Modal from '../../components/Modal'
import '../Students/Students.css'

const GradeSystem = () => {
  const [grades, setGrades] = useState([
    { id: 1, grade: 'A+', minMarks: 90, maxMarks: 100, gpa: 4.0, description: 'Outstanding' },
    { id: 2, grade: 'A', minMarks: 80, maxMarks: 89, gpa: 3.7, description: 'Excellent' },
    { id: 3, grade: 'B', minMarks: 70, maxMarks: 79, gpa: 3.3, description: 'Very Good' },
    { id: 4, grade: 'C', minMarks: 60, maxMarks: 69, gpa: 3.0, description: 'Good' },
    { id: 5, grade: 'D', minMarks: 50, maxMarks: 59, gpa: 2.0, description: 'Satisfactory' },
    { id: 6, grade: 'F', minMarks: 0, maxMarks: 49, gpa: 0.0, description: 'Fail' },
  ])

  const [editModal, setEditModal] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState(null)

  const handleEdit = (grade) => {
    setSelectedGrade(grade)
    setEditModal(true)
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Grade System Configuration</h2>
        <button className="btn-primary">
          <Plus size={18} style={{ marginRight: '8px' }} />
          Add Grade
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Grade</th>
              <th>Min Marks (%)</th>
              <th>Max Marks (%)</th>
              <th>GPA</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>
                  <span className={`badge ${
                    grade.grade === 'A+' || grade.grade === 'A' ? 'badge-success' :
                    grade.grade === 'B' || grade.grade === 'C' ? 'badge-warning' :
                    grade.grade === 'D' ? 'badge-primary' : 'badge-danger'
                  }`}>
                    {grade.grade}
                  </span>
                </td>
                <td>{grade.minMarks}%</td>
                <td>{grade.maxMarks}%</td>
                <td>{grade.gpa}</td>
                <td>{grade.description}</td>
                <td>
                  <button className="btn-icon btn-edit" onClick={() => handleEdit(grade)}>
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="Edit Grade">
        {selectedGrade && (
          <form className="data-form">
            <div className="form-group">
              <label>Grade</label>
              <input type="text" defaultValue={selectedGrade.grade} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Min Marks (%)</label>
                <input type="number" defaultValue={selectedGrade.minMarks} />
              </div>
              <div className="form-group">
                <label>Max Marks (%)</label>
                <input type="number" defaultValue={selectedGrade.maxMarks} />
              </div>
            </div>
            <div className="form-group">
              <label>GPA</label>
              <input type="number" step="0.1" defaultValue={selectedGrade.gpa} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" defaultValue={selectedGrade.description} />
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

export default GradeSystem
