<template>
  <div class="order-container">
    <h2>Gestión de pedidos</h2>

    <form @submit.prevent="onSubmit">

      <h3>Datos del cliente</h3>

      <div class="field">
        <label>Nombre completo</label>
        <input v-model="cliente.nombre" @input="validarCliente" />
        <div class="error">{{ erroresCliente.nombre }}</div>
      </div>

      <div class="field">
        <label>Correo electrónico</label>
        <input v-model="cliente.email" type="email" @input="validarCliente" />
        <div class="error">{{ erroresCliente.email }}</div>
      </div>

      <div class="field">
        <label>Método de pago</label>
        <select v-model="cliente.metodoPago" @change="validarCliente">
          <option value="">Seleccione...</option>
          <option value="paypal">PayPal</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia</option>
        </select>
        <div class="error">{{ erroresCliente.metodoPago }}</div>
      </div>

      <h3>Líneas de productos</h3>

      <div v-for="(producto, index) in productos" :key="index" class="producto">
        <h4>Producto {{ index + 1 }}</h4>

        <div class="field">
          <label>Nombre del producto</label>
          <input v-model="producto.nombre" @input="validarProducto(index)" />
          <div class="error">{{ erroresProductos[index].nombre }}</div>
        </div>

        <div class="field">
          <label>Cantidad</label>
          <input type="number" v-model.number="producto.cantidad" @input="validarProducto(index)" />
          <div class="error">{{ erroresProductos[index].cantidad }}</div>
        </div>

        <div class="field">
          <label>Precio</label>
          <input type="number" v-model.number="producto.precio" @input="validarProducto(index)" />
          <div class="error">{{ erroresProductos[index].precio }}</div>
        </div>

        <button
          type="button"
          @click="eliminarProducto(index)"
          :disabled="productos.length === 1"
        >
          Eliminar producto
        </button>

        <hr />
      </div>

      <button type="button" @click="agregarProducto">
        Añadir producto
      </button>

      <br /><br />

      <button type="submit" :disabled="!formularioValido">
        Enviar pedido
      </button>

    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

const cliente = reactive({
  nombre: "",
  email: "",
  metodoPago: "",
});

const erroresCliente = reactive({
  nombre: "",
  email: "",
  metodoPago: "",
});

function validarCliente() {
  if (!cliente.nombre.trim()) {
    erroresCliente.nombre = "El nombre es obligatorio";
  } else if (cliente.nombre.length < 3) {
    erroresCliente.nombre = "Debe tener al menos 3 caracteres";
  } else if (cliente.nombre.length > 100) {
    erroresCliente.nombre = "Máximo 100 caracteres";
  } else {
    erroresCliente.nombre = "";
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cliente.email.trim()) {
    erroresCliente.email = "El correo es obligatorio";
  } else if (!regex.test(cliente.email)) {
    erroresCliente.email = "Correo inválido";
  } else {
    erroresCliente.email = "";
  }

  if (!cliente.metodoPago) {
    erroresCliente.metodoPago = "Debe seleccionar un método de pago";
  } else {
    erroresCliente.metodoPago = "";
  }
}

const productos = ref([
  { nombre: "", cantidad: null, precio: null },
]);

const erroresProductos = ref([
  { nombre: "", cantidad: "", precio: "" },
]);

function validarProducto(index) {
  const p = productos.value[index];
  const e = erroresProductos.value[index];

  if (!p.nombre.trim()) e.nombre = "El nombre es obligatorio";
  else if (p.nombre.length < 3) e.nombre = "Mínimo 3 caracteres";
  else if (p.nombre.length > 100) e.nombre = "Máximo 100 caracteres";
  else e.nombre = "";

  if (!p.cantidad) e.cantidad = "Cantidad requerida";
  else if (p.cantidad <= 0) e.cantidad = "Debe ser mayor a 0";
  else e.cantidad = "";

  if (!p.precio) e.precio = "Precio requerido";
  else if (p.precio <= 0) e.precio = "Debe ser mayor a 0";
  else e.precio = "";
}

function agregarProducto() {
  productos.value.push({ nombre: "", cantidad: null, precio: null });
  erroresProductos.value.push({ nombre: "", cantidad: "", precio: "" });
}

function eliminarProducto(i) {
  if (productos.value.length > 1) {
    productos.value.splice(i, 1);
    erroresProductos.value.splice(i, 1);
  }
}

const formularioValido = computed(() => {
  const clienteOK = Object.values(erroresCliente).every((e) => e === "") &&
                    cliente.nombre && cliente.email && cliente.metodoPago;

  const productosOK = erroresProductos.value.every(
    (e, i) =>
      e.nombre === "" &&
      e.cantidad === "" &&
      e.precio === "" &&
      productos.value[i].nombre &&
      productos.value[i].cantidad > 0 &&
      productos.value[i].precio > 0
  );

  return clienteOK && productosOK;
});

function onSubmit() {
  const productosConTotales = productos.value.map((p) => ({
    ...p,
    total: p.cantidad * p.precio,
  }));

  const totalPedido = productosConTotales.reduce((acc, p) => acc + p.total, 0);

  const pedidoFinal = {
    cliente: { ...cliente },
    productos: productosConTotales,
    totalPedido,
  };

  console.log("Pedido enviado:", pedidoFinal);
  alert("Pedido enviado correctamente (ver consola)");
}
</script>

<style scoped>
.order-container {
  max-width: 650px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  font-family: 'Segoe UI', sans-serif;
}

h2, h3, h4 {
  color: #333;
  margin-bottom: 1rem;
  text-align: left;
}

h2 {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.3rem;
  margin-top: 1rem;
}

h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

input, select {
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus, select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 3px #3498db66;
}

textarea {
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 80px;
}

.error {
  color: #e74c3c;
  font-size: 0.85rem;
  height: 16px;
}

.producto {
  padding: 10px;
  border: 1px solid #aaa;
  margin-bottom: 15px;
  border-radius: 6px;
}

button {
  padding: 0.7rem 1.5rem;
  border: none;
  background-color: #3498db;
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  align-self: flex-start;
}

button:hover:not(:disabled) {
  background-color: #2d86c4;
  transform: scale(1.02);
}

button:disabled {
  background-color: #ccc;
  cursor: default;
}

/* RESPONSIVE */
@media (max-width: 700px) {
  .order-container {
    width: 95%;
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  h4 {
    font-size: 1rem;
  }

  button {
    width: 100%;
    font-size: 0.95rem;
  }
}

</style>
