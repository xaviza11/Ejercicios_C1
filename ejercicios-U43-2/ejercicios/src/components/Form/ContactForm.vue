<template>
  <div class="contact-container">
    <h2>Formulario de Contacto</h2>

    <form @submit.prevent="onSubmit" class="contact-form">
      <div class="field">
        <label>Nombre completo</label>
        <input v-model="nombre" type="text" @input="validarNombre" />
        <div class="error">{{ errores.nombre }}</div>
      </div>

      <div class="field">
        <label>Correo electrónico</label>
        <input v-model="email" type="email" @input="validarEmail" />
        <div class="error">{{ errores.email }}</div>
      </div>

      <div class="field">
        <label>Asunto</label>
        <input v-model="asunto" type="text" @input="validarAsunto" />
        <div class="error">{{ errores.asunto }}</div>
      </div>

      <div class="field">
        <label>Mensaje</label>
        <textarea v-model="mensaje" rows="4" @input="validarMensaje"></textarea>
        <div class="error">{{ errores.mensaje }}</div>
      </div>

      <button type="submit" :disabled="!formularioValido">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

const nombre = ref("");
const email = ref("");
const asunto = ref("");
const mensaje = ref("");

const errores = reactive({
  nombre: "",
  email: "",
  asunto: "",
  mensaje: "",
});

function validarNombre() {
  if (!nombre.value.trim()) {
    errores.nombre = "El nombre es obligatorio";
  } else if (nombre.value.trim().length < 3) {
    errores.nombre = "Debe tener al menos 3 caracteres";
  } else if (nombre.value.trim().length > 100) {
    errores.nombre = "Máximo 100 caracteres";
  } else {
    errores.nombre = "";
  }
}

function validarEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value.trim()) {
    errores.email = "El correo es obligatorio";
  } else if (!regex.test(email.value)) {
    errores.email = "Debe ser un correo válido";
  } else {
    errores.email = "";
  }
}

function validarAsunto() {
  if (!asunto.value.trim()) {
    errores.asunto = "El asunto es obligatorio";
  } else {
    errores.asunto = "";
  }
}

function validarMensaje() {
  if (!mensaje.value.trim()) {
    errores.mensaje = "El mensaje es obligatorio";
  } else if (mensaje.value.trim().length < 20) {
    errores.mensaje = "Debe tener al menos 20 caracteres";
  } else {
    errores.mensaje = "";
  }
}

const formularioValido = computed(() => {
  return (
    errores.nombre === "" &&
    errores.email === "" &&
    errores.asunto === "" &&
    errores.mensaje === "" &&
    nombre.value.trim() &&
    email.value.trim() &&
    asunto.value.trim() &&
    mensaje.value.trim()
  );
});

function onSubmit() {
  console.log("Datos enviados:", {
    nombre: nombre.value,
    email: email.value,
    asunto: asunto.value,
    mensaje: mensaje.value,
  });
  alert("Datos enviados (ver consola)");
}
</script>

<style scoped>
.contact-container {
  max-width: 500px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

label {
  font-weight: 600;
  color: #444;
}

input,
textarea {
  padding: 0.65rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 3px #3498db66;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.error {
  color: #e74c3c;
  font-size: 0.8rem;
  height: 14px;
}

button {
  padding: 0.75rem;
  border: none;
  background: #3498db;
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

button:hover:not(:disabled) {
  background: #2d86c4;
  transform: scale(1.02);
}

button:disabled {
  background: #ccc;
  cursor: default;
}

@media (max-width: 600px) {
  .contact-container {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  button {
    font-size: 0.95rem;
  }
}
</style>
