import '../Students/Students.css'

const MarkAttendance = () => {
  const students = [
    { id: 1, rollNo: '001', name: 'Rahul Kumar', status: 'present' },
    { id: 2, rollNo: '002', name: 'Priya Sharma', status: 'present' },
    { id: 3, rollNo: '003', name: 'Amit Singh', status: 'absent' },
  ]

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Mark Attendance</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>Select Class</option>
            <option>X-A</option>
            <option>X-B</option>
            <option>IX-A</option>
          </select>
          <input type="date" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>
                  <span style={{
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: student.status === 'present' ? '#d4edda' : '#f8d7da',
                    color: student.status === 'present' ? '#155724' : '#721c24'
                  }}>
                    {student.status === 'present' ? 'Present' : 'Absent'}
                  </span>
                </td>
                <td>
                  <button className="btn-action">Present</button>
                  <button className="btn-action">Absent</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <button className="btn-primary">Save Attendance</button>
        <button className="btn-secondary">Reset</button>
      </div>
    </div>
  )
}

export default MarkAttendance
