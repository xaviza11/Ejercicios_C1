<template>
  <div class="card" @click="toggle">
    <span class="emoji">🪟</span>
    <p>Persianas: {{ abiertas ? 'Abiertas' : 'Cerradas' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const abiertas = ref(false)
const toggle = () => abiertas.value = !abiertas.value
</script>

<style scoped>
.card {
  padding: 12px;
  background: #b3e5fc;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  flex: 1 1 120px;
  color: black
}
.emoji {
  font-size: 28px;
}
</style>
