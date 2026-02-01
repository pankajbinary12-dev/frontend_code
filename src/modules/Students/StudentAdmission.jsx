import { useState, useEffect } from 'react'
import { Upload, User, Users, MapPin, Phone, Mail, Calendar, FileText, Camera } from 'lucide-react'
import { Swal } from '../../components/CustomAlert'
import './Students.css'

const StudentAdmission = () => {
  console.log('StudentAdmission component rendering...')
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState([])
  const [sections, setSections] = useState([])
  const [nextAdmissionNo, setNextAdmissionNo] = useState('Loading...')
  
  const [formData, setFormData] = useState({
    // Student Information
    student_name: '',
    student_email: '',
    phone: '',
    dob: '',
    gender: 'male',
    class_id: '',
    section_id: '',
    blood_group: '',
    religion: '',
    caste: '',
    nationality: '',
    admission_date: '',
    
    // Address Information
    stu_address: '',
    permanent_address: '',
    city_name: '',
    state_name: '',
    pin_code: '',
    
    // Father Information
    father_name: '',
    father_phone: '',
    father_occupation: '',
    father_email: '',
    
    // Mother Information
    mother_name: '',
    mother_phone: '',
    mother_occupation: '',
    mother_email: '',
    
    // Guardian Information
    guardian_name: '',
    guardian_phone: '',
    guardian_email: '',
    
    // Emergency Contact
    emergency_contact: '',
    contact_phone: '',
    relation: '',
    
    // Previous School
    previous_school_name: '',
    previous_class: '',
    tc_number: '',
    
    // Medical Information
    medical_info: '',
    allergies: '',
    
    // Documents/Photos
    student_photo: null,
    father_photo: null,
    mother_photo: null,
    birth_certificate: null,
    aadhar_card_front: null,
    aadhar_card_back: null
  })

  const [previews, setPreviews] = useState({
    student_photo: null,
    father_photo: null,
    mother_photo: null,
    birth_certificate: null,
    aadhar_card_front: null,
    aadhar_card_back: null
  })

  useEffect(() => {
    fetchClasses()
    fetchSections()
    fetchNextAdmissionNo()
  }, [])

  const fetchClasses = async () => {
    try {
      const userStr = localStorage.getItem('user')
      const user = JSON.parse(userStr)
      const token = user.token

      const response = await fetch('http://127.0.0.1:8000/api/admin/classes/get_class', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setClasses(Array.isArray(data) ? data : (data.data || []))
      }
    } catch (err) {
      console.error('Error fetching classes:', err)
    }
  }

  const fetchSections = async () => {
    try {
      const userStr = localStorage.getItem('user')
      const user = JSON.parse(userStr)
      const token = user.token

      const response = await fetch('http://127.0.0.1:8000/api/admin/sections/get_section', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setSections(Array.isArray(data) ? data : (data.data || []))
      }
    } catch (err) {
      console.error('Error fetching sections:', err)
    }
  }

  const fetchNextAdmissionNo = async () => {
    try {
      const userStr = localStorage.getItem('user')
      const user = JSON.parse(userStr)
      const token = user.token

      const response = await fetch('http://127.0.0.1:8000/api/admin/student-admissions/get_studnt_admssn', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        const admissions = Array.isArray(data) ? data : (data.data || [])
        
        console.log('All Admissions:', admissions)
        
        if (admissions.length > 0) {
          // Sort by admission_no to get the highest
          const sortedAdmissions = admissions.sort((a, b) => {
            const numA = parseInt(a.admission_no) || 0
            const numB = parseInt(b.admission_no) || 0
            return numB - numA
          })
          
          const lastAdmission = sortedAdmissions[0]
          console.log('Last Admission:', lastAdmission)
          
          const lastNo = parseInt(lastAdmission.admission_no) || 0
          const nextNo = (lastNo + 1).toString().padStart(4, '0')
          console.log('Next Admission No:', nextNo)
          setNextAdmissionNo(nextNo)
        } else {
          console.log('No admissions found, starting with 0001')
          setNextAdmissionNo('0001')
        }
      } else {
        console.log('API error, defaulting to 0001')
        setNextAdmissionNo('0001')
      }
    } catch (err) {
      console.error('Error fetching next admission no:', err)
      setNextAdmissionNo('0001')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.error('Error!', 'File size should not exceed 5MB')
        e.target.value = '' // Clear the input
        return
      }

      // Validate file type for photos
      if (fieldName.includes('photo')) {
        if (!file.type.startsWith('image/')) {
          Swal.error('Error!', 'Please upload a valid image file (JPG, PNG, JPEG)')
          e.target.value = '' // Clear the input
          return
        }
      }

      // Set the file in formData
      setFormData(prev => ({ ...prev, [fieldName]: file }))
      console.log(`File selected for ${fieldName}:`, file.name, file.type, file.size)

      // Create preview for all files
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [fieldName]: reader.result }))
        console.log(`Preview created for ${fieldName}`)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userStr = localStorage.getItem('user')
      const user = JSON.parse(userStr)
      const token = user.token

      // Create FormData for file upload
      const submitData = new FormData()
      
      // Log what we're sending
      console.log('=== FORM DATA BEFORE SUBMIT ===')
      console.log('Form Data Object:', formData)
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '' && !(formData[key] instanceof File)) {
          submitData.append(key, formData[key])
          console.log(`Appending ${key}:`, formData[key])
        }
      })

      // Append files
      if (formData.student_photo) {
        submitData.append('student_photo', formData.student_photo)
        console.log('Appending student_photo:', formData.student_photo.name)
      }
      if (formData.father_photo) {
        submitData.append('father_photo', formData.father_photo)
        console.log('Appending father_photo:', formData.father_photo.name)
      }
      if (formData.mother_photo) {
        submitData.append('mother_photo', formData.mother_photo)
        console.log('Appending mother_photo:', formData.mother_photo.name)
      }
      if (formData.birth_certificate) {
        submitData.append('birth_certificate', formData.birth_certificate)
        console.log('Appending birth_certificate:', formData.birth_certificate.name)
      }
      if (formData.aadhar_card_front) {
        submitData.append('aadhar_card_front', formData.aadhar_card_front)
        console.log('Appending aadhar_card_front:', formData.aadhar_card_front.name)
      }
      if (formData.aadhar_card_back) {
        submitData.append('aadhar_card_back', formData.aadhar_card_back)
        console.log('Appending aadhar_card_back:', formData.aadhar_card_back.name)
      }

      console.log('=== SENDING TO API ===')
      console.log('URL:', 'http://127.0.0.1:8000/api/admin/student-admissions/store_studnt_admssn')
      console.log('Method: POST')
      console.log('Token:', token ? 'Present' : 'Missing')

      const response = await fetch('http://127.0.0.1:8000/api/admin/student-admissions/store_studnt_admssn', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      })

      const data = await response.json()
      console.log('=== API RESPONSE ===')
      console.log('Status:', response.status)
      console.log('Response Data:', data)

      if (response.ok && data.success) {
        await Swal.success('Success!', data.message || 'Student admitted successfully')
        // Refresh next admission number
        fetchNextAdmissionNo()
        // Reset form
        setFormData({
          student_name: '', student_email: '', phone: '', dob: '', gender: 'male',
          class_id: '', section_id: '', blood_group: '', religion: '', caste: '',
          nationality: '', admission_date: '', stu_address: '', permanent_address: '',
          city_name: '', state_name: '', pin_code: '',
          father_name: '', father_phone: '', father_occupation: '', father_email: '',
          mother_name: '', mother_phone: '', mother_occupation: '', mother_email: '',
          guardian_name: '', guardian_phone: '', guardian_email: '',
          emergency_contact: '', contact_phone: '', relation: '',
          previous_school_name: '', previous_class: '', tc_number: '',
          medical_info: '', allergies: '',
          student_photo: null, father_photo: null, mother_photo: null,
          birth_certificate: null, aadhar_card_front: null, aadhar_card_back: null
        })
        setPreviews({ student_photo: null, father_photo: null, mother_photo: null, birth_certificate: null, aadhar_card_front: null, aadhar_card_back: null })
      } else {
        console.error('=== VALIDATION ERROR ===')
        console.error('Error Details:', data)
        await Swal.error('Error!', data.message || data.error || 'Failed to admit student. Check console for details.')
      }
    } catch (err) {
      console.error('=== SUBMISSION ERROR ===')
      console.error('Error:', err)
      await Swal.error('Error!', err.message || 'Failed to admit student')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2><User size={24} /> Student Admission Form</h2>
      </div>

      <form onSubmit={handleSubmit} className="admission-form">
        {/* Student Information */}
        <div className="form-section">
          <h3><User size={20} /> Student Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Admission Number</label>
              <input 
                type="text" 
                value={nextAdmissionNo} 
                disabled 
                style={{ 
                  backgroundColor: '#f7fafc', 
                  cursor: 'not-allowed',
                  color: '#2d3748',
                  fontWeight: '600',
                  fontSize: '16px'
                }} 
              />
              <small style={{ color: '#48bb78', fontWeight: '500' }}>
                ✓ Next admission number (auto-generated)
              </small>
            </div>
            <div className="form-group">
              <label>Student Name *</label>
              <input type="text" name="student_name" value={formData.student_name} onChange={handleInputChange} required placeholder="Enter student full name" />
            </div>
            <div className="form-group">
              <label>Student Email</label>
              <input type="email" name="student_email" value={formData.student_email} onChange={handleInputChange} placeholder="student@example.com" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="10-digit number" maxLength="10" />
            </div>
            <div className="form-group">
              <label>Date of Birth *</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Admission Date *</label>
              <input type="date" name="admission_date" value={formData.admission_date} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Class *</label>
              <select name="class_id" value={formData.class_id} onChange={handleInputChange} required>
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Section *</label>
              <select name="section_id" value={formData.section_id} onChange={handleInputChange} required>
                <option value="">Select Section</option>
                {sections.map(sec => (
                  <option key={sec.id} value={sec.id}>{sec.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Blood Group</label>
              <select name="blood_group" value={formData.blood_group} onChange={handleInputChange}>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="form-group">
              <label>Religion</label>
              <input type="text" name="religion" value={formData.religion} onChange={handleInputChange} placeholder="Religion" />
            </div>
            <div className="form-group">
              <label>Caste</label>
              <input type="text" name="caste" value={formData.caste} onChange={handleInputChange} placeholder="Caste" />
            </div>
            <div className="form-group">
              <label>Nationality</label>
              <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder="e.g., Indian" />
            </div>
          </div>
        </div>

        {/* Student Photo */}
        <div className="form-section">
          <h3><Camera size={20} /> Student Photo</h3>
          <div className="photo-upload-container">
            <div className="photo-upload-box">
              {previews.student_photo ? (
                <img src={previews.student_photo} alt="Student" className="photo-preview" />
              ) : (
                <div className="photo-placeholder">
                  <Camera size={40} />
                  <p>Upload Student Photo</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileChange(e, 'student_photo')}
                className="file-input"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="form-section">
          <h3><MapPin size={20} /> Address Information</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Current Address *</label>
              <textarea name="stu_address" value={formData.stu_address} onChange={handleInputChange} required rows="2" placeholder="Full current address"></textarea>
            </div>
            <div className="form-group full-width">
              <label>Permanent Address *</label>
              <textarea name="permanent_address" value={formData.permanent_address} onChange={handleInputChange} required rows="2" placeholder="Full permanent address"></textarea>
            </div>
            <div className="form-group">
              <label>City *</label>
              <input type="text" name="city_name" value={formData.city_name} onChange={handleInputChange} required placeholder="City" />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input type="text" name="state_name" value={formData.state_name} onChange={handleInputChange} required placeholder="State" />
            </div>
            <div className="form-group">
              <label>Pin Code *</label>
              <input type="text" name="pin_code" value={formData.pin_code} onChange={handleInputChange} required placeholder="6-digit pincode" maxLength="6" />
            </div>
          </div>
        </div>

        {/* Father Information */}
        <div className="form-section">
          <h3><Users size={20} /> Father Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Father Name *</label>
              <input type="text" name="father_name" value={formData.father_name} onChange={handleInputChange} required placeholder="Father's full name" />
            </div>
            <div className="form-group">
              <label>Father Phone *</label>
              <input type="tel" name="father_phone" value={formData.father_phone} onChange={handleInputChange} required placeholder="10-digit number" maxLength="10" />
            </div>
            <div className="form-group">
              <label>Father Occupation</label>
              <input type="text" name="father_occupation" value={formData.father_occupation} onChange={handleInputChange} placeholder="Occupation" />
            </div>
            <div className="form-group">
              <label>Father Email</label>
              <input type="email" name="father_email" value={formData.father_email} onChange={handleInputChange} placeholder="father@example.com" />
            </div>
          </div>
          <div className="photo-upload-container">
            <div className="photo-upload-box">
              {previews.father_photo ? (
                <img src={previews.father_photo} alt="Father" className="photo-preview" />
              ) : (
                <div className="photo-placeholder">
                  <Camera size={40} />
                  <p>Upload Father Photo</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileChange(e, 'father_photo')}
                className="file-input"
              />
            </div>
          </div>
        </div>

        {/* Mother Information */}
        <div className="form-section">
          <h3><Users size={20} /> Mother Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Mother Name *</label>
              <input type="text" name="mother_name" value={formData.mother_name} onChange={handleInputChange} required placeholder="Mother's full name" />
            </div>
            <div className="form-group">
              <label>Mother Phone</label>
              <input type="tel" name="mother_phone" value={formData.mother_phone} onChange={handleInputChange} placeholder="10-digit number" maxLength="10" />
            </div>
            <div className="form-group">
              <label>Mother Occupation</label>
              <input type="text" name="mother_occupation" value={formData.mother_occupation} onChange={handleInputChange} placeholder="Occupation" />
            </div>
            <div className="form-group">
              <label>Mother Email</label>
              <input type="email" name="mother_email" value={formData.mother_email} onChange={handleInputChange} placeholder="mother@example.com" />
            </div>
          </div>
          <div className="photo-upload-container">
            <div className="photo-upload-box">
              {previews.mother_photo ? (
                <img src={previews.mother_photo} alt="Mother" className="photo-preview" />
              ) : (
                <div className="photo-placeholder">
                  <Camera size={40} />
                  <p>Upload Mother Photo</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileChange(e, 'mother_photo')}
                className="file-input"
              />
            </div>
          </div>
        </div>

        {/* Guardian/Parent Contact */}
        <div className="form-section">
          <h3><Phone size={20} /> Guardian Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Guardian Name</label>
              <input type="text" name="guardian_name" value={formData.guardian_name} onChange={handleInputChange} placeholder="Guardian name (if different from parents)" />
            </div>
            <div className="form-group">
              <label>Guardian Phone</label>
              <input type="tel" name="guardian_phone" value={formData.guardian_phone} onChange={handleInputChange} placeholder="10-digit number" maxLength="10" />
            </div>
            <div className="form-group">
              <label>Guardian Email</label>
              <input type="email" name="guardian_email" value={formData.guardian_email} onChange={handleInputChange} placeholder="guardian@example.com" />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="form-section">
          <h3><Phone size={20} /> Emergency Contact</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Emergency Contact Name</label>
              <input type="text" name="emergency_contact" value={formData.emergency_contact} onChange={handleInputChange} placeholder="Name" />
            </div>
            <div className="form-group">
              <label>Emergency Contact Phone</label>
              <input type="tel" name="contact_phone" value={formData.contact_phone} onChange={handleInputChange} placeholder="10-digit number" maxLength="10" />
            </div>
            <div className="form-group">
              <label>Relation</label>
              <input type="text" name="relation" value={formData.relation} onChange={handleInputChange} placeholder="e.g., Uncle, Aunt" />
            </div>
          </div>
        </div>

        {/* Previous School */}
        <div className="form-section">
          <h3><FileText size={20} /> Previous School Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Previous School Name</label>
              <input type="text" name="previous_school_name" value={formData.previous_school_name} onChange={handleInputChange} placeholder="School name" />
            </div>
            <div className="form-group">
              <label>Previous Class</label>
              <input type="text" name="previous_class" value={formData.previous_class} onChange={handleInputChange} placeholder="e.g., Class IX" />
            </div>
            <div className="form-group">
              <label>TC Number</label>
              <input type="text" name="tc_number" value={formData.tc_number} onChange={handleInputChange} placeholder="Transfer Certificate Number" />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="form-section">
          <h3><FileText size={20} /> Medical Information</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Medical Information</label>
              <textarea name="medical_info" value={formData.medical_info} onChange={handleInputChange} rows="2" placeholder="Any medical conditions or disabilities"></textarea>
            </div>
            <div className="form-group full-width">
              <label>Allergies</label>
              <textarea name="allergies" value={formData.allergies} onChange={handleInputChange} rows="2" placeholder="Any allergies"></textarea>
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="form-section">
          <h3><Upload size={20} /> Document Upload</h3>
          
          {/* Birth Certificate */}
          <div className="form-group full-width">
            <label>Birth Certificate</label>
            <input 
              type="file" 
              accept=".pdf,.jpg,.jpeg,.png" 
              onChange={(e) => handleFileChange(e, 'birth_certificate')}
              style={{ marginBottom: '10px' }}
            />
            {previews.birth_certificate && (
              <div className="document-preview">
                {formData.birth_certificate?.type === 'application/pdf' ? (
                  <div className="pdf-preview">
                    <FileText size={40} color="#667eea" />
                    <p>{formData.birth_certificate.name}</p>
                  </div>
                ) : (
                  <img src={previews.birth_certificate} alt="Birth Certificate" className="document-preview-img" />
                )}
              </div>
            )}
            <small>PDF, JPG, PNG (Max 5MB)</small>
          </div>

          {/* Aadhar Card Front */}
          <div className="form-group">
            <label>Aadhar Card (Front Side)</label>
            <div className="photo-upload-container">
              <div className="photo-upload-box" style={{ width: '100%', maxWidth: '300px' }}>
                {previews.aadhar_card_front ? (
                  formData.aadhar_card_front?.type === 'application/pdf' ? (
                    <div className="pdf-preview">
                      <FileText size={40} color="#667eea" />
                      <p>{formData.aadhar_card_front.name}</p>
                    </div>
                  ) : (
                    <img src={previews.aadhar_card_front} alt="Aadhar Front" className="photo-preview" />
                  )
                ) : (
                  <div className="photo-placeholder">
                    <Upload size={40} />
                    <p>Upload Aadhar Front</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  onChange={(e) => handleFileChange(e, 'aadhar_card_front')}
                  className="file-input"
                />
              </div>
            </div>
            <small>PDF, JPG, PNG (Max 5MB)</small>
          </div>

          {/* Aadhar Card Back */}
          <div className="form-group">
            <label>Aadhar Card (Back Side)</label>
            <div className="photo-upload-container">
              <div className="photo-upload-box" style={{ width: '100%', maxWidth: '300px' }}>
                {previews.aadhar_card_back ? (
                  formData.aadhar_card_back?.type === 'application/pdf' ? (
                    <div className="pdf-preview">
                      <FileText size={40} color="#667eea" />
                      <p>{formData.aadhar_card_back.name}</p>
                    </div>
                  ) : (
                    <img src={previews.aadhar_card_back} alt="Aadhar Back" className="photo-preview" />
                  )
                ) : (
                  <div className="photo-placeholder">
                    <Upload size={40} />
                    <p>Upload Aadhar Back</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  onChange={(e) => handleFileChange(e, 'aadhar_card_back')}
                  className="file-input"
                />
              </div>
            </div>
            <small>PDF, JPG, PNG (Max 5MB)</small>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Admission Form'}
          </button>
          <button type="button" className="btn-secondary" onClick={() => window.location.reload()}>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  )
}

export default StudentAdmission
