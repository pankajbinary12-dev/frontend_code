import { useState, useEffect } from 'react'
import { Users, TrendingUp, Download, RefreshCw } from 'lucide-react'
import './Students.css'

const StudentStrength = () => {
  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalBoys: 0,
    totalGirls: 0,
    totalOther: 0,
    classSummary: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStrength()
  }, [])

  const fetchStrength = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const userStr = localStorage.getItem('user')
      if (!userStr) {
        setError('No authentication token found. Please login again.')
        setLoading(false)
        return
      }

      const user = JSON.parse(userStr)
      const token = user.token

      if (!token) {
        setError('Token is empty. Please login again.')
        setLoading(false)
        return
      }

      console.log('=== STUDENT STRENGTH API CALL ===')
      console.log('Token:', token.substring(0, 20) + '...')
      console.log('API URL:', 'http://127.0.0.1:8000/api/admin/students/summary')
      console.log('Method: GET')
      console.log('Headers:', {
        'Authorization': `Bearer ${token.substring(0, 20)}...`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })

      const response = await fetch('http://127.0.0.1:8000/api/admin/students/summary', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }

      const responseText = await response.text()
      console.log('Raw response text:', responseText)
      
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        throw new Error('Invalid JSON response from server')
      }
      
      console.log('Parsed JSON data:', data)
      console.log('Response type:', typeof data)
      console.log('Is Array:', Array.isArray(data))
      console.log('Object keys:', Object.keys(data))
      
      // Handle the actual API response format
      let classSummary = []
      
      if (Array.isArray(data)) {
        console.log('✓ Data is direct array')
        classSummary = data
      } else if (data.data && data.data.by_class_and_section && Array.isArray(data.data.by_class_and_section)) {
        console.log('✓ Data is in data.by_class_and_section property')
        classSummary = data.data.by_class_and_section
      } else if (data.by_class_and_section && Array.isArray(data.by_class_and_section)) {
        console.log('✓ Data is in by_class_and_section property')
        classSummary = data.by_class_and_section
      } else if (data.data && Array.isArray(data.data)) {
        console.log('✓ Data is in data property')
        classSummary = data.data
      } else if (data.class_summary && Array.isArray(data.class_summary)) {
        console.log('✓ Data is in class_summary property')
        classSummary = data.class_summary
      } else if (data.classSummary && Array.isArray(data.classSummary)) {
        console.log('✓ Data is in classSummary property')
        classSummary = data.classSummary
      } else if (data.summary && Array.isArray(data.summary)) {
        console.log('✓ Data is in summary property')
        classSummary = data.summary
      } else {
        console.log('⚠ Unknown data format, trying to extract array')
        // Try to find any array in the response
        for (let key in data) {
          if (Array.isArray(data[key])) {
            classSummary = data[key]
            console.log('✓ Found array in key:', key)
            break
          }
        }
      }
      
      console.log('Class Summary extracted:', classSummary)
      console.log('Class Summary length:', classSummary.length)
      
      if (classSummary.length === 0) {
        console.warn('⚠ WARNING: Class summary is empty!')
        console.log('Full response data:', JSON.stringify(data, null, 2))
      }
      
      if (classSummary.length > 0) {
        console.log('First item structure:', classSummary[0])
        console.log('First item keys:', Object.keys(classSummary[0]))
      }
      
      // Calculate totals from the class summary
      const totalStudents = classSummary.reduce((sum, item) => {
        const count = item.total_students || item.total || 0
        console.log(`Adding ${count} students from ${item.class_name}-${item.section_name}`)
        return sum + count
      }, 0)
      
      const totalBoys = classSummary.reduce((sum, item) => sum + (item.male || item.boys || 0), 0)
      const totalGirls = classSummary.reduce((sum, item) => sum + (item.female || item.girls || 0), 0)
      const totalOther = classSummary.reduce((sum, item) => sum + (item.other || 0), 0)
      
      console.log('Calculated totals:', { totalStudents, totalBoys, totalGirls, totalOther })
      
      setSummary({
        totalStudents,
        totalBoys,
        totalGirls,
        totalOther,
        classSummary
      })
      setError(null)
    } catch (err) {
      console.error('Error fetching student strength:', err)
      setError(err.message || 'Failed to fetch student strength')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <div className="spinner" style={{ width: '50px', height: '50px', border: '4px solid #f3f3f3', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '20px', fontSize: '18px', color: '#667eea', fontWeight: '600' }}>Loading Student Strength...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="module-container">
        <div className="error-message">
          <p>⚠️ Error loading student strength: {error}</p>
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
            <p><strong>Troubleshooting:</strong></p>
            <ul style={{ textAlign: 'left', display: 'inline-block' }}>
              <li>Check browser console (F12) for detailed error messages</li>
              <li>Verify backend API is running on http://127.0.0.1:8000</li>
              <li>Check if you're logged in with valid token</li>
              <li>Ensure CORS is enabled on backend</li>
            </ul>
          </div>
          <button className="btn-primary" onClick={fetchStrength} style={{ marginTop: '20px' }}>
            <RefreshCw size={18} />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Student Strength Report</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={fetchStrength}>
            <RefreshCw size={18} />
            Refresh
          </button>
          <button className="btn-primary">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="strength-summary">
        <div className="strength-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="strength-icon">
            <Users size={32} />
          </div>
          <div className="strength-info">
            <h3>{summary.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="strength-card" style={{ background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' }}>
          <div className="strength-icon">
            <Users size={32} />
          </div>
          <div className="strength-info">
            <h3>{summary.totalBoys}</h3>
            <p>Total Boys</p>
          </div>
        </div>

        <div className="strength-card" style={{ background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)' }}>
          <div className="strength-icon">
            <Users size={32} />
          </div>
          <div className="strength-info">
            <h3>{summary.totalGirls}</h3>
            <p>Total Girls</p>
          </div>
        </div>

        <div className="strength-card" style={{ background: 'linear-gradient(135deg, #fc8181 0%, #f56565 100%)' }}>
          <div className="strength-icon">
            <TrendingUp size={32} />
          </div>
          <div className="strength-info">
            <h3>{summary.classSummary.length}</h3>
            <p>Total Sections</p>
          </div>
        </div>
      </div>

      {/* Class-wise Table */}
      <div className="table-container" style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '20px', color: '#2d3748' }}>Class-wise Student Strength</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Class</th>
              <th>Section</th>
              <th>Total Students</th>
              <th>Boys</th>
              <th>Girls</th>
              <th>Other</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {summary.classSummary.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: '#718096', fontSize: '16px' }}>No data available</p>
                  <p style={{ color: '#a0aec0', fontSize: '14px', marginTop: '10px' }}>
                    Check console (F12) for API response details
                  </p>
                </td>
              </tr>
            ) : (
              <>
                {summary.classSummary.map((item, index) => {
                  const total = item.total_students || item.total || 0
                  const boys = item.male || item.boys || 0
                  const girls = item.female || item.girls || 0
                  const other = item.other || 0
                  const percentage = summary.totalStudents > 0 
                    ? ((total / summary.totalStudents) * 100).toFixed(1) 
                    : 0
                  
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.class_name }</td>
                      <td>{item.section_name }</td>
                      <td><strong>{total}</strong></td>
                      <td>{boys}</td>
                      <td>{girls}</td>
                      <td>{other}</td>
                      <td>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                          <span className="progress-text">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                <tr style={{ background: '#f7fafc', fontWeight: 'bold', fontSize: '16px' }}>
                  <td colSpan="3">Grand Total</td>
                  <td><strong>{summary.totalStudents}</strong></td>
                  <td><strong>{summary.totalBoys}</strong></td>
                  <td><strong>{summary.totalGirls}</strong></td>
                  <td><strong>{summary.totalOther}</strong></td>
                  <td><strong>100%</strong></td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Debug Info */}
      <div style={{ marginTop: '20px', padding: '15px', background: '#f7fafc', borderRadius: '8px', fontSize: '12px', color: '#718096' }}>
        <strong>Debug Info:</strong> Total Classes: {summary.classSummary.length} | 
        Total Students: {summary.totalStudents} | 
        Boys: {summary.totalBoys} | 
        Girls: {summary.totalGirls} | 
        Other: {summary.totalOther}
        <br />
      </div>

      {/* Show raw data if no summary */}
      {summary.classSummary.length === 0 && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
          <h4 style={{ color: '#856404', marginTop: 0 }}>⚠️ No Data Found</h4>
          <p style={{ color: '#856404', fontSize: '14px' }}>
            The API returned successfully but no class data was found. 
            Please check the browser console (F12) for the full API response.
          </p>
          <button className="btn-primary" onClick={fetchStrength} style={{ marginTop: '10px' }}>
            <RefreshCw size={18} />
            Retry API Call
          </button>
        </div>
      )}
    </div>
  )
}

export default StudentStrength
