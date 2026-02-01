import '../Students/Students.css'

const ExamSchedule = () => {
  const exams = [
    { id: 1, subject: 'Mathematics', class: 'X-A', date: '2026-02-15', time: '10:00 AM', duration: '3 hours' },
    { id: 2, subject: 'English', class: 'X-A', date: '2026-02-17', time: '10:00 AM', duration: '3 hours' },
    { id: 3, subject: 'Science', class: 'X-A', date: '2026-02-19', time: '10:00 AM', duration: '3 hours' },
  ]

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Exam Schedule</h2>
        <button className="btn-primary">Add New Exam</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.subject}</td>
                <td>{exam.class}</td>
                <td>{exam.date}</td>
                <td>{exam.time}</td>
                <td>{exam.duration}</td>
                <td>
                  <button className="btn-action">Edit</button>
                  <button className="btn-action">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExamSchedule
