<template>
  <div class="container mt-4">
    <h2>Panel de administración</h2>
    <p>Bienvenido, Admin.</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
}

h2 {
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  margin: 0;
  color: #555;
}

@media (max-width: 500px) {
  .container {
    width: 90%;
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.95rem;
  }
}
</style>
