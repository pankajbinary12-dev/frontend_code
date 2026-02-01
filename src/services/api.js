// API Base URL
const API_BASE_URL = 'http://127.0.0.1:8000/api'

// API Service
export const api = {
  // Auth APIs
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
    return response
  },

  // School Info API
  getSchoolInfo: async (token) => {
    const response = await fetch(`${API_BASE_URL}/school/info`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    return response.json()
  },

  // Students APIs
  students: {
    getAll: async (token) => {
      const response = await fetch(`${API_BASE_URL}/students`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      return response.json()
    },
    
    getById: async (id, token) => {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      return response.json()
    },
    
    create: async (data, token) => {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    
    update: async (id, data, token) => {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    
    delete: async (id, token) => {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      return response.json()
    }
  },

  // Staff APIs
  staff: {
    getAll: async (token) => {
      const response = await fetch(`${API_BASE_URL}/staff`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      return response.json()
    },
    
    create: async (data, token) => {
      const response = await fetch(`${API_BASE_URL}/staff`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      return response.json()
    }
  },

  // Attendance APIs
  attendance: {
    mark: async (data, token) => {
      const response = await fetch(`${API_BASE_URL}/attendance`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    
    getReport: async (params, token) => {
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(`${API_BASE_URL}/attendance/report?${queryString}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      return response.json()
    }
  },

  // Fees APIs
  fees: {
    collect: async (data, token) => {
      const response = await fetch(`${API_BASE_URL}/fees/collect`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      return response.json()
    },
    
    getReport: async (params, token) => {
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(`${API_BASE_URL}/fees/report?${queryString}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      return response.json()
    }
  }
}

export default api
