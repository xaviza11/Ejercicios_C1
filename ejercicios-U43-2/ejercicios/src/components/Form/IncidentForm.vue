<template>
  <div class="incident-container">
    <h2>Crear incidencia</h2>

    <form @submit.prevent="onSubmit" class="incident-form">
      <!-- ASUNTO -->
      <div class="field">
        <label>Asunto</label>
        <input v-model="form.asunto" @input="validateField('asunto')" />
        <div class="error">{{ errors.asunto }}</div>
      </div>

      <!-- EMAIL -->
      <div class="field">
        <label>Correo electrónico</label>
        <input v-model="form.email" @input="validateField('email')" />
        <div class="error">{{ errors.email }}</div>
      </div>

      <!-- CATEGORÍA -->
      <div class="field">
        <label>Categoría</label>
        <select v-model="form.categoria" @change="onCategoryChange">
          <option value="">Seleccione una opción</option>
          <option value="tecnica">Error técnico</option>
          <option value="consulta">Consulta</option>
          <option value="facturacion">Facturación</option>
        </select>
        <div class="error">{{ errors.categoria }}</div>
      </div>

      <!-- NÚMERO DE FACTURA -->
      <div v-if="form.categoria === 'facturacion'" class="field">
        <label>Número de factura</label>
        <input v-model="form.factura" @input="validateField('factura')" />
        <div class="error">{{ errors.factura }}</div>
      </div>

      <!-- VERSION DEL PROGRAMA -->
      <div v-if="form.categoria === 'tecnica'" class="field">
        <label>Versión del programa</label>
        <input v-model="form.version" @input="validateField('version')" />
        <div class="error">{{ errors.version }}</div>
      </div>

      <!-- DETALLE -->
      <div class="field">
        <label>Detalle de la incidencia</label>
        <textarea
          rows="4"
          v-model="form.detalle"
          @input="validateField('detalle')"
        ></textarea>
        <div class="error">{{ errors.detalle }}</div>
      </div>

      <!-- BOTÓN -->
      <button type="submit" :disabled="!formValid">Crear incidencia</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";

const form = reactive({
  asunto: "",
  email: "",
  categoria: "",
  factura: "",
  version: "",
  detalle: "",
});

const errors = reactive({
  asunto: "",
  email: "",
  categoria: "",
  factura: "",
  version: "",
  detalle: "",
});

function validateField(field: string) {
  switch (field) {
    case "asunto":
      if (!form.asunto.trim()) errors.asunto = "El asunto es obligatorio";
      else if (form.asunto.length < 5)
        errors.asunto = "Debe tener al menos 5 caracteres";
      else if (form.asunto.length > 100)
        errors.asunto = "Máximo 100 caracteres";
      else errors.asunto = "";
      break;

    case "email":
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!form.email.trim()) errors.email = "El correo es obligatorio";
      else if (!regex.test(form.email))
        errors.email = "Debe ser un correo válido";
      else errors.email = "";
      break;

    case "categoria":
      if (!form.categoria) errors.categoria = "Seleccione una categoría";
      else errors.categoria = "";
      break;

    case "factura":
      if (form.categoria === "facturacion") {
        if (!form.factura)
          errors.factura = "El número de factura es obligatorio";
        else if (!/^[a-zA-Z0-9]{6}$/.test(form.factura))
          errors.factura = "Debe ser alfanumérico de 6 caracteres";
        else errors.factura = "";
      } else errors.factura = "";
      break;

    case "version":
      if (form.categoria === "tecnica") {
        if (!form.version) errors.version = "La versión es obligatoria";
        else if (!/^[0-9]+$/.test(form.version))
          errors.version = "Solo números";
        else errors.version = "";
      } else errors.version = "";
      break;

    case "detalle":
      if (!form.detalle.trim())
        errors.detalle = "El detalle es obligatorio";
      else if (form.detalle.length < 20)
        errors.detalle = "Debe tener al menos 20 caracteres";
      else errors.detalle = "";
      break;
  }
}

function onCategoryChange() {
  validateField("categoria");

  if (form.categoria !== "facturacion") form.factura = "";
  if (form.categoria !== "tecnica") form.version = "";

  validateField("factura");
  validateField("version");
}

const formValid = computed(() => {
  return (
    Object.values(errors).every((e) => e === "") &&
    form.asunto &&
    form.email &&
    form.categoria &&
    form.detalle &&
    (form.categoria !== "facturacion" || form.factura) &&
    (form.categoria !== "tecnica" || form.version)
  );
});

function onSubmit() {
  console.log("Incidencia enviada:", { ...form });
  alert("Datos enviados (ver consola)");
}
</script>

<style scoped>
.incident-container {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.incident-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

label {
  font-weight: 600;
  color: #444;
}

input,
textarea,
select {
  padding: 0.65rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 3px #3498db66;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: #3498db;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  align-self: flex-start;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background: #2980b9;
  transform: scale(1.02);
}

.error {
  color: #e74c3c;
  font-size: 0.85rem;
  height: 16px;
}

/* RESPONSIVE */
@media (max-width: 700px) {
  .incident-container {
    padding: 1.5rem;
  }
  h2 {
    font-size: 1.3rem;
  }
  button {
    width: 100%;
  }
}

</style>
