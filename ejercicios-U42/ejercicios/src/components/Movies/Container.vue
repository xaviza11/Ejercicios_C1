<template>
  <div class="container">
    <div class="header">
      <button @click="toggleFiltro">{{ botonTexto }}</button>
      <p class="contador">{{ contadorTexto }}</p>
    </div>
    <ul class="movies-list">
      <li v-for="movie in peliculasFiltradas" :key="movie.id">
        <img :src="movie.image" :alt="movie.name" class="poster" />
        <h3>{{ movie.name }} ({{ movie.year }})</h3>
        <p>{{ movie.description }}</p>
        <p>Géneros: {{ movie.genres.join(', ') }}</p>
        <p>Rating: {{ movie.rating }}/5</p>
        <p v-if="movie.inTheaters">🎬 En cines</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Movie } from '../../models/movie.interface'
import moviesData from '../../assets/data/movies.json'

const peliculas = ref<Movie[]>([])
const mostrarEnCines = ref(false)

onMounted(() => {
  peliculas.value = moviesData as Movie[]
})

const peliculasFiltradas = computed(() =>
  mostrarEnCines.value ? peliculas.value.filter((p) => p.inTheaters) : peliculas.value,
)

const toggleFiltro = () => {
  mostrarEnCines.value = !mostrarEnCines.value
}

const botonTexto = computed(() => (mostrarEnCines.value ? 'Mostrar todas' : 'En cines'))

const contadorTexto = computed(() => {
  if (mostrarEnCines.value) {
    return `Mostrando ${peliculasFiltradas.value.length} películas en cines (de ${peliculas.value.length} totales)`
  }
  return `Mostrando un total de ${peliculas.value.length} películas`
})
</script>

<style scoped>
.container {
  background-color: white;
  width: 90vw;
  padding: 4vh;
  border-radius: 15px;
  text-align: center;
}

/* ======== Estilos adicionales para Movies ======== */

/* Header con botón y contador */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header button {
  padding: 0rem 1.2rem;
  border-radius: 15px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: 0.3s ease;
  border: 0;
  padding: 0.5rem 1.2rem;
}

.header button:hover {
  background-color: #2c80b8;
}

.contador {
  font-size: 0.9rem;
  color: #555;
}

.movies-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.movies-list li {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: left;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.movies-list li:hover {
  transform: scale(1.01);
}

.poster {
  width: 100%;
  max-width: 200px;
  border-radius: 10px;
  margin: 0 auto 1rem auto;
  display: block;
}

.movies-list h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.2rem;
}

.movies-list p {
  font-size: 0.95rem;
  color: #444;
}
</style>
