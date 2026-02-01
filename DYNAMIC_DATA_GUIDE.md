# 🔄 Dynamic Data Guide

## ✅ School Name & User Name - Now Dynamic!

---

## 🏫 **School Name Display**

### **Where it shows:**
- Navbar (top left)
- Login page title (optional)

### **How it works:**
1. User logs in
2. API returns school info in login response
3. Frontend stores school name
4. Navbar displays dynamic school name

### **API Response Format:**

```json
{
  "name": "John Doe",
  "username": "admin",
  "role": "admin",
  "token": "jwt_token_here",
  "school_name": "St. Mary's High School",
  "school_logo": "https://example.com/logo.png"
}
```

### **Alternative field names supported:**
- `school_name` or `schoolName`
- `school_logo` or `schoolLogo`

---

## 👤 **User Name Display**

### **Where it shows:**
- Navbar (top right with avatar)
- User profile dropdown

### **How it works:**
1. API returns user's name in login response
2. Frontend stores user data
3. Navbar displays user name with avatar

### **Priority order:**
1. `data.name` (if available)
2. `data.username` (fallback)
3. `'Admin'` (default fallback)

---

## 🎨 **Logo Display**

### **Two options:**

#### **1. School Logo (if provided by API):**
```javascript
if (schoolLogo) {
  <img src={schoolLogo} alt="School Logo" />
}
```

#### **2. First Letter (default):**
```javascript
else {
  <div className="logo-icon">
    {schoolName.charAt(0).toUpperCase()}
  </div>
}
```

---

## 📝 **Example API Responses:**

### **Minimal Response:**
```json
{
  "username": "admin",
  "token": "abc123"
}
```
**Result:**
- School Name: "School Name" (default)
- User Name: "admin"
- Logo: "S" (first letter)

### **Full Response:**
```json
{
  "name": "John Doe",
  "username": "admin",
  "role": "admin",
  "token": "abc123",
  "school_name": "St. Mary's High School",
  "school_logo": "https://example.com/logo.png"
}
```
**Result:**
- School Name: "St. Mary's High School"
- User Name: "John Doe"
- Logo: School logo image

---

## 🔧 **How to Update School Info:**

### **Option 1: In Login Response (Recommended)**
Include school info in login API response:

```python
# Backend (Django example)
return Response({
    'name': user.get_full_name(),
    'username': user.username,
    'token': token,
    'school_name': user.school.name,
    'school_logo': user.school.logo_url
})
```

### **Option 2: Separate API Call**
Fetch school info after login:

```javascript
// After successful login
const schoolInfo = await api.getSchoolInfo(token)
// Update user data with school info
```

---

## 💾 **Data Storage:**

### **localStorage structure:**
```javascript
{
  "name": "John Doe",
  "username": "admin",
  "role": "admin",
  "token": "jwt_token",
  "schoolName": "St. Mary's High School",
  "schoolLogo": "https://example.com/logo.png"
}
```

### **Accessing data:**
```javascript
const user = JSON.parse(localStorage.getItem('user'))
const schoolName = user?.schoolName || 'School Name'
const userName = user?.name || user?.username || 'Admin'
```

---

## 🎯 **Component Usage:**

### **Navbar.jsx:**
```javascript
const Navbar = ({ user, onLogout }) => {
  const schoolName = user?.schoolName || 'School Name'
  const userName = user?.name || user?.username || 'Admin'
  const schoolLogo = user?.schoolLogo

  return (
    <nav>
      <div className="logo">
        {schoolLogo ? (
          <img src={schoolLogo} alt="School Logo" />
        ) : (
          <div className="logo-icon">
            {schoolName.charAt(0).toUpperCase()}
          </div>
        )}
        <h2>{schoolName}</h2>
      </div>
      
      <div className="user-profile">
        <span>{userName}</span>
      </div>
    </nav>
  )
}
```

---

## 🔄 **Update School Info Dynamically:**

### **Method 1: Refresh from API**
```javascript
const refreshSchoolInfo = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const schoolInfo = await api.getSchoolInfo(user.token)
  
  const updatedUser = {
    ...user,
    schoolName: schoolInfo.name,
    schoolLogo: schoolInfo.logo
  }
  
  localStorage.setItem('user', JSON.stringify(updatedUser))
  // Trigger re-render
}
```

### **Method 2: Update in Settings**
```javascript
const updateSchoolInfo = (newInfo) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const updatedUser = {
    ...user,
    schoolName: newInfo.name,
    schoolLogo: newInfo.logo
  }
  localStorage.setItem('user', JSON.stringify(updatedUser))
}
```

---

## 📊 **Avatar Generation:**

### **Using UI Avatars API:**
```javascript
const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=667eea&color=fff`
```

### **Parameters:**
- `name`: User's name (URL encoded)
- `background`: Background color (hex without #)
- `color`: Text color (hex without #)
- `size`: Image size (default: 64)

### **Example:**
```
https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff&size=128
```

---

## 🎨 **Customization:**

### **Change default school name:**
```javascript
// In Navbar.jsx
const schoolName = user?.schoolName || 'Your School Name Here'
```

### **Change logo style:**
```css
.logo-icon-img {
  width: 45px;
  height: 45px;
  border-radius: 12px; /* or 50% for circle */
  object-fit: cover;
}
```

### **Change avatar style:**
```javascript
// Use custom avatar service
const avatarUrl = `https://your-avatar-service.com/${userName}`
```

---

## ✅ **Testing:**

### **Test with different responses:**

1. **No school info:**
   ```json
   { "username": "admin", "token": "abc" }
   ```
   Should show: "School Name" and "admin"

2. **With school name:**
   ```json
   { 
     "name": "John",
     "username": "admin",
     "token": "abc",
     "school_name": "ABC School"
   }
   ```
   Should show: "ABC School" and "John"

3. **With logo:**
   ```json
   { 
     "username": "admin",
     "token": "abc",
     "school_name": "ABC School",
     "school_logo": "https://example.com/logo.png"
   }
   ```
   Should show: Logo image and "ABC School"

---

## 🚀 **Summary:**

✅ School name is dynamic (from API)
✅ User name is dynamic (from API)
✅ Logo can be image or first letter
✅ Fallback values for missing data
✅ Stored in localStorage
✅ Updates on login
✅ Shows in navbar

---

**🎉 Everything is now dynamic and API-driven!**
