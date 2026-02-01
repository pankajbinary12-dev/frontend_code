// SweetAlert2-like custom alerts using native browser APIs
// This is a lightweight alternative until sweetalert2 is installed

export const Swal = {
  fire: ({ title, text, icon, showCancelButton, confirmButtonText, cancelButtonText }) => {
    return new Promise((resolve) => {
      const message = text ? `${title}\n\n${text}` : title
      
      if (showCancelButton) {
        const result = window.confirm(message)
        resolve({ isConfirmed: result, isDismissed: !result })
      } else {
        window.alert(message)
        resolve({ isConfirmed: true })
      }
    })
  },
  
  success: (title, text = '') => {
    return Swal.fire({ title: `✓ ${title}`, text, icon: 'success' })
  },
  
  error: (title, text = '') => {
    return Swal.fire({ title: `✗ ${title}`, text, icon: 'error' })
  },
  
  warning: (title, text = '') => {
    return Swal.fire({ title: `⚠ ${title}`, text, icon: 'warning' })
  },
  
  confirm: (title, text = '') => {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    })
  }
}
