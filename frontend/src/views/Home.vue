<template>
 <div class="home-container">
  <h2>User Management</h2>
  <div class="user-list">
   <div v-for="user in users" :key="user.id" class="user-card">
    <div class="user-info">
     <h3>{{ user.username }}</h3>
     <p>{{ user.email }}</p>
    </div>
    <div class="user-actions">
     <button @click="editUser(user)" class="edit-btn">Edit</button>
     <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
    </div>
   </div>
  </div>

  <!-- Edit User Modal -->
  <div v-if="showEditModal" class="modal">
   <div class="modal-content">
    <h3>Edit User</h3>
    <form @submit.prevent="handleUpdate">
     <div class="form-group">
      <label for="edit-username">Username</label>
      <input
       type="text"
       id="edit-username"
       v-model="editForm.username"
       required
      />
     </div>
     <div class="form-group">
      <label for="edit-email">Email</label>
      <input type="email" id="edit-email" v-model="editForm.email" required />
     </div>
     <div class="modal-actions">
      <button type="button" @click="closeModal" class="cancel-btn">
       Cancel
      </button>
      <button type="submit" :disabled="loading" class="save-btn">
       {{ loading ? 'Saving...' : 'Save' }}
      </button>
     </div>
    </form>
   </div>
  </div>
 </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
 name: 'Home',
 setup() {
  const store = useStore()
  const users = ref([])
  const showEditModal = ref(false)
  const editForm = ref({
   id: null,
   username: '',
   email: '',
  })
  const loading = ref(false)

  const fetchUsers = async () => {
   try {
    await store.dispatch('fetchUsers')
    users.value = store.getters.allUsers
   } catch (error) {
    console.error('Error fetching users:', error)
   }
  }

  const editUser = (user) => {
   editForm.value = { ...user }
   showEditModal.value = true
  }

  const handleUpdate = async () => {
   try {
    loading.value = true
    await store.dispatch('updateUser', {
     id: editForm.value.id,
     userData: {
      username: editForm.value.username,
      email: editForm.value.email,
     },
    })
    await fetchUsers()
    closeModal()
   } catch (error) {
    console.error('Error updating user:', error)
   } finally {
    loading.value = false
   }
  }

  const deleteUser = async (id) => {
   if (confirm('Are you sure you want to delete this user?')) {
    try {
     await store.dispatch('deleteUser', id)
     await fetchUsers()
    } catch (error) {
     console.error('Error deleting user:', error)
    }
   }
  }

  const closeModal = () => {
   showEditModal.value = false
   editForm.value = {
    id: null,
    username: '',
    email: '',
   }
  }

  onMounted(fetchUsers)

  return {
   users,
   showEditModal,
   editForm,
   loading,
   editUser,
   handleUpdate,
   deleteUser,
   closeModal,
  }
 },
}
</script>

<style scoped>
.home-container {
 max-width: 800px;
 margin: 2rem auto;
 padding: 2rem;
}

h2 {
 text-align: center;
 margin-bottom: 2rem;
}

.user-list {
 display: grid;
 gap: 1rem;
}

.user-card {
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 1rem;
 border: 1px solid #ddd;
 border-radius: 8px;
 background-color: white;
}

.user-info h3 {
 margin: 0;
 color: #2c3e50;
}

.user-info p {
 margin: 0.5rem 0 0;
 color: #666;
}

.user-actions {
 display: flex;
 gap: 0.5rem;
}

button {
 padding: 0.5rem 1rem;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 font-weight: 500;
}

.edit-btn {
 background-color: #42b983;
 color: white;
}

.delete-btn {
 background-color: #dc3545;
 color: white;
}

.modal {
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, 0.5);
 display: flex;
 justify-content: center;
 align-items: center;
}

.modal-content {
 background-color: white;
 padding: 2rem;
 border-radius: 8px;
 width: 100%;
 max-width: 400px;
}

.modal-content h3 {
 margin-top: 0;
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

.modal-actions {
 display: flex;
 justify-content: flex-end;
 gap: 1rem;
 margin-top: 1.5rem;
}

.cancel-btn {
 background-color: #6c757d;
 color: white;
}

.save-btn {
 background-color: #42b983;
 color: white;
}

button:disabled {
 opacity: 0.7;
 cursor: not-allowed;
}
</style>
