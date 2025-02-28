<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <button @click="handleLogout" class="logout-btn">
        Logout
      </button>
    </header>

    <div class="dashboard-content">
      <h2>Welcome, {{ name }}</h2>
      <WebAuthnRegister />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import WebAuthnRegister from '../components/WebAuthnRegister.vue'

const router = useRouter()
const name = ref(null)

onMounted(() => {
  const username = localStorage.getItem('username')
  name.value = username;
})

async function handleLogout() {
  try {
    await api.post('/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dashboard-content {
  max-width: 800px;
  margin: 0 auto;
}
</style>