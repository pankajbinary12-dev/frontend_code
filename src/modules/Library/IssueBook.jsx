import { useState } from 'react'
import '../Students/Students.css'

const IssueBook = () => {
  const [issuedBooks] = useState([
    { id: 1, bookTitle: 'Mathematics Class X', isbn: '978-1234567890', studentName: 'Rahul Kumar', rollNo: '001', issueDate: '2026-01-20', dueDate: '2026-02-20', status: 'Issued' },
    { id: 2, bookTitle: 'English Grammar', isbn: '978-0987654321', studentName: 'Priya Sharma', rollNo: '002', issueDate: '2026-01-22', dueDate: '2026-02-22', status: 'Issued' },
  ])

  const handleIssue = (e) => {
    e.preventDefault()
    alert('Book issued successfully!')
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Issue Book</h2>
      </div>

      <div className="form-container" style={{ marginBottom: '30px' }}>
        <form className="data-form" onSubmit={handleIssue}>
          <div className="form-row">
            <div className="form-group">
              <label>Student Roll Number *</label>
              <input type="text" placeholder="Enter roll number" required />
            </div>
            <div className="form-group">
              <label>Book ISBN *</label>
              <input type="text" placeholder="Enter ISBN or scan barcode" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Issue Date *</label>
              <input type="date" required />
            </div>
            <div className="form-group">
              <label>Due Date *</label>
              <input type="date" required />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Issue Book</button>
            <button type="reset" className="btn-secondary">Reset</button>
          </div>
        </form>
      </div>

      <h3 style={{ marginBottom: '15px', color: '#2d3748' }}>Currently Issued Books</h3>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>ISBN</th>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.bookTitle}</td>
                <td>{book.isbn}</td>
                <td>{book.studentName}</td>
                <td>{book.rollNo}</td>
                <td>{book.issueDate}</td>
                <td>{book.dueDate}</td>
                <td>
                  <span className="badge badge-warning">{book.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IssueBook
