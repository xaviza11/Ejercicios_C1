<template>
  <div class="card">
    <span class="emoji" @click="toggle">💡</span>
    <p>Luces: {{ encendido ? 'On' : 'Off' }}</p>

    <div v-if="encendido" class="intensidad">
      <label>Intensidad: {{ intensidad }}%</label>
      <input type="range" min="0" max="100" v-model="intensidad" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const encendido = ref(false)
const intensidad = ref(50)

const toggle = () => encendido.value = !encendido.value
</script>

<style scoped>
.card {
  padding: 12px;
  background: #fff9c4;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  flex: 1 1 150px;
}
.emoji {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
}
.intensidad {
  margin-top: 10px;
}
input[type="range"] {
  width: 100%;
}
</style>
