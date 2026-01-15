<template>
  <div class="book-list-container">
    <h1>Libros de Harry Potter</h1>

    <div v-if="loading" class="loading">Cargando libros...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else class="books-grid">
      <div v-for="book in books" :key="book.number" class="book-card">
        <img :src="book.cover" :alt="book.title" class="book-cover"/>
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-description">{{ book.description }}</p>
        <p class="book-pages"><strong>Páginas:</strong> {{ book.pages }}</p>
        <p class="book-release"><strong>Fecha de lanzamiento:</strong> {{ book.releaseDate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Book {
  number: number
  title: string
  originalTitle: string
  releaseDate: string
  description: string
  pages: number
  cover: string
  index: number
}

const books = ref<Book[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchBooks() {
  try {
    const res = await fetch('https://potterapi-fedeperin.vercel.app/en/books')
    if (!res.ok) throw new Error('Error al obtener los libros')
    const data = await res.json()
    books.value = data
  } catch (err: any) {
    error.value = err.message || 'Error desconocido'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped>
.book-list-container {
  max-width: 1000px;
  margin: 2rem auto;
  font-family: 'Poppins', sans-serif;
  padding: 1rem;
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
  margin-bottom: 1rem;
  border-radius: 8px;
}

.book-title {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
}

.book-description {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.5rem;
  text-align: justify;
}

.book-pages, .book-release {
  font-size: 0.85rem;
  color: #666;
}
</style>
