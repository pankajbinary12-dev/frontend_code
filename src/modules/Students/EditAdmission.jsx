import { useState, useEffect } from 'react'
import { Upload, User, Users, MapPin, Phone, Mail, Calendar, FileText, Camera, ArrowLeft } from 'lucide-react'
import { Swal } from '../../components/CustomAlert'
import './Students.css'

const EditAdmission = ({ admissionId, onBack }) => {
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState([])
  const [sections, setSections] = useState([])
  const [admission, setAdmission] = useState(null)
  
  const [formData, setFormData] = useState({})
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
    fetchAdmissionDetails()
  }, [admissionId])

  const fetchAdmissionDetails = async () => {
    try {
      const userStr = localStorage.getItem('user')
      const user = JSON.parse(userStr)
      const token = user.token

      const response = await fetch(`http://127.0.0.1:8000/api/admin/student-admissions/get_studnt_admssn_by_id/${admissionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        const admissionData = data.data || data
        setAdmission(admissionData)
        
        // Set form data
        setFormData({
          student_name: admissionData.student_name || '',
          student_email: admissionData.student_email || '',
          phone: admissionData.phone || '',
          dob: admissionData.dob || '',
          gender: admissionData.gender || 'male',
          class_id: admissionData.class_id || '',
          section_id: admissionData.section_id || '',
          blood_group: admissionData.blood_group || '',
          religion: admissionData.religion || '',
          caste: admissionData.caste || '',
          nationality: admissionData.nationality || '',
          admission_date: admissionData.admission_date || '',
          stu_address: admissionData.stu_address || '',
          permanent_address: admissionData.permanent_address || '',
          city_name: admissionData.city_name || '',
          state_name: admissionData.state_name || '',
          pin_code: admissionData.pin_code || '',
          father_name: admissionData.father_name || '',
          father_phone: admissionData.father_phone || '',
          father_occupation: admissionData.father_occupation || '',
          father_email: admissionData.father_email || '',
          mother_name: admissionData.mother_name || '',
          mother_phone: admissionData.mother_phone || '',
          mother_occupation: admissionData.mother_occupation || '',
          mother_email: admissionData.mother_email || '',
          guardian_name: admissionData.guardian_name || '',
          guardian_phone: admissionData.guardian_phone || '',
          guardian_email: admissionData.guardian_email || '',
          emergency_contact: admissionData.emergency_contact || '',
          contact_phone: admissionData.contact_phone || '',
          relation: admissionData.relation || '',
          previous_school_name: admissionData.previous_school_name || '',
          previous_class: admissionData.previous_class || '',
          tc_number: admissionData.tc_number || '',
          medical_info: admissionData.medical_info || '',
          allergies: admissionData.allergies || ''
        })
      }
    } catch (err) {
      console.error('Error:', err)
      Swal.error('Error!', 'Failed to load admission details')
    }
  }

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.error('Error!', 'File size should not exceed 5MB')
        e.target.value = ''
        return
      }

      if (fieldName.includes('photo')) {
        if (!file.type.startsWith('image/')) {
          Swal.error('Error!', 'Please upload a valid image file')
          e.target.value = ''
          return
        }
      }

      setFormData(prev => ({ ...prev, [fieldName]: file }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [fieldName]: reader.result }))
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

      const submitData = new FormData()
      submitData.append('_method', 'PUT')
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '' && !(formData[key] instanceof File)) {
          submitData.append(key, formData[key])
        }
      })

      if (formData.student_photo instanceof File) submitData.append('student_photo', formData.student_photo)
      if (formData.father_photo instanceof File) submitData.append('father_photo', formData.father_photo)
      if (formData.mother_photo instanceof File) submitData.append('mother_photo', formData.mother_photo)
      if (formData.birth_certificate instanceof File) submitData.append('birth_certificate', formData.birth_certificate)
      if (formData.aadhar_card_front instanceof File) submitData.append('aadhar_card_front', formData.aadhar_card_front)
      if (formData.aadhar_card_back instanceof File) submitData.append('aadhar_card_back', formData.aadhar_card_back)

      const response = await fetch(`http://127.0.0.1:8000/api/admin/student-admissions/update_studnt_admssn_by_id/${admissionId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      })

      const data = await response.json()

      if (response.ok && data.success) {
        await Swal.success('Success!', data.message || 'Admission updated successfully')
        onBack()
      } else {
        await Swal.error('Error!', data.message || data.error || 'Failed to update admission')
      }
    } catch (err) {
      console.error('Update Error:', err)
      await Swal.error('Error!', err.message || 'Failed to update admission')
    } finally {
      setLoading(false)
    }
  }

  if (!admission) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner" style={{ width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      </div>
    )
  }

  return (
    <div className="module-container">
      <div className="module-header" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={onBack} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={18} /> Back to List
          </button>
          <div>
            <h2 style={{ margin: 0 }}>Edit Admission - {admission.admission_no}</h2>
            <p style={{ margin: '5px 0 0 0', color: '#718096' }}>{admission.student_name}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admission-form">
        {/* Student Information */}
        <div className="form-section">
          <h3><User size={20} /> Student Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Admission Number</label>
              <input type="text" value={admission.admission_no} disabled style={{ backgroundColor: '#f7fafc', cursor: 'not-allowed', color: '#2d3748', fontWeight: '600' }} />
            </div>
            <div className="form-group">
              <label>Student Name *</label>
              <input type="text" name="student_name" value={formData.student_name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Student Email</label>
              <input type="email" name="student_email" value={formData.student_email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} maxLength="10" />
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
              <input type="text" name="religion" value={formData.religion} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Caste</label>
              <input type="text" name="caste" value={formData.caste} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Nationality</label>
              <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} />
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
              ) : admission.student_photo ? (
                <img src={`http://127.0.0.1:8000/storage/${admission.student_photo}`} alt="Student" className="photo-preview" onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(admission.student_name)}&background=667eea&color=fff&size=200` }} />
              ) : (
                <div className="photo-placeholder">
                  <Camera size={40} />
                  <p>Upload Student Photo</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'student_photo')} className="file-input" />
            </div>
            <p style={{ marginTop: '10px', color: '#718096', fontSize: '14px' }}>
              {admission.student_photo ? '✓ Current photo shown. Upload new to replace.' : 'No photo uploaded yet'}
            </p>
          </div>
        </div>

        {/* Address Information - Same pattern */}
        <div className="form-section">
          <h3><MapPin size={20} /> Address Information</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Current Address *</label>
              <textarea name="stu_address" value={formData.stu_address} onChange={handleInputChange} required rows="2"></textarea>
            </div>
            <div className="form-group full-width">
              <label>Permanent Address *</label>
              <textarea name="permanent_address" value={formData.permanent_address} onChange={handleInputChange} required rows="2"></textarea>
            </div>
            <div className="form-group">
              <label>City *</label>
              <input type="text" name="city_name" value={formData.city_name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input type="text" name="state_name" value={formData.state_name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Pin Code *</label>
              <input type="text" name="pin_code" value={formData.pin_code} onChange={handleInputChange} required maxLength="6" />
            </div>
          </div>
        </div>

        {/* Father Information */}
        <div className="form-section">
          <h3><Users size={20} /> Father Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Father Name *</label>
              <input type="text" name="father_name" value={formData.father_name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Father Phone *</label>
              <input type="tel" name="father_phone" value={formData.father_phone} onChange={handleInputChange} required maxLength="10" />
            </div>
            <div className="form-group">
              <label>Father Occupation</label>
              <input type="text" name="father_occupation" value={formData.father_occupation} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Father Email</label>
              <input type="email" name="father_email" value={formData.father_email} onChange={handleInputChange} />
            </div>
          </div>
          <div className="photo-upload-container">
            <div className="photo-upload-box">
              {previews.father_photo ? (
                <img src={previews.father_photo} alt="Father" className="photo-preview" />
              ) : admission.father_photo ? (
                <img src={`http://127.0.0.1:8000/storage/${admission.father_photo}`} alt="Father" className="photo-preview" onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(admission.father_name)}&background=48bb78&color=fff&size=200` }} />
              ) : (
                <div className="photo-placeholder">
                  <Camera size={40} />
                  <p>Upload Father Photo</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'father_photo')} className="file-input" />
            </div>
            <p style={{ marginTop: '10px', color: '#718096', fontSize: '14px' }}>
              {admission.father_photo ? '✓ Current photo shown' : 'No photo uploaded'}
            </p>
          </div>
        </div>

        {/* Mother Information */}
        <div className="form-section">
          <h3><Users size={20} /> Mother Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Mother Name *</label>
              <input type="text" name="mother_name" value={formData.mother_name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Mother Phone</label>
              <input type="tel" name="mother_phone" value={formData.mother_phone} onChange={handleInputChange} maxLength="10" />
            </div>
            <div className="form-group">
              <label>Mother Occupation</label>
              <input type="text" name="mother_occupation" value={formData.mother_occupation} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Mother Email</label>
              <input type="email" name="mother_email" value={formData.mother_email} onChange={handleInputChange} />
            </div>
          </div>
          <div className="photo-upload-container">
            <div className="photo-upload-box">
              {previews.mother_photo ? (
                <img src={previews.mother_photo} alt="Mother" className="photo-preview" />
              ) : admission.mother_photo ? (
                <img src={`http://127.0.0.1:8000/storage/${admission.mother_photo}`} alt="Mother" className="photo-preview" onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(admission.mother_name)}&background=f56565&color=fff&size=200` }} />
              ) : (
                <div className="photo-placeholder">
                  <Camera size={40} />
                  <p>Upload Mother Photo</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'mother_photo')} className="file-input" />
            </div>
            <p style={{ marginTop: '10px', color: '#718096', fontSize: '14px' }}>
              {admission.mother_photo ? '✓ Current photo shown' : 'No photo uploaded'}
            </p>
          </div>
        </div>

        {/* Guardian, Emergency, Previous School, Medical - Similar pattern */}
        <div className="form-section">
          <h3><Phone size={20} /> Guardian & Emergency Contact</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Guardian Name</label>
              <input type="text" name="guardian_name" value={formData.guardian_name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Guardian Phone</label>
              <input type="tel" name="guardian_phone" value={formData.guardian_phone} onChange={handleInputChange} maxLength="10" />
            </div>
            <div className="form-group">
              <label>Guardian Email</label>
              <input type="email" name="guardian_email" value={formData.guardian_email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Emergency Contact</label>
              <input type="text" name="emergency_contact" value={formData.emergency_contact} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Emergency Phone</label>
              <input type="tel" name="contact_phone" value={formData.contact_phone} onChange={handleInputChange} maxLength="10" />
            </div>
            <div className="form-group">
              <label>Relation</label>
              <input type="text" name="relation" value={formData.relation} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3><FileText size={20} /> Previous School & Medical</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Previous School</label>
              <input type="text" name="previous_school_name" value={formData.previous_school_name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Previous Class</label>
              <input type="text" name="previous_class" value={formData.previous_class} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>TC Number</label>
              <input type="text" name="tc_number" value={formData.tc_number} onChange={handleInputChange} />
            </div>
            <div className="form-group full-width">
              <label>Medical Info</label>
              <textarea name="medical_info" value={formData.medical_info} onChange={handleInputChange} rows="2"></textarea>
            </div>
            <div className="form-group full-width">
              <label>Allergies</label>
              <textarea name="allergies" value={formData.allergies} onChange={handleInputChange} rows="2"></textarea>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="form-section">
          <h3><Upload size={20} /> Documents</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Birth Certificate</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, 'birth_certificate')} />
              {admission.birth_certificate && !previews.birth_certificate && (
                <p style={{ marginTop: '5px', color: '#48bb78', fontSize: '13px' }}>✓ Document uploaded</p>
              )}
              {previews.birth_certificate && (
                <div className="document-preview">
                  {formData.birth_certificate?.type === 'application/pdf' ? (
                    <div className="pdf-preview"><FileText size={40} color="#667eea" /><p>{formData.birth_certificate.name}</p></div>
                  ) : (
                    <img src={previews.birth_certificate} alt="Birth Certificate" className="document-preview-img" />
                  )}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Aadhar Front</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, 'aadhar_card_front')} />
              {admission.aadhar_card_front && !previews.aadhar_card_front && (
                <p style={{ marginTop: '5px', color: '#48bb78', fontSize: '13px' }}>✓ Document uploaded</p>
              )}
              {previews.aadhar_card_front && (
                <div className="document-preview">
                  {formData.aadhar_card_front?.type === 'application/pdf' ? (
                    <div className="pdf-preview"><FileText size={40} color="#667eea" /><p>{formData.aadhar_card_front.name}</p></div>
                  ) : (
                    <img src={previews.aadhar_card_front} alt="Aadhar Front" className="document-preview-img" />
                  )}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Aadhar Back</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, 'aadhar_card_back')} />
              {admission.aadhar_card_back && !previews.aadhar_card_back && (
                <p style={{ marginTop: '5px', color: '#48bb78', fontSize: '13px' }}>✓ Document uploaded</p>
              )}
              {previews.aadhar_card_back && (
                <div className="document-preview">
                  {formData.aadhar_card_back?.type === 'application/pdf' ? (
                    <div className="pdf-preview"><FileText size={40} color="#667eea" /><p>{formData.aadhar_card_back.name}</p></div>
                  ) : (
                    <img src={previews.aadhar_card_back} alt="Aadhar Back" className="document-preview-img" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Admission'}
          </button>
          <button type="button" className="btn-secondary" onClick={onBack}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditAdmission
