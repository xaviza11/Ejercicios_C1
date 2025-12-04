<template>
  <div class="card">
    <span class="emoji">🚗</span>
    <p>Última carga: {{ fechaUltimaCarga }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const diasAleatorios = Math.floor(Math.random() * 10) + 1

const fecha = new Date()
fecha.setDate(fecha.getDate() - diasAleatorios)

const fechaUltimaCarga = ref(
  `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth()+1).toString().padStart(2,'0')}/${fecha.getFullYear()}`
)
</script>

<style scoped>
.card {
  padding: 12px;
  background: #ffe0b2;
  border-radius: 10px;
  text-align: center;
  flex: 1 1 150px;
}
.emoji {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
}
</style>
