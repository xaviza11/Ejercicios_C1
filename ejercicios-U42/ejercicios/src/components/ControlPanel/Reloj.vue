<template>
  <div class="reloj">
    <h2>Hora actual</h2>
    <p>{{ hora }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const hora = ref<string>(new Date().toLocaleTimeString())

let intervalo: number

onMounted(() => {
  intervalo = window.setInterval(() => {
    hora.value = new Date().toLocaleTimeString()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalo)
})
</script>

<style scoped>
.reloj {
  background-color: white;
  width: 90vw;
  padding: 4vh;
  border-radius: 15px;
}
</style>
