<template>
  <nav class="navbar">
    <RouterLink to="/">Alerta</RouterLink>
    <RouterLink to="/signUp">SignUp</RouterLink>
    <RouterLink to="/songList">Songs</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar {
    height: 10vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw
}

.navbar .router-link-exact-active {
  background: #2ecc71;
  color: white;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(46, 204, 113, 0.5);
  transform: scale(1.05);
  border-radius: 15px;
  padding: 0rem 1.2rem;
}
</style>
