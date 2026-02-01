import { useState } from 'react'
import { Plus, Eye } from 'lucide-react'
import Modal from '../../components/Modal'
import '../Students/Students.css'

const Assignments = () => {
  const [assignments] = useState([
    { id: 1, title: 'Algebra Problems', subject: 'Mathematics', class: 'X-A', dueDate: '2026-02-10', submitted: 35, total: 45 },
    { id: 2, title: 'Essay Writing', subject: 'English', class: 'X-A', dueDate: '2026-02-12', submitted: 40, total: 45 },
    { id: 3, title: 'Physics Experiment', subject: 'Science', class: 'X-B', dueDate: '2026-02-15', submitted: 20, total: 42 },
  ])

  const [addModal, setAddModal] = useState(false)

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Assignments</h2>
        <button className="btn-primary" onClick={() => setAddModal(true)}>
          <Plus size={18} style={{ marginRight: '8px' }} />
          Create Assignment
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Assignment Title</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Due Date</th>
              <th>Submissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.subject}</td>
                <td><span className="badge badge-primary">{assignment.class}</span></td>
                <td>{assignment.dueDate}</td>
                <td>
                  <span className="badge badge-success">
                    {assignment.submitted}/{assignment.total}
                  </span>
                </td>
                <td>
                  <button className="btn-icon btn-view">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Assignment Modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Create New Assignment">
        <form className="data-form">
          <div className="form-group">
            <label>Assignment Title *</label>
            <input type="text" placeholder="Enter assignment title" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Subject *</label>
              <select required>
                <option value="">Select Subject</option>
                <option>Mathematics</option>
                <option>English</option>
                <option>Science</option>
              </select>
            </div>
            <div className="form-group">
              <label>Class *</label>
              <select required>
                <option value="">Select Class</option>
                <option>X-A</option>
                <option>X-B</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Due Date *</label>
            <input type="date" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows="4" placeholder="Assignment description"></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Create Assignment</button>
            <button type="button" className="btn-secondary" onClick={() => setAddModal(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Assignments
