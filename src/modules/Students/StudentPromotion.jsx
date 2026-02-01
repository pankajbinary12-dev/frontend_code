import { useState } from 'react'
import './Students.css'

const StudentPromotion = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul Kumar', currentClass: 'IX-A', rollNo: '001', selected: false },
    { id: 2, name: 'Priya Sharma', currentClass: 'IX-A', rollNo: '002', selected: false },
    { id: 3, name: 'Amit Singh', currentClass: 'IX-B', rollNo: '003', selected: false },
  ])

  const [promoteToClass, setPromoteToClass] = useState('X-A')

  const handleSelectAll = (e) => {
    setStudents(students.map(s => ({ ...s, selected: e.target.checked })))
  }

  const handleSelectStudent = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, selected: !s.selected } : s
    ))
  }

  const handlePromote = () => {
    const selectedStudents = students.filter(s => s.selected)
    if (selectedStudents.length === 0) {
      alert('Please select at least one student')
      return
    }
    alert(`${selectedStudents.length} students promoted to ${promoteToClass}`)
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Student Promotion</h2>
      </div>

      <div className="form-container" style={{ maxWidth: '100%', marginBottom: '20px' }}>
        <div className="form-row">
          <div className="form-group">
            <label>Current Class</label>
            <select>
              <option>IX-A</option>
              <option>IX-B</option>
              <option>VIII-A</option>
            </select>
          </div>
          <div className="form-group">
            <label>Promote To Class</label>
            <select value={promoteToClass} onChange={(e) => setPromoteToClass(e.target.value)}>
              <option>X-A</option>
              <option>X-B</option>
              <option>IX-A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={handleSelectAll} />
              </th>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Current Class</th>
              <th>Promote To</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={student.selected}
                    onChange={() => handleSelectStudent(student.id)}
                  />
                </td>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td><span className="badge badge-primary">{student.currentClass}</span></td>
                <td><span className="badge badge-success">{promoteToClass}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button className="btn-primary" onClick={handlePromote}>
          Promote Selected Students
        </button>
      </div>
    </div>
  )
}

export default StudentPromotion
