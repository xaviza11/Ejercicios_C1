<template>
  <div class="character-list-container">
    <h1>Personajes de Harry Potter</h1>

    <div v-if="loading" class="loading">Cargando personajes...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="characters-grid">
      <div v-for="char in characters" :key="char.index" class="character-card">
        <img :src="char.image" :alt="char.fullname" class="character-image"/>
        <h2 class="character-name">{{ char.fullname }}</h2>
        <p v-if="char.nickname"><strong>Apodo:</strong> {{ char.nickname }}</p>
        <p><strong>Casa:</strong> {{ char.hogwartsHouse }}</p>
        <p><strong>Interpretado por:</strong> {{ char.interpretedBy }}</p>
        <p v-if="char.children && char.children.length"><strong>Hijos:</strong> {{ char.children.join(', ') }}</p>
        <p><strong>Fecha de nacimiento:</strong> {{ char.birthDate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Character {
  fullname: string
  nickname?: string
  hogwartsHouse: string
  interpretedBy: string
  children?: string[]
  image: string
  birthDate: string
  index: number
}

const characters = ref<Character[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchCharacters() {
  try {
    const res = await fetch('https://potterapi-fedeperin.vercel.app/en/characters')
    if (!res.ok) throw new Error('Error al obtener los personajes')
    const data = await res.json()
    characters.value = data
  } catch (err: any) {
    error.value = err.message || 'Error desconocido'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCharacters()
})
</script>

<style scoped>
.character-list-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Poppins', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.loading, .error {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.character-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.character-image {
  width: 150px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.character-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

p {
  font-size: 0.9rem;
  color: #333;
  margin: 0.2rem 0;
  text-align: center;
}
</style>
