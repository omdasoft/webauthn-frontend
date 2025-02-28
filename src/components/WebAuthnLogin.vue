<!-- src/components/WebAuthnRegister.vue -->
<template>
  <div class="webauthn-register">
    <h2>Login with Passkey</h2>
    <button
        @click="handleLogin"
        :disabled="isLogin"
    >
      {{ isLogin ? 'Login...' : 'Use Passkey' }}
    </button>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="success" class="success">
      Login successful!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { loginWebAuthn } from '../services/webauthn'
import {useRouter} from "vue-router";

const isLogin = ref(false)
const error = ref(null)
const success = ref(false)
const router = useRouter()

async function handleLogin() {
  isLogin.value = true
  error.value = null
  success.value = false

  try {
    const res = await loginWebAuthn()

    if (res.code === -1) {
      error.value = res.data.message;
      return;
    }
    // Store the token
    localStorage.setItem('token', res.data.token)

    // Store user data if needed
    localStorage.setItem('user', JSON.stringify(res.data.user))

    // Redirect to dashboard
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message || 'Login failed'
  } finally {
    isLogin.value = false
  }
}
</script>

<style scoped>
.webauthn-register {
  padding: 20px;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>