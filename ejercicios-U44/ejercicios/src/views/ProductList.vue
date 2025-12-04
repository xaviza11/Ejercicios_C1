<template>
  <div class="results-container">
    <h2>Productos encontrados</h2>

    <ul class="products-list">
      <li v-for="p in productosFiltrados" :key="p.id" class="product-item">
        {{ p.name }} - {{ p.price }} €
      </li>
    </ul>

    <button class="back-btn" @click="volver">Volver</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

interface Product {
  id: number;
  name: string;
  price: number;
}

const productos: Product[] = [
  { id: 1, name: "Manzana", price: 1.2 },
  { id: 2, name: "Plátano", price: 0.8 },
  { id: 3, name: "Pera", price: 1.5 },
];

const route = useRoute();
const router = useRouter();

const query = ref(String(route.query.q || ""));

const productosFiltrados = computed(() =>
  productos.filter(p =>
    p.name.toLowerCase().includes(query.value.toLowerCase())
  )
);

function volver() {
  router.push({ path: "/", query: { q: query.value } });
}
</script>

<style scoped>
.results-container {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  font-family: Arial, sans-serif;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.products-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-item {
  background: #f8f8f8;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  text-align: left;
  transition: background-color 0.2s ease;
}

.product-item:hover {
  background-color: #e2f0ff;
}

.back-btn {
  margin-top: 20px;
  padding: 0.65rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.back-btn:hover {
  background-color: #2d86c4;
  transform: scale(1.03);
}

@media (max-width: 500px) {
  .results-container {
    width: 90%;
    padding: 1.5rem;
  }

  .back-btn {
    width: 100%;
  }
}
</style>
