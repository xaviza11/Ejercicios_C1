<template>
  <div class="search-container">
    <h2>Buscar Productos</h2>
    <form @submit.prevent="buscar" class="search-form">
      <input
        v-model="query"
        type="text"
        placeholder="Nombre del producto"
        class="search-input"
      />
      <button type="submit" class="search-btn">Buscar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const query = ref("");
const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (route.query.q) query.value = String(route.query.q);
});

function buscar() {
  router.push({ path: "/products", query: { q: query.value } });
}
</script>

<style scoped>
.search-container {
  max-width: 450px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.search-form {
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
}

.search-input {
  padding: 0.65rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 3px #3498db66;
}

.search-btn {
  padding: 0.65rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.search-btn:hover {
  background-color: #2d86c4;
  transform: scale(1.03);
}

@media (max-width: 500px) {
  .search-container {
    width: 90%;
    padding: 1.5rem;
  }

  .search-btn {
    width: 100%;
  }
}
</style>
