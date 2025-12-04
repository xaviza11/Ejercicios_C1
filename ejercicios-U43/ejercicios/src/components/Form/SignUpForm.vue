<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>Nombre:</label>
      <input v-model="name" type="text" />
      <p v-if="nameError">{{ nameError }}</p>
    </div>

    <div>
      <label>Correo electrónico:</label>
      <input v-model="email" type="email" />
      <p v-if="emailError">{{ emailError }}</p>
    </div>

    <div>
      <label>Contraseña:</label>
      <input v-model="password" type="password" />
      <p v-if="passwordError">{{ passwordError }}</p>
    </div>

    <!-- Mensaje general de errores -->
    <div v-if="!isValid">
      <p v-if="nameError">{{ nameError }}</p>
      <p v-if="emailError">{{ emailError }}</p>
      <p v-if="passwordError">{{ passwordError }}</p>
    </div>

    <button type="submit" :disabled="!isValid">Regístrate</button>
  </form>
</template>

<script setup lang="ts">
import { useValidation } from '../../composables/useValidation'
import type { User } from '../../models/user.interface'

const emit = defineEmits<{
  (e: 'register', user: User): void
}>()

const { name, email, password, nameError, emailError, passwordError, isValid } = useValidation()

const submitForm = () => {
  if (isValid.value) {
    emit('register', { name: name.value, email: email.value, password: password.value })
    name.value = ''
    email.value = ''
    password.value = ''
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 400px;
  margin: 0 auto;
}

form div {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

label {
  font-weight: 600;
}

input {
  padding: 0.5rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

p {
  color: #e74c3c;
  font-size: 0.85rem;
}

button {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: none;
  background-color: #3498db;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

button:hover:enabled {
  background-color: #2c80b8;
  transform: scale(1.03);
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

@media (max-width: 500px) {
  form {
    width: 90%;
  }

  input {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.9rem;
  }
}
</style>
