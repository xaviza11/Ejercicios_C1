<template>
  <div class="card">
    <span class="emoji">🎵</span>
    <p>Música: {{ estado }}</p>

    <div class="controles">
      <button @click="reproducir">▶️ Reproducir</button>
      <button @click="siguiente">⏭ Siguiente</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const reproduciendo = ref(true) // estado inicial: reproduciendo
const estado = ref('Reproduciendo')

const reproducir = () => {
  reproduciendo.value = true
  estado.value = 'Reproduciendo'
}

const siguiente = () => {
  reproduciendo.value = true
  estado.value = 'Reproduciendo'
}
</script>

<style scoped>
.card {
  padding: 12px;
  background: #d1c4e9;
  border-radius: 10px;
  text-align: center;
  flex: 1 1 120px;
}
.emoji {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
}
.controles {
  display: flex;
  justify-content: center;
  gap: 2vw;
  margin-top: 10px;
}
button {
  padding: 2px 4px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background: #7b1fa2;
  color: #fff;
  font-size: 12px;
  padding: 0.5rem 1.2rem;
}
button:hover {
  opacity: 0.85;
}
</style>
