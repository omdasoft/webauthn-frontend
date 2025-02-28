// src/services/webauthn.js
import { startRegistration, startAuthentication } from '@simplewebauthn/browser'
import api from './api'

export async function registerWebAuthn(device_name) {
    try {
        // Get registration options from your Laravel backend
        const {data: res} = await api.post('/operator/webauthn/register/options', {device_name})

        // Start registration process
        const passkey = await startRegistration(res.data.passkey)

        // Send response to backend for verification
        const { data: verificationResp } = await api.post(
            '/operator/webauthn/register',
            {passkey: JSON.stringify(passkey), challenge_id:res.data.challenge_id}
        )

        return verificationResp
    } catch (error) {
        console.error('Registration failed:', error)
        throw error
    }
}

export async function loginWebAuthn() {
    try {
        // Get login options from your Laravel backend
        const {data: res } = await api.get('/operator/webauthn/login/options')

        // Start login process
        const passkey = await startAuthentication(res.data.passkey)

        // Send response to backend for verification
        const { data: verificationResp } = await api.post(
            '/operator/webauthn/login',
            {passkey: JSON.stringify(passkey), challenge_id: res.data.challenge_id}
        )

        return verificationResp
    } catch (error) {
        console.error('Authentication failed:', error)
        throw error
    }
}