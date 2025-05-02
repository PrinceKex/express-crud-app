<template>
 <div class="register-container">
  <h2>Register</h2>
  <form @submit.prevent="handleRegister">
   <div class="form-group">
    <label for="username">Username</label>
    <input
     type="text"
     id="username"
     v-model="username"
     required
     placeholder="Enter your username"
    />
   </div>
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
   <div class="form-group">
    <label for="confirmPassword">Confirm Password</label>
    <input
     type="password"
     id="confirmPassword"
     v-model="confirmPassword"
     required
     placeholder="Confirm your password"
    />
   </div>
   <button type="submit" :disabled="loading">
    {{ loading ? 'Registering...' : 'Register' }}
   </button>
   <p v-if="error" class="error">{{ error }}</p>
   <p class="login-link">
    Already have an account? <router-link to="/login">Login</router-link>
   </p>
  </form>
 </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
 name: 'Register',
 setup() {
  const store = useStore()
  const router = useRouter()
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const loading = ref(false)
  const error = ref('')

  const handleRegister = async () => {
   if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
   }

   try {
    loading.value = true
    error.value = ''
    await store.dispatch('register', {
     username: username.value,
     email: email.value,
     password: password.value,
    })
    router.push('/login')
   } catch (err) {
    error.value = err.message || 'Registration failed'
   } finally {
    loading.value = false
   }
  }

  return {
   username,
   email,
   password,
   confirmPassword,
   loading,
   error,
   handleRegister,
  }
 },
}
</script>

<style scoped>
.register-container {
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

.login-link {
 margin-top: 1rem;
 text-align: center;
}

.login-link a {
 color: #42b983;
 text-decoration: none;
}
</style>
