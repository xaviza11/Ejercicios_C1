<template>
  <div class="openlibrary-container">
    <h1>Búsqueda de Libros en OpenLibrary</h1>

    <div class="search-bar">
      <input
        type="text"
        v-model="query"
        @keyup.enter="searchBooks"
        placeholder="Escribe el título del libro y presiona Enter"
      />
      <button @click="searchBooks">Buscar</button>
    </div>

    <div v-if="loading" class="loading">Buscando libros...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="books.length === 0" class="no-results">No se encontraron libros</div>

    <div v-else class="books-grid">
      <div v-for="book in books" :key="book.key" class="book-card">
        <img
          v-if="book.cover_i"
          :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
          alt="Portada"
          class="book-cover"
        />
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-author"><strong>Autor:</strong> {{ book.author_name?.[0] || 'Desconocido' }}</p>
        <p class="book-year"><strong>Año:</strong> {{ book.first_publish_year || 'Desconocido' }}</p>
        <a
          class="openlink-button"
          :href="`https://openlibrary.org${book.key}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver en OpenLibrary
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_KEY_METEO

interface Book {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
  cover_i?: number
}

const query = ref('harry potter')
const books = ref<Book[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function searchBooks() {
  if (!query.value) return

  loading.value = true
  error.value = null
  books.value = []

  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query.value)}&fields=*,availability&limit=10`
    )
    if (!res.ok) throw new Error('Error al buscar libros en OpenLibrary')
    const data = await res.json()
    books.value = data.docs
  } catch (err: any) {
    error.value = err.message || 'Error desconocido'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.openlibrary-container {
  max-width: 1000px;
  margin: 2rem auto;
  font-family: 'Poppins', sans-serif;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.search-bar input {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  flex: 1;
}

.search-bar button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  background-color: #2c3e50;
  color: white;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #34495e;
}

.loading, .error, .no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.book-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.book-cover {
  width: 150px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.book-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

.book-author, .book-year {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.3rem;
  text-align: center;
}

.openlink-button {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.5rem 0.8rem;
  background-color: #2c3e50;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  transition: background 0.2s ease;
}

.openlink-button:hover {
  background-color: #34495e;
}
</style>
