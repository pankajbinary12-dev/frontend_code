# 📦 Installation Guide - School Dashboard

## PowerShell Execution Policy Fix

Aapke system mein PowerShell scripts disabled hain. Yeh fix karne ke liye:

### Option 1: Administrator PowerShell se (Recommended)
1. PowerShell ko **Administrator** mode mein open karein
2. Yeh command run karein:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
3. 'Y' press karein to confirm

### Option 2: CMD Use karein
1. CMD (Command Prompt) open karein
2. Project folder mein jaayein:
```cmd
cd C:\School_ERP\rect_school_front
```
3. Install karein:
```cmd
npm install
```

## Installation Steps

### Step 1: Dependencies Install karein
```bash
npm install
```

Yeh install karega:
- React 18.3.1
- React DOM 18.3.1
- Lucide React (Icons)
- Vite (Build tool)
- @vitejs/plugin-react

### Step 2: Development Server Start karein
```bash
npm run dev
```

Server start hone ke baad browser mein open karein:
```
http://localhost:5173
```

### Step 3: Production Build (Optional)
```bash
npm run build
```

Build files `dist` folder mein mil jayengi.

## 🎯 Quick Start (Agar npm install nahi ho raha)

Agar npm install mein problem aa rahi hai, toh manually install karein:

```bash
npm install react@18.3.1 react-dom@18.3.1 lucide-react@0.344.0
npm install -D vite@5.1.4 @vitejs/plugin-react@4.2.1
```

## 🚀 Run Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## ⚡ Features Ready to Use

✅ Beautiful Dashboard UI
✅ Responsive Design
✅ Student Management
✅ Staff Management
✅ Attendance Tracking
✅ Birthday Notifications
✅ Leave Requests
✅ Class Management
✅ Messaging System
✅ Notice Board

## 🎨 Customization

### Colors Change karne ke liye:
`src/index.css` aur component CSS files edit karein

### New Components add karne ke liye:
`src/components/` folder mein naye components banayein

### Data Change karne ke liye:
`src/components/Dashboard.jsx` mein data arrays edit karein

## 📱 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## 🆘 Common Issues

### Issue 1: npm command not found
**Solution**: Node.js install karein from https://nodejs.org

### Issue 2: Port already in use
**Solution**: Different port use karein:
```bash
npm run dev -- --port 3000
```

### Issue 3: Module not found errors
**Solution**: node_modules delete karke reinstall karein:
```bash
rmdir /s /q node_modules
npm install
```

## 💡 Tips

1. **Fast Refresh**: File save karte hi changes browser mein dikhengi
2. **Hot Module Replacement**: Vite automatically updates karegi
3. **Console Errors**: Browser console check karein for debugging

---

## 🎉 Ready to Go!

Sab kuch setup ho gaya hai! Bas `npm install` aur `npm run dev` run karein!

Happy Coding! 🚀
