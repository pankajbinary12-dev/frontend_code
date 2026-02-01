import './Students.css'

const AddStudent = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Add New Student</h2>
      </div>

      <div className="form-container">
        <form className="data-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Enter first name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Enter last name" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Class</label>
              <select>
                <option>Select Class</option>
                <option>X-A</option>
                <option>X-B</option>
                <option>IX-A</option>
              </select>
            </div>
            <div className="form-group">
              <label>Roll Number</label>
              <input type="text" placeholder="Enter roll number" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select>
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Enter phone number" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email" />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea rows="3" placeholder="Enter address"></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Add Student</button>
            <button type="reset" className="btn-secondary">Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStudent
