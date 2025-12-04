<template>
  <div class="student-list container">
    <h2>Listado de Alumnos</h2>
    <ul class="list-group">
      <li v-for="student in students" :key="student.id" class="list-group-item">
        <span class="student-name">{{ student.name }}</span>
        <router-link :to="`/students/${student.id}`" class="btn btn-detail">Ver detalle</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { students } from '../assets/data/students';
</script>

<style scoped>
.student-list {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.list-group {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  margin-bottom: 0.6rem;
  border-radius: 8px;
  background: #f8f9fa;
  transition: background 0.2s ease;
}

.list-group-item:hover {
  background: #e2e6ea;
}

.student-name {
  font-weight: 600;
  color: #2c3e50;
}

.btn-detail {
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  font-size: 0.85rem;
  transition: background 0.2s ease, transform 0.1s ease;
}

.btn-detail:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

@media (max-width: 500px) {
  .list-group-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .btn-detail {
    width: 100%;
    text-align: center;
  }
}
</style>
