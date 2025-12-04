<template>
  <div class="room-section">
    <h2>{{ title }}</h2>
    <div class="room-content">
      <div class="slot">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
.room-section {
  width: 90vw;
  background-color: white;
  border-radius: 15px;
  text-align: center;
}

h2 {
  margin-top: 2vh;
}

.room-content {
  padding: 4vh;
}

.slot {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>
