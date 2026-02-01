import '../Students/Students.css'

const AddBook = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Book added successfully!')
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Add New Book</h2>
      </div>

      <div className="form-container">
        <form className="data-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Book Title *</label>
              <input type="text" placeholder="Enter book title" required />
            </div>
            <div className="form-group">
              <label>Author *</label>
              <input type="text" placeholder="Enter author name" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>ISBN Number *</label>
              <input type="text" placeholder="Enter ISBN" required />
            </div>
            <div className="form-group">
              <label>Publisher</label>
              <input type="text" placeholder="Enter publisher name" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select required>
                <option value="">Select Category</option>
                <option>Textbook</option>
                <option>Reference</option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Magazine</option>
              </select>
            </div>
            <div className="form-group">
              <label>Total Copies *</label>
              <input type="number" placeholder="Number of copies" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Publication Year</label>
              <input type="number" placeholder="e.g., 2024" />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" placeholder="Book price" />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" placeholder="Book description"></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Add Book</button>
            <button type="reset" className="btn-secondary">Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook
