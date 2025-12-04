<template>
  <div>
    <!-- Si NO ha registrado -->
    <template v-if="!registered">
      <OrdersForm @onRegister="handleRegister" />
    </template>

    <!-- Si YA está registrado -->
    <template v-else>
      <h2>Pedido creado con éxito</h2>

      <p><strong>Cliente:</strong> {{ user?.nombre }}</p>
      <p><strong>Email:</strong> {{ user?.email }}</p>
      <p><strong>Método de pago:</strong> {{ user?.metodoPago }}</p>

      <h3>Líneas del pedido:</h3>
      <div v-for="(p, index) in user?.productos" :key="index">
        <p>
          <strong>{{ p.nombre }}</strong> — {{ p.cantidad }} uds × {{ p.precio }}€
          = <strong>{{ p.total }}€</strong>
        </p>
      </div>

      <h3>Total del pedido: {{ user?.totalPedido }} €</h3>

      <button @click="nuevoRegistro">Crear otro pedido</button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { OrdersForm } from '../components/Form'
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
  max-width: 700px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

h2, h3 {
  margin: 0;
}

p {
  font-size: 1rem;
  margin: 0.2rem 0;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  background-color: #3498db;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

button:hover {
  background-color: #2c80b8;
  transform: scale(1.03);
}

/* RESPONSIVE */
@media (max-width: 600px) {
  div {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.95rem;
  }

  button {
    width: 100%;
    font-size: 0.95rem;
  }
}

</style>
