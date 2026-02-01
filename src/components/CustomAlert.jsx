import { useState, useEffect } from 'react'
import './CustomAlert.css'

let showAlertCallback = null

export const useAlert = () => {
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    showAlertCallback = setAlert
    return () => {
      showAlertCallback = null
    }
  }, [])

  return alert
}

export const Swal = {
  fire: ({ title, text, icon, showCancelButton, confirmButtonText = 'OK', cancelButtonText = 'Cancel', confirmButtonColor = '#667eea' }) => {
    return new Promise((resolve) => {
      if (showAlertCallback) {
        showAlertCallback({
          title,
          text,
          icon,
          showCancelButton,
          confirmButtonText,
          cancelButtonText,
          confirmButtonColor,
          onConfirm: () => {
            showAlertCallback(null)
            resolve({ isConfirmed: true, isDismissed: false })
          },
          onCancel: () => {
            showAlertCallback(null)
            resolve({ isConfirmed: false, isDismissed: true })
          }
        })
      } else {
        console.error('Alert system not initialized. Make sure AlertContainer is mounted in App.jsx')
        resolve({ isConfirmed: false, isDismissed: true })
      }
    })
  },

  success: (title, text = '') => {
    return Swal.fire({ title, text, icon: 'success', confirmButtonColor: '#48bb78' })
  },

  error: (title, text = '') => {
    return Swal.fire({ title, text, icon: 'error', confirmButtonColor: '#f56565' })
  },

  warning: (title, text = '') => {
    return Swal.fire({ title, text, icon: 'warning', confirmButtonColor: '#f6ad55' })
  },

  info: (title, text = '') => {
    return Swal.fire({ title, text, icon: 'info', confirmButtonColor: '#4299e1' })
  },

  confirm: (title, text = '') => {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#f56565'
    })
  }
}

export const AlertContainer = () => {
  const alert = useAlert()

  if (!alert) return null

  const getIcon = () => {
    switch (alert.icon) {
      case 'success':
        return (
          <div className="swal-icon swal-success">
            <div className="swal-success-circular-line-left"></div>
            <span className="swal-success-line-tip"></span>
            <span className="swal-success-line-long"></span>
            <div className="swal-success-ring"></div>
            <div className="swal-success-fix"></div>
            <div className="swal-success-circular-line-right"></div>
          </div>
        )
      case 'error':
        return (
          <div className="swal-icon swal-error">
            <span className="swal-error-x">
              <span className="swal-error-line-left"></span>
              <span className="swal-error-line-right"></span>
            </span>
          </div>
        )
      case 'warning':
        return (
          <div className="swal-icon swal-warning">
            <span className="swal-warning-body">!</span>
            <span className="swal-warning-dot">.</span>
          </div>
        )
      case 'info':
        return (
          <div className="swal-icon swal-info">
            <span className="swal-info-body">i</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="swal-overlay" onClick={alert.showCancelButton ? alert.onCancel : null}>
      <div className="swal-modal" onClick={(e) => e.stopPropagation()}>
        {getIcon()}
        <h2 className="swal-title">{alert.title}</h2>
        {alert.text && <p className="swal-text">{alert.text}</p>}
        <div className="swal-buttons">
          {alert.showCancelButton && (
            <button className="swal-button swal-button-cancel" onClick={alert.onCancel}>
              {alert.cancelButtonText}
            </button>
          )}
          <button 
            className="swal-button swal-button-confirm" 
            style={{ backgroundColor: alert.confirmButtonColor }}
            onClick={alert.onConfirm}
          >
            {alert.confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}
