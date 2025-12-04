<template>
  <div class="card">
    <span class="emoji">🔋</span>
    <p>Batería: {{ estado }}</p>

    <div class="progreso">
      <div class="barra" :style="{ width: porcentaje + '%' }"></div>
    </div>

    <button v-if="!cargando" @click="conectar">Conectar</button>
    <button v-else @click="desconectar">Desconectar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cargando = ref(false)
const porcentaje = ref(0)
const estado = ref('Desconectado')
let intervalo: number | null = null

const conectar = () => {
  cargando.value = true
  estado.value = 'Cargando'
  intervalo = window.setInterval(() => {
    if (porcentaje.value < 100) {
      porcentaje.value += 1
    } else {
      clearInterval(intervalo!)
      estado.value = 'Lista'
      cargando.value = false
    }
  }, 100)
}

const desconectar = () => {
  cargando.value = false
  estado.value = 'Desconectado'
  if (intervalo) clearInterval(intervalo)
}
</script>

<style scoped>
.card {
  padding: 12px;
  background: #c8e6c9;
  border-radius: 10px;
  text-align: center;
  flex: 1 1 150px;
}
.emoji {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
}
.progreso {
  height: 10px;
  background: #a5d6a7;
  border-radius: 6px;
  margin: 10px 0;
  width: 100%;
  overflow: hidden;
}
.barra {
  height: 100%;
  background: #388e3c;
  transition: width 0.1s linear;
}
button {
  padding: 6px 10px;
  border: none;
  border-radius: 15px;
  background: #388e3c;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  padding: 0.5rem 1.2rem;
}
button:hover {
  opacity: 0.85;
}
</style>
