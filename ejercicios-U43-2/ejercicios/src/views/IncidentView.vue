<template>
  <div class="panel">
    <IncidentForm />
  </div>
</template>

<script setup lang="ts">
import { IncidentForm } from '../components/Form';
</script>

<style scoped>
.panel {
  width: 80vw;
  max-width: 700px;
  margin: 50px auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
}
</style>
