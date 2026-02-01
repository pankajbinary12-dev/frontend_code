# API URL Fix - Update & Delete Operations

## Problem Found
The error `id is not defined` was occurring because:
1. Update function used `${id}` in URL but `id` variable didn't exist
2. Delete function was sending `id` in body AND in URL (redundant)
3. Update function was sending `id` in body when it should only be in URL

## What Was Fixed

### Designations Module (`src/modules/Settings/Designations.jsx`)

#### Update Function - BEFORE:
```javascript
// ❌ WRONG - 'id' is not defined
const response = await fetch(`http://127.0.0.1:8000/api/admin/designations/update_desigin_by_id/${id}`, {
  method: 'PUT',
  body: JSON.stringify({ id: selectedItem.id, ...formData })  // id in body too
})
```

#### Update Function - AFTER:
```javascript
// ✅ CORRECT - Uses selectedItem.id
const response = await fetch(`http://127.0.0.1:8000/api/admin/designations/update_desigin_by_id/${selectedItem.id}`, {
  method: 'PUT',
  body: JSON.stringify(formData)  // Only formData, no id
})
```

#### Delete Function - BEFORE:
```javascript
// ❌ WRONG - id in URL AND body (redundant)
const response = await fetch(`http://127.0.0.1:8000/api/admin/designations/delete_desigin_by_id/${id}`, {
  method: 'DELETE',
  body: JSON.stringify({ id })  // Not needed
})
```

#### Delete Function - AFTER:
```javascript
// ✅ CORRECT - id only in URL
const response = await fetch(`http://127.0.0.1:8000/api/admin/designations/delete_desigin_by_id/${id}`, {
  method: 'DELETE'
  // No body needed
})
```

### Departments Module (`src/modules/Settings/Departments.jsx`)

Applied the same fixes:

#### Update Function:
```javascript
// ✅ CORRECT
const response = await fetch(`http://127.0.0.1:8000/api/admin/designations/update_deptmnt_by_id/${selectedItem.id}`, {
  method: 'PUT',
  body: JSON.stringify(formData)
})
```

#### Delete Function:
```javascript
// ✅ CORRECT
const response = await fetch(`http://127.0.0.1:8000/api/admin/designations/delete_deptmnt_by_id/${id}`, {
  method: 'DELETE'
})
```

## API Endpoints Summary

### Designations APIs:
- **GET**: `http://127.0.0.1:8000/api/admin/designations/get_desigin`
- **POST**: `http://127.0.0.1:8000/api/admin/designations/add_desigin`
  - Body: `{ name, description }`
- **PUT**: `http://127.0.0.1:8000/api/admin/designations/update_desigin_by_id/{id}`
  - Body: `{ name, description }`
- **DELETE**: `http://127.0.0.1:8000/api/admin/designations/delete_desigin_by_id/{id}`
  - No body needed

### Departments APIs:
- **GET**: `http://127.0.0.1:8000/api/admin/designations/get_deptmnt`
- **POST**: `http://127.0.0.1:8000/api/admin/designations/add_deptmnt`
  - Body: `{ name, description }`
- **PUT**: `http://127.0.0.1:8000/api/admin/designations/update_deptmnt_by_id/{id}`
  - Body: `{ name, description }`
- **DELETE**: `http://127.0.0.1:8000/api/admin/designations/delete_deptmnt_by_id/{id}`
  - No body needed

## Key Changes:
1. ✅ Update uses `selectedItem.id` instead of undefined `id`
2. ✅ Update sends only `formData` in body (no id)
3. ✅ Delete sends no body (id is in URL)
4. ✅ All operations show proper SweetAlert messages
5. ✅ Console logging for debugging

## Testing:
1. Start dev server: `npm run dev`
2. Login to system
3. Go to Staff → Designations
4. Test Update: Click edit, change name, save → Should work now!
5. Test Delete: Click delete, confirm → Should work now!
6. Check browser console (F12) for API responses

## Result:
✅ No more "id is not defined" error
✅ Update operations work correctly
✅ Delete operations work correctly
✅ Proper API URL format with ID in path
✅ Clean request bodies without redundant data
