import { useState } from 'react'
import '../Students/Students.css'

const ReturnBook = () => {
  const [issuedBooks, setIssuedBooks] = useState([
    { id: 1, bookTitle: 'Mathematics Class X', isbn: '978-1234567890', studentName: 'Rahul Kumar', rollNo: '001', issueDate: '2026-01-20', dueDate: '2026-02-20', fine: 0 },
    { id: 2, bookTitle: 'English Grammar', isbn: '978-0987654321', studentName: 'Priya Sharma', rollNo: '002', issueDate: '2026-01-10', dueDate: '2026-02-10', fine: 50 },
  ])

  const handleReturn = (id) => {
    if (window.confirm('Mark this book as returned?')) {
      setIssuedBooks(issuedBooks.filter(b => b.id !== id))
      alert('Book returned successfully!')
    }
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Return Book</h2>
        <div className="search-box">
          <input type="text" placeholder="Search by ISBN or Roll Number..." />
        </div>
      </div>

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
              <th>Fine</th>
              <th>Action</th>
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
                  {book.fine > 0 ? (
                    <span className="badge badge-danger">₹{book.fine}</span>
                  ) : (
                    <span className="badge badge-success">No Fine</span>
                  )}
                </td>
                <td>
                  <button className="btn-action" onClick={() => handleReturn(book.id)}>
                    Return Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReturnBook
