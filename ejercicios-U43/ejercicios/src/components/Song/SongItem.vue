<template>
  <li>
    <div class="song-header">
      <h3>{{ song.title }}</h3>
      <span v-if="song.isTopHit" class="hit-badge">Éxito</span>
    </div>
    <p>Artista: {{ song.artist }}</p>
    <p>Duración: {{ song.duration }}</p>
  </li>
</template>

<script setup lang="ts">
import type { Song } from '../../models/song.interface'

const props = defineProps<{ song: Song }>()
</script>

<style scoped>
li {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #f9f9f9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

li:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.song-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.hit-badge {
  background-color: #2ecc71;
  color: white;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
}

p {
  margin: 0;
  font-size: 0.95rem;
  color: #555;
}

@media (max-width: 500px) {
  li {
    padding: 0.8rem;
  }

  h3 {
    font-size: 1rem;
  }

  p {
    font-size: 0.9rem;
  }

  .hit-badge {
    font-size: 0.75rem;
    padding: 0.15rem 0.4rem;
  }
}
</style>
