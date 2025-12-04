<template>
  <div>
    <div v-if="!registered">
      <SignUpForm @register="handleRegister" />
    </div>

    <div v-else>
      <p>Usuario registrado correctamente. ¡Bienvenido, {{ user?.name }}!</p>
      <button @click="nuevoRegistro">Nuevo registro</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {SignUpForm} from '../components/Form'
import type { User } from '../models/user.interface'

const registered = ref(false)
const user = ref<User | null>(null)

const handleRegister = (newUser: User) => {
  user.value = newUser
  registered.value = true
}

const nuevoRegistro = () => {
  user.value = null
  registered.value = false
}
</script>

<style scoped>
div {
  background-color: white;
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: sans-serif;
  text-align: center;
  color: black
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  background-color: #3498db;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

button:hover {
  background-color: #2c80b8;
  transform: scale(1.03);
}

p {
  font-size: 1rem;
  color: #333;
  margin: 0;
}

@media (max-width: 500px) {
  div {
    width: 90%;
    padding: 1.5rem;
  }

  button {
    width: 100%;
    font-size: 0.95rem;
  }

  p {
    font-size: 0.95rem;
  }
}
</style>
