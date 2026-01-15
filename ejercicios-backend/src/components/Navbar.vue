<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="nav-logo">Harry Potter App</router-link>
      <ul class="nav-links">
        <li>
          <router-link to="/" class="nav-link" exact-active-class="active-link">Libros</router-link>
        </li>
        <li>
          <router-link to="/characters" class="nav-link" exact-active-class="active-link">Personajes</router-link>
        </li>
        <li>
          <router-link to="/openlibrary" class="nav-link" exact-active-class="active-link">OpenLibrary</router-link>
        </li>
        <li>
          <router-link to="/weather" class="nav-link" exact-active-class="active-link">Estaciones</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Sin lógica adicional por ahora
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 0.8rem 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.navbar-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  color: #f3f6ff;
  font-weight: 700;
  font-size: 1.2rem;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #f3f6ff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #ffd700;
}

.active-link {
  border-bottom: 2px solid #ffd700;
  padding-bottom: 2px;
}
</style>
