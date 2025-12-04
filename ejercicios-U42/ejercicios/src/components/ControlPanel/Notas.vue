<template>
  <div class="notas">
    <h2>Notas</h2>
    <div class="nuevo">
      <input type="text" v-model="texto" placeholder="Escribe una nota..." />
      <button @click="agregarNota">Añadir</button>
    </div>
    <ul>
      <li v-for="(nota, index) in notas" :key="index">
        <span>{{ nota.texto }} ({{ nota.hora }})</span>
        <button @click="eliminarNota(index)">Eliminar</button>
      </li>
    </ul>
    <p>Total de notas: {{ notas.length }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Nota {
  texto: string
  hora: string
}

const texto = ref('')
const notas = ref<Nota[]>([])

const agregarNota = () => {
  if (!texto.value.trim()) return
  notas.value.push({ texto: texto.value.trim(), hora: new Date().toLocaleTimeString() })
  texto.value = ''
}

const eliminarNota = (index: number) => {
  notas.value.splice(index, 1)
}
</script>

<style scoped>
.notas {
  background-color: white;
  width: 90vw;
  padding: 4vh;
  border-radius: 15px;
}

.nuevo {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.nuevo input {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 1rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.nuevo input:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
}

.nuevo button {
  border: none;
  background-color: #4a90e2;
  color: white;
  border-radius: 15px;
  cursor: pointer;
  padding: 0rem 1.8rem;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.nuevo button:hover {
  background-color: #357ab7;
}

.nuevo button:active {
  transform: scale(0.97);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background: #f5f5f5;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  background-color: #ff5f5f;
  border: none;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

li button:hover {
  background-color: #d94b4b;
}

li button:active {
  transform: scale(0.95);
}

p {
  margin-top: 1rem;
  font-weight: 600;
}

@media (max-width: 999px) {
  .nuevo {
    flex-direction: column;
  }
}
</style>
