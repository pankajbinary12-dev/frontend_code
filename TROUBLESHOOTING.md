# 🔧 Troubleshooting Guide

## ❌ School Name / User Name Not Showing?

### **Quick Fix Steps:**

#### **Step 1: Clear Browser Cache**
```
1. Press Ctrl + Shift + Delete
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page (Ctrl + F5)
```

#### **Step 2: Clear localStorage**
```
1. Press F12 (Open Developer Tools)
2. Go to "Application" tab
3. Click "Local Storage" → "http://localhost:5173"
4. Right-click → "Clear"
5. Refresh page
```

#### **Step 3: Hard Refresh**
```
Press: Ctrl + Shift + R
(or Ctrl + F5)
```

---

## 🔍 **Check Console Logs:**

### **Open Console:**
1. Press **F12**
2. Click **Console** tab

### **Look for these logs:**

**On Login:**
```
Login successful! User data: {
  name: "John Doe",
  username: "admin",
  schoolName: "ABC School",
  schoolLogo: null,
  token: "..."
}
```

**In Navbar:**
```
Navbar - User data: { name: "John Doe", ... }
Navbar - School Name: "ABC School"
Navbar - User Name: "John Doe"
```

---

## 🐛 **Common Issues:**

### **Issue 1: Shows "School Name" (default)**

**Cause:** API not returning school_name

**Solution:**
Check your API response. It should include:
```json
{
  "school_name": "Your School Name"
}
```

**Alternative field names:**
- `school_name` ✅
- `schoolName` ✅

---

### **Issue 2: Shows "Admin" (default)**

**Cause:** API not returning user name

**Solution:**
Check your API response. It should include:
```json
{
  "name": "John Doe"
}
```

**Fallback order:**
1. `data.name` (priority 1)
2. `data.username` (priority 2)
3. `"Admin"` (default)

---

### **Issue 3: Old data showing**

**Cause:** localStorage has old data

**Solution:**
```javascript
// In browser console, run:
localStorage.clear()
// Then refresh page
```

---

### **Issue 4: Logo not showing**

**Cause:** API not returning logo URL or URL is invalid

**Solution:**
1. Check API returns valid URL:
   ```json
   {
     "school_logo": "https://example.com/logo.png"
   }
   ```

2. Check URL is accessible (open in browser)

3. If no logo, first letter will show automatically

---

## 🧪 **Test Your API:**

### **Using Browser Console:**

```javascript
// Test login API
fetch('http://127.0.0.1:8000/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'password123'
  })
})
.then(r => r.json())
.then(data => console.log('API Response:', data))
```

### **Expected Response:**
```json
{
  "name": "John Doe",
  "username": "admin",
  "token": "jwt_token_here",
  "school_name": "ABC School",
  "school_logo": "https://example.com/logo.png"
}
```

---

## 🔄 **Force Update:**

### **Method 1: Logout & Login Again**
```
1. Click logout button
2. Login again with credentials
3. Check if data updates
```

### **Method 2: Clear localStorage Manually**
```javascript
// In browser console:
localStorage.removeItem('user')
// Then login again
```

### **Method 3: Update localStorage**
```javascript
// In browser console:
const user = JSON.parse(localStorage.getItem('user'))
user.schoolName = 'New School Name'
user.name = 'New User Name'
localStorage.setItem('user', JSON.stringify(user))
// Then refresh page
```

---

## 📊 **Check localStorage:**

### **View Current Data:**
```javascript
// In browser console:
console.log(JSON.parse(localStorage.getItem('user')))
```

### **Expected Structure:**
```json
{
  "name": "John Doe",
  "username": "admin",
  "role": "admin",
  "token": "jwt_token",
  "schoolName": "ABC School",
  "schoolLogo": "https://example.com/logo.png"
}
```

---

## 🎯 **Verify Changes:**

### **Check Navbar:**
1. Look at top-left corner
2. Should show: **School Name** (dynamic)
3. Look at top-right corner
4. Should show: **User Name** (dynamic)

### **Check Avatar:**
1. Should show user's initials
2. Generated from user name
3. Purple background

---

## 🔧 **Manual Fix:**

If nothing works, manually set data:

```javascript
// In browser console:
localStorage.setItem('user', JSON.stringify({
  name: 'Test User',
  username: 'admin',
  role: 'admin',
  token: 'test_token',
  schoolName: 'Test School',
  schoolLogo: null
}))

// Then refresh page
location.reload()
```

---

## 📞 **Still Not Working?**

### **Check these:**

1. ✅ Server is running (http://localhost:5173)
2. ✅ API is running (http://127.0.0.1:8000)
3. ✅ No console errors (F12 → Console)
4. ✅ localStorage is not disabled
5. ✅ Browser is up to date

### **Get Help:**
1. Open browser console (F12)
2. Copy all error messages
3. Check network tab for API calls
4. Share console logs

---

## 🎉 **Success Checklist:**

- [ ] Cleared browser cache
- [ ] Cleared localStorage
- [ ] Hard refreshed page (Ctrl + Shift + R)
- [ ] Logged out and logged in again
- [ ] Checked console logs
- [ ] Verified API response
- [ ] School name showing correctly
- [ ] User name showing correctly
- [ ] Avatar showing correctly

---

**💡 Tip: Always check browser console first! It shows exactly what's happening.**
