<template>
  <div class="panel">
    <Header />
    <Container />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import {Header, Container, Footer} from '../components/Movies'
</script>

<style>
.panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 800px;
  margin: 50px auto;
  color: black
} 
</style>

//? Estos estilos estan clonados, pero lo dejo así porque en el ejercicio dicen que tienen que estar en scope,
//? No comprendo si lo especifica porque quiere que cada componente tenga sus propios estilos.
//? Lo normal sería guardarlo en un archivo css o usar module en lugar de scope.