<template>
  <div class="student-detail-container">
    <h2>Detalle del Alumno</h2>
    <div v-if="student" class="student-card">
      <p><strong>Nombre:</strong> {{ student.name }}</p>
      <p><strong>Email:</strong> {{ student.email }}</p>
      <p><strong>Curso:</strong> {{ student.course }}</p>
      <router-link to="/" class="btn btn-back">Volver al listado</router-link>
    </div>
    <div v-else class="student-card">
      <p>Alumno no encontrado.</p>
      <router-link to="/" class="btn btn-back">Volver al listado</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { students } from '../assets/data/students'
import type { Student } from '../models/student.interface'

const route = useRoute()
const studentId = Number(route.params.id)
const student: Student | undefined = students.find((s) => s.id === studentId)
</script>

<style scoped>
.student-detail-container {
  max-width: 500px;
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

.student-card {
  padding: 1rem;
  border-radius: 10px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

p {
  font-size: 1rem;
  color: #2c3e50;
  margin: 0;
}

.btn-back {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: #6c757d;
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  width: fit-content;
  transition: background 0.2s ease, transform 0.1s ease;
}

.btn-back:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}

@media (max-width: 500px) {
  .student-detail-container {
    width: 90%;
    padding: 1rem;
  }

  .btn-back {
    width: 100%;
    text-align: center;
  }
}
</style>
