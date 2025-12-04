<template>
  <div>
    <button @click="toggleTopHits">{{ buttonText }}</button>
    <p>Mostrando {{ filteredSongs.length }} / Total: {{ songs.length }}</p>

    <ul>
      <SongItem v-for="song in filteredSongs" :key="song.id" :song="song" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SongItem from './SongItem.vue'
import type { Song } from '../../models/song.interface'
import songsData from '../../assets/data/songs.json'

const songs = ref<Song[]>([])
const showTopHits = ref(false)

onMounted(() => {
  songs.value = songsData as Song[]
})

const filteredSongs = computed(() =>
  showTopHits.value ? songs.value.filter(s => s.isTopHit) : songs.value
)

const toggleTopHits = () => {
  showTopHits.value = !showTopHits.value
}

const buttonText = computed(() => (showTopHits.value ? 'Mostrar todas' : 'Éxitos'))
</script>

<style scoped>
div {
  width: 80%;
  max-width: 800px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: sans-serif;
  background-color: white;
  padding: 4vh;
  border-radius: 15px;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  background-color: #3498db;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  align-self: flex-start;
}

button:hover {
  background-color: #2c80b8;
  transform: scale(1.03);
}

p {
  margin: 0;
  font-size: 0.95rem;
  color: #555;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 500px) {
  div {
    width: 95%;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  p {
    font-size: 0.85rem;
  }
}
</style>
