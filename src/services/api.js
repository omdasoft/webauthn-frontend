// src/services/api.js
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://ninja-rgs-dashboard.test/api',  // Your Laravel API URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// Add token to requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            // Redirect to login or handle unauthorized
        }
        return Promise.reject(error)
    }
)

export default api