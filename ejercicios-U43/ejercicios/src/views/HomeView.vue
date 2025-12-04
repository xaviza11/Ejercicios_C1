<template>
  <div class="panel">
    <div class="buttons">
      <button @click="mostrar('success', 'Todo correcto!')">Correcto</button>
      <button @click="mostrar('warning', 'Atención, revisa esto.')">Aviso</button>
      <button @click="mostrar('error', 'Ha ocurrido un error.')">Error</button>
    </div>

    <div class="alertWrapper">
    <AlertComponent
      v-if="alertVisible"
      :message="alertMessage"
      :type="alertType"
      :duration="2000"
      @close="alertVisible = false"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AlertComponent } from '../components/Alerts'

const alertVisible = ref(false)
const alertMessage = ref('')
const alertType = ref<'success' | 'warning' | 'error' | 'info'>()

const mostrar = (type: any, msg: string) => {
  alertType.value = type
  alertMessage.value = msg
  alertVisible.value = true
}
</script>

<style scope>
.panel {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  width: 80vw;
  min-height: 80vh;
  border-radius: 15px;
  margin: 50px auto;
  color: black;
  background-color: white;
}

.buttons {
  display: flex;
  gap: 4vw;
}

.buttons button {
  padding: 0.4rem 1.5rem;
  border-radius: 15px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.buttons button:hover {
  transform: scale(1.05);
}

.buttons button:nth-child(1) {
  background-color: #2ecc71; 
  color: white;
}

.buttons button:nth-child(1):hover {
  background-color: #27ae60;
}

.buttons button:nth-child(2) {
  background-color: #f1c40f;
  color: #333;
}

.buttons button:nth-child(2):hover {
  background-color: #d4ac0d;
}

.buttons button:nth-child(3) {
  background-color: #e74c3c;
  color: white;
}

.buttons button:nth-child(3):hover {
  background-color: #c0392b;
}

.alertWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>

//? Estos estilos estan clonados, pero lo dejo así porque en el ejercicio dicen que tienen que estaren scope, 
//? No comprendo si lo especifica porque quiere que cada componente tenga sus propios estilos. 
//? Lo normal sería guardarlo en un archivo css o usar module en lugar de scope.s
