# 🔌 API Integration Guide

## ✅ Login API Integrated!

### **API Endpoint:**
```
POST http://127.0.0.1:8000/api/admin/login
```

### **Request Body:**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

### **Response (Success):**
```json
{
  "name": "Admin User",
  "username": "admin",
  "role": "admin",
  "token": "your_jwt_token",
  "access_token": "your_access_token"
}
```

### **Response (Error):**
```json
{
  "message": "Invalid credentials",
  "error": "Authentication failed"
}
```

---

## 🎯 **How Login Works:**

1. **User enters username & password**
2. **Frontend sends POST request to API**
3. **API validates credentials**
4. **If valid:**
   - Returns user data + token
   - Frontend stores in localStorage
   - Redirects to dashboard
5. **If invalid:**
   - Shows error message
   - User can try again

---

## 🔧 **API Service File:**

Location: `src/services/api.js`

### **Usage Example:**

```javascript
import api from '../services/api'

// Login
const response = await api.login(username, password)
const data = await response.json()

// Get Students (with token)
const students = await api.students.getAll(token)

// Create Student
const newStudent = await api.students.create(studentData, token)

// Update Student
const updated = await api.students.update(id, studentData, token)

// Delete Student
await api.students.delete(id, token)
```

---

## 📝 **Available API Methods:**

### **Authentication:**
- `api.login(username, password)` - Login

### **Students:**
- `api.students.getAll(token)` - Get all students
- `api.students.getById(id, token)` - Get student by ID
- `api.students.create(data, token)` - Create student
- `api.students.update(id, data, token)` - Update student
- `api.students.delete(id, token)` - Delete student

### **Staff:**
- `api.staff.getAll(token)` - Get all staff
- `api.staff.create(data, token)` - Create staff

### **Attendance:**
- `api.attendance.mark(data, token)` - Mark attendance
- `api.attendance.getReport(params, token)` - Get report

### **Fees:**
- `api.fees.collect(data, token)` - Collect fees
- `api.fees.getReport(params, token)` - Get report

---

## 🔐 **Token Management:**

### **Storing Token:**
```javascript
// After successful login
localStorage.setItem('user', JSON.stringify({
  name: data.name,
  username: data.username,
  token: data.token
}))
```

### **Getting Token:**
```javascript
const user = JSON.parse(localStorage.getItem('user'))
const token = user?.token
```

### **Using Token in Requests:**
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## 🚀 **Integrating with Components:**

### **Example: AllStudents.jsx**

```javascript
import { useState, useEffect } from 'react'
import api from '../../services/api'

const AllStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const data = await api.students.getAll(user.token)
      setStudents(data)
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      await api.students.delete(id, user.token)
      // Refresh list
      fetchStudents()
    } catch (error) {
      console.error('Error deleting student:', error)
    }
  }

  // ... rest of component
}
```

---

## ⚠️ **Error Handling:**

### **Network Errors:**
```javascript
try {
  const response = await api.login(username, password)
  // Handle response
} catch (error) {
  if (error.message === 'Failed to fetch') {
    alert('Cannot connect to server. Please check if API is running.')
  } else {
    alert('An error occurred. Please try again.')
  }
}
```

### **API Errors:**
```javascript
const response = await fetch(url)
const data = await response.json()

if (!response.ok) {
  // Handle error
  alert(data.message || 'Something went wrong')
}
```

---

## 🔄 **CORS Configuration:**

If you get CORS errors, add this to your backend:

### **Django (Python):**
```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

### **Express (Node.js):**
```javascript
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5173'
}))
```

---

## 📊 **API Response Format:**

### **Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### **Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}
```

---

## 🎯 **Next Steps:**

1. ✅ **Login API** - Already integrated!
2. 🔄 **Replace sample data** in modules with API calls
3. 🔄 **Add loading states** for better UX
4. 🔄 **Add error handling** for failed requests
5. 🔄 **Add success messages** after operations

---

## 💡 **Pro Tips:**

1. **Always check if API is running** before testing
2. **Use try-catch** for all API calls
3. **Show loading indicators** during API calls
4. **Handle errors gracefully** with user-friendly messages
5. **Store token securely** in localStorage
6. **Clear token on logout**
7. **Refresh token** if expired

---

## 🔗 **API Base URL:**

Current: `http://127.0.0.1:8000/api`

To change, edit: `src/services/api.js`

```javascript
const API_BASE_URL = 'YOUR_API_URL'
```

---

**🎉 Login API is now fully integrated and working!**
