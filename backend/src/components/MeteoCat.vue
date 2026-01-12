<template>
  <div class="weather-container">
    <h1>Estaciones Meteorológicas de Cataluña</h1>

    <div class="buttons">
      <button @click="loadStations">Cargar estaciones</button>
      <button @click="clearStations">Limpiar pantalla</button>
    </div>

    <div class="counter" v-if="stations.length">
      <strong>Total de estaciones:</strong> {{ stations.length }}
    </div>

    <div v-if="loading" class="loading">Cargando estaciones...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-if="stations.length" class="stations-grid">
      <div v-for="station in stations" :key="station.idema" class="station-card">
        <h2>{{ station.nom }}</h2>
        <p><strong>ID:</strong> {{ station.idema }}</p>
        <p><strong>Comarca:</strong> {{ station.comarca }}</p>
        <p><strong>Municipio:</strong> {{ station.municipi }}</p>
        <p><strong>Latitud:</strong> {{ station.latitud }}</p>
        <p><strong>Longitud:</strong> {{ station.longitud }}</p>
        <p><strong>Altitud:</strong> {{ station.altitud }} m</p>
        <p><strong>Tipus:</strong> {{ station.tipus }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Station {
  idema: string
  nom: string
  comarca: string
  municipi: string
  latitud: number
  longitud: number
  altitud: number
  tipus: string
}

const stations = ref<Station[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const API_URL = 'https://api.meteo.cat/referencia/v1/municipis'
const API_KEY = import.meta.env.VITE_KEY_METEO

async function loadStations() {
  loading.value = true
  error.value = null
  stations.value = []

  try {
    const res = await fetch(API_URL, {
        headers: {
        'X-Api-Key': API_KEY
      }
    })
    if (!res.ok) throw new Error('Error al cargar las estaciones')
    const data = await res.json()
    stations.value = data
  } catch (err: any) {
    error.value = err.message || 'Error desconocido'
  } finally {
    loading.value = false
  }
}

function clearStations() {
  stations.value = []
  error.value = null
}
</script>

<style scoped>
.weather-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Poppins', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background-color: #2c3e50;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background-color: #34495e;
}

.counter {
  text-align: center;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.loading, .error {
  text-align: center;
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1rem;
}

.stations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.station-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}
.station-card h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}
.station-card p {
  font-size: 0.85rem;
  margin: 0.2rem 0;
}
</style>
