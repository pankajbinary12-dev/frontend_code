import { useState } from 'react'
import '../Students/Students.css'

const AddStaff = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    designation: '',
    phone: '',
    email: '',
    date_of_birth: '',
    joining_date: '',
    qualification: '',
    experience: '',
    address: '',
    gender: 'male',
    salary: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userStr = localStorage.getItem('user')
      const user = JSON.parse(userStr)
      const token = user.token

      const response = await fetch('http://127.0.0.1:8000/api/admin/staff/add_staff', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        alert('Staff member added successfully!')
        // Reset form
        setFormData({
          name: '',
          department: '',
          designation: '',
          phone: '',
          email: '',
          date_of_birth: '',
          joining_date: '',
          qualification: '',
          experience: '',
          address: '',
          gender: 'male',
          salary: ''
        })
      } else {
        alert(data.message || 'Failed to add staff member')
      }
    } catch (err) {
      console.error('Error adding staff:', err)
      alert('Error adding staff member. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Add New Staff Member</h2>
      </div>

      <div className="form-container">
        <form className="data-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name" 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department *</label>
              <select 
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option>Mathematics</option>
                <option>English</option>
                <option>Science</option>
                <option>Social Studies</option>
                <option>Computer Science</option>
                <option>Physical Education</option>
                <option>Administration</option>
              </select>
            </div>
            <div className="form-group">
              <label>Designation *</label>
              <select 
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select Designation</option>
                <option>Principal</option>
                <option>Vice Principal</option>
                <option>Head Teacher</option>
                <option>Teacher</option>
                <option>Lab Assistant</option>
                <option>Librarian</option>
                <option>Accountant</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number *</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email" 
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender *</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input 
                type="date" 
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Joining</label>
              <input 
                type="date" 
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input 
                type="number" 
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Monthly salary" 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Qualification</label>
              <input 
                type="text" 
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g., M.Sc, B.Ed" 
              />
            </div>
            <div className="form-group">
              <label>Experience (Years)</label>
              <input 
                type="number" 
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Years of experience" 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3" 
              placeholder="Enter complete address"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Staff Member'}
            </button>
            <button type="reset" className="btn-secondary" onClick={() => setFormData({
              name: '',
              department: '',
              designation: '',
              phone: '',
              email: '',
              date_of_birth: '',
              joining_date: '',
              qualification: '',
              experience: '',
              address: '',
              gender: 'male',
              salary: ''
            })}>Reset Form</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStaff
