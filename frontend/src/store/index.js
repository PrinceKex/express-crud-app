import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export default createStore({
 state: {
  auth: {
   isLoggedIn: false,
   user: null,
   token: localStorage.getItem('token') || null,
  },
  users: [],
 },
 mutations: {
  SET_AUTH(state, { user, token }) {
   state.auth.isLoggedIn = true
   state.auth.user = user
   state.auth.token = token
   localStorage.setItem('token', token)
  },
  CLEAR_AUTH(state) {
   state.auth.isLoggedIn = false
   state.auth.user = null
   state.auth.token = null
   localStorage.removeItem('token')
  },
  SET_USERS(state, users) {
   state.users = users
  },
 },
 actions: {
  async login({ commit }, credentials) {
   try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials)
    commit('SET_AUTH', {
     user: response.data.user,
     token: response.data.token,
    })
    return response.data
   } catch (error) {
    throw error.response.data
   }
  },
  async register({ commit }, userData) {
   try {
    const response = await axios.post(`${API_URL}/auth/register`, userData)
    return response.data
   } catch (error) {
    throw error.response.data
   }
  },
  logout({ commit }) {
   commit('CLEAR_AUTH')
  },
  async fetchUsers({ commit, state }) {
   try {
    const response = await axios.get(`${API_URL}/users`, {
     headers: {
      Authorization: `Bearer ${state.auth.token}`,
     },
    })
    commit('SET_USERS', response.data)
    return response.data
   } catch (error) {
    throw error.response.data
   }
  },
  async updateUser({ state }, { id, userData }) {
   try {
    const response = await axios.put(`${API_URL}/users/${id}`, userData, {
     headers: {
      Authorization: `Bearer ${state.auth.token}`,
     },
    })
    return response.data
   } catch (error) {
    throw error.response.data
   }
  },
  async deleteUser({ state }, id) {
   try {
    const response = await axios.delete(`${API_URL}/users/${id}`, {
     headers: {
      Authorization: `Bearer ${state.auth.token}`,
     },
    })
    return response.data
   } catch (error) {
    throw error.response.data
   }
  },
 },
 getters: {
  isAuthenticated: (state) => state.auth.isLoggedIn,
  currentUser: (state) => state.auth.user,
  allUsers: (state) => state.users,
 },
})
