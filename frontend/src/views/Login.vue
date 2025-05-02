<template>
 <div class="login-container">
  <h2>Login</h2>
  <form @submit.prevent="handleLogin">
   <div class="form-group">
    <label for="email">Email</label>
    <input
     type="email"
     id="email"
     v-model="email"
     required
     placeholder="Enter your email"
    />
   </div>
   <div class="form-group">
    <label for="password">Password</label>
    <input
     type="password"
     id="password"
     v-model="password"
     required
     placeholder="Enter your password"
    />
   </div>
   <button type="submit" :disabled="loading">
    {{ loading ? 'Logging in...' : 'Login' }}
   </button>
   <p v-if="error" class="error">{{ error }}</p>
   <p class="register-link">
    Don't have an account? <router-link to="/register">Register</router-link>
   </p>
  </form>
 </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
 name: 'Login',
 setup() {
  const store = useStore()
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')

  const handleLogin = async () => {
   try {
    loading.value = true
    error.value = ''
    await store.dispatch('login', {
     email: email.value,
     password: password.value,
    })
    router.push('/home')
   } catch (err) {
    error.value = err.message || 'Login failed'
   } finally {
    loading.value = false
   }
  }

  return {
   email,
   password,
   loading,
   error,
   handleLogin,
  }
 },
}
</script>

<style scoped>
.login-container {
 max-width: 400px;
 margin: 2rem auto;
 padding: 2rem;
 border: 1px solid #ddd;
 border-radius: 8px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
 text-align: center;
 margin-bottom: 1.5rem;
}

.form-group {
 margin-bottom: 1rem;
}

label {
 display: block;
 margin-bottom: 0.5rem;
}

input {
 width: 100%;
 padding: 0.5rem;
 border: 1px solid #ddd;
 border-radius: 4px;
}

button {
 width: 100%;
 padding: 0.75rem;
 background-color: #42b983;
 color: white;
 border: none;
 border-radius: 4px;
 cursor: pointer;
}

button:disabled {
 background-color: #ccc;
 cursor: not-allowed;
}

.error {
 color: red;
 margin-top: 1rem;
 text-align: center;
}

.register-link {
 margin-top: 1rem;
 text-align: center;
}

.register-link a {
 color: #42b983;
 text-decoration: none;
}
</style>
