import '../Students/Students.css'

const CollectFees = () => {
  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Collect Fees</h2>
      </div>

      <div className="form-container">
        <form className="data-form">
          <div className="form-row">
            <div className="form-group">
              <label>Student Name / Roll No</label>
              <input type="text" placeholder="Search student" />
            </div>
            <div className="form-group">
              <label>Class</label>
              <select>
                <option>Select Class</option>
                <option>X-A</option>
                <option>X-B</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fee Type</label>
              <select>
                <option>Select Fee Type</option>
                <option>Tuition Fee</option>
                <option>Exam Fee</option>
                <option>Transport Fee</option>
              </select>
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input type="number" placeholder="Enter amount" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Payment Method</label>
              <select>
                <option>Cash</option>
                <option>Online</option>
                <option>Cheque</option>
              </select>
            </div>
            <div className="form-group">
              <label>Payment Date</label>
              <input type="date" />
            </div>
          </div>

          <div className="form-group">
            <label>Remarks</label>
            <textarea rows="3" placeholder="Enter remarks"></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Collect Fee</button>
            <button type="reset" className="btn-secondary">Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CollectFees
