import { useState } from 'react'
import { LogIn, User, Lock, Eye, EyeOff } from 'lucide-react'
import './Login.css'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Login successful - Extract data from nested objects
        const userData = {
          name: data.admin?.name || data.admin?.username || 'Admin User',
          username: data.admin?.username || formData.username,
          email: data.admin?.email || '',
          role: data.admin?.role || 'admin',
          token: data.token,
          tokenType: data.token_type || 'Bearer',
          schoolName: data.school?.name || 'School Name',
          schoolCode: data.school?.school_code || '',
          schoolId: data.school?.id || null,
          databaseName: data.school?.database_name || ''
        }
        
        console.log('Login successful! User data:', userData)
        console.log('API Response:', data)
        onLogin(userData)
      } else {
        // Login failed
        setError(data.message || data.error || 'Invalid username or password')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Unable to connect to server. Please check if the API is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">S</div>
          <h1>Welcome Back!</h1>
          <p>School Management System</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <User size={18} />
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>
              <Lock size={18} />
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
                style={{ paddingRight: '50px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#718096',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <a href="#forgot">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner"></div>
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In to Dashboard
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
