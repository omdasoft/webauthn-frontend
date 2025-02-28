<!-- src/components/WebAuthnRegister.vue -->
<template>
  <div class="webauthn-register">
    <h2>Register Security Key</h2>
    <div class="form-group">
      <label for="device_name">Device Name</label>
      <input
          type="text"
          id="device_name"
          v-model="device_name"
          required
      />
    </div>
    <button
        @click="handleRegister"
        :disabled="isRegistering"
    >
      {{ isRegistering ? 'Registering...' : 'Register Security Key' }}
    </button>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="success" class="success">
      Registration successful!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { registerWebAuthn } from '../services/webauthn'

const isRegistering = ref(false)
const error = ref(null)
const success = ref(false)
const device_name = ref('')

async function handleRegister() {
  isRegistering.value = true
  error.value = null
  success.value = false

  try {
    await registerWebAuthn(device_name.value)
    success.value = true
  } catch (err) {
    error.value = err.message || 'Registration failed'
  } finally {
    isRegistering.value = false
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

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  background-color: #9e9e9e;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}
</style>