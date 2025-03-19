<!-- src/components/WebAuthnRegister.vue -->
<template>
  <div class="webauthn-register">
    <h2>Disable Password Login</h2>
    <button
        @click="disablePasswordLogin"
        :disabled="isLogin"
    >
      {{ isLogin ? 'Login...' : 'Disable' }}
    </button>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="success" class="success">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { initiatePasswordLoginDisable } from '../services/webauthn'
import {useRouter} from "vue-router";

const isLogin = ref(false)
const error = ref(null)
const success = ref(false)
const router = useRouter()
const message = ref(null)

async function disablePasswordLogin() {
  isLogin.value = true
  error.value = null
  success.value = false

  try {
    const res = await initiatePasswordLoginDisable()

    if (res.code === -1) {
      error.value = res.data.message;
      return;
    }
    
    message.value = res.data.message;

    console.log(res.data);

  } catch (err) {
    error.value = err.message || 'Disable Field'
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