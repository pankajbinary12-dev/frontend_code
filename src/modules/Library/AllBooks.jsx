import '../Students/Students.css'

const AllBooks = () => {
  const books = [
    { id: 1, title: 'Mathematics Class X', author: 'NCERT', isbn: '978-1234567890', available: 25, total: 30 },
    { id: 2, title: 'English Grammar', author: 'Wren & Martin', isbn: '978-0987654321', available: 15, total: 20 },
    { id: 3, title: 'Science Textbook', author: 'NCERT', isbn: '978-1122334455', available: 20, total: 25 },
  ]

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Library Books</h2>
        <button className="btn-primary">Add New Book</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Available</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.available}</td>
                <td>{book.total}</td>
                <td>
                  <button className="btn-action">Issue</button>
                  <button className="btn-action">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllBooks
