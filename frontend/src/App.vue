<template>
 <div id="app">
  <nav v-if="isLoggedIn" class="navbar">
   <router-link to="/home">Home</router-link>
   <a href="#" @click.prevent="logout">Logout</a>
  </nav>
  <router-view></router-view>
 </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
 name: 'App',
 setup() {
  const store = useStore()
  const router = useRouter()

  const isLoggedIn = computed(() => store.state.auth.isLoggedIn)

  const logout = () => {
   store.dispatch('logout')
   router.push('/login')
  }

  return {
   isLoggedIn,
   logout,
  }
 },
}
</script>

<style>
#app {
 font-family: Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 color: #2c3e50;
}

.navbar {
 padding: 1rem;
 background-color: #f8f9fa;
 display: flex;
 gap: 1rem;
}

.navbar a {
 color: #2c3e50;
 text-decoration: none;
}

.navbar a:hover {
 color: #42b983;
}
</style>
