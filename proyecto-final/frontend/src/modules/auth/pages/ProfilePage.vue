<template>
  <div class="profile-page">
    <h1>Mi Perfil</h1>

    <div class="profile-info">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Nombre completo:</strong> {{ user.fullName }}</p>
      <p><strong>Activo:</strong> {{ user.isActive ? 'Sí' : 'No' }}</p>
    </div>

    <button @click="logout" class="logout-button">
      Cerrar sesión
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { retrieveUser } from '@/modules/auth/services/auth.service.ts';

interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
}

const router = useRouter();
const user = ref<User>({
  id: '',
  email: '',
  fullName: '',
  isActive: false,
});

onMounted(async () => {
  try {
    const data = await retrieveUser();
    user.value = data;
  } catch (error) {
    console.error(error);
    router.push('/login');
  }
});

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
}
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
}

.profile-info p {
  margin: 10px 0;
}

.logout-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f56565;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #e53e3e;
}
</style>
