<template>
  <div>
    <div v-if="!registered">
      <ContactForm @register="handleRegister" />
    </div>

    <div v-else>
      <p>Usuario registrado correctamente. ¡Bienvenido, {{ user?.name }}!</p>
      <button @click="nuevoRegistro">Nuevo registro</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {ContactForm} from '../components/Form'
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
.panel {
  width: 90%;
  max-width: 700px;
  margin: 50px auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.panel h1 {
  font-size: 1.8rem;
  color: #333;
  text-align: center;
}

.buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.buttons button {
  padding: 0.6rem 1.5rem;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.buttons button:hover {
  transform: scale(1.05);
}

.buttons button:nth-child(1) {
  background-color: #2ecc71;
  color: white;
}

.buttons button:nth-child(1):hover {
  background-color: #27ae60;
}

.buttons button:nth-child(2) {
  background-color: #f1c40f;
  color: #333;
}

.buttons button:nth-child(2):hover {
  background-color: #d4ac0d;
}

.buttons button:nth-child(3) {
  background-color: #e74c3c;
  color: white;
}

.buttons button:nth-child(3):hover {
  background-color: #c0392b;
}

.alertWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.alertWrapper p {
  background: #fff3cd;
  color: #856404;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
}

@media (max-width: 700px) {
  .panel {
    width: 95%;
    padding: 1.5rem;
  }

  .panel h1 {
    font-size: 1.5rem;
  }

  .buttons button {
    width: 100%;
    font-size: 0.95rem;
  }
}

</style>
