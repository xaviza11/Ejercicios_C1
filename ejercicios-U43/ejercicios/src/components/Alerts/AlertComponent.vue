<template>
  <div v-if="visible" :class="type">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { AlertProps } from '../../models/alert-props.interface'

const props = defineProps<AlertProps>()
const emit = defineEmits(['close'])

const visible = ref(true)

onMounted(() => {
  const tiempo = props.duration ?? 2000
  setTimeout(() => {
    visible.value = false
    emit('close')
  }, tiempo)
})
</script>

<style scoped>
div {
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-weight: 500;
  border: 1px solid transparent;
}

.success {
  background-color: #e8f9e8;
  border-color: #3cb13c;
  color: #2a7f2a;
}

.warning {
  background-color: #fff8e5;
  border-color: #e0b500;
  color: #8a7200;
}

.error {
  background-color: #fdeaea;
  border-color: #d9534f;
  color: #a83632;
}

.info {
  background-color: #e9f2ff;
  border-color: #4e8fe2;
  color: #2e65a3;
}

@media (max-width: 700px) {
  div {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
