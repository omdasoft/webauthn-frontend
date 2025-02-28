// src/services/auth.js
import api from './api'

export async function login(email, password) {
    const { data } = await api.post('/operator/login', { email, password })
    localStorage.setItem('token', data.token)
    return data
}

export function logout() {
    localStorage.removeItem('token')
}