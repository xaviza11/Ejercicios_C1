<script setup lang="ts">
import { mapApiError } from '@/api/apiErrors';
import { useToast } from '@/common/composables/useToast';
import TaskForm from '@/modules/tasks/components/TaskForm.vue';
import type { CreateTaskDto } from '@/modules/tasks/models/create-task.dto';
import type { Task, TaskPriority } from '@/modules/tasks/models/task.model';
import {
  completeAllPendingTasks,
  completeTask,
  createTask,
  deleteAllCompletedTasks,
  getTasks,
} from '@/modules/tasks/services/tasks.service';
import { onMounted, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const toast = useToast();

const tasks = ref<Task[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const searchTerm = ref(''); // Input de búsqueda

// Ordenación
type SortField = 'dueDate' | 'priority' | null;
type SortOrder = 'asc' | 'desc';

const sortField = ref<SortField>(null);
const sortOrder = ref<SortOrder>('asc');

// Vista: lista o tarjetas
const isCardView = ref(false);

// Alternar orden
function toggleSort(field: SortField) {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }
}

// Limpiar orden
function clearSort() {
  sortField.value = null;
  sortOrder.value = 'asc';
}

// Convertir prioridad a valor numérico
function priorityValue(priority: TaskPriority) {
  switch (priority) {
    case 'low': return 1;
    case 'medium': return 2;
    case 'high': return 3;
  }
  return 0;
}

// Computed: filtrar, ordenar
const displayedTasks = computed(() => {
  const term = searchTerm.value.toLowerCase().trim();
  let list = tasks.value.filter(
    t =>
      t.name.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term)
  );

  if (sortField.value) {
    list.sort((a, b) => {
      let aValue = 0;
      let bValue = 0;

      if (sortField.value === 'dueDate') {
        aValue = new Date(a.dueDate).getTime();
        bValue = new Date(b.dueDate).getTime();
      } else if (sortField.value === 'priority') {
        aValue = priorityValue(a.priority);
        bValue = priorityValue(b.priority);
      }

      if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return list;
});

// Cargar tareas desde API
async function loadTasks() {
  loading.value = true;
  error.value = null;

  try {
    tasks.value = await getTasks();
  } catch {
    error.value = 'No se han podido cargar las tareas.';
  } finally {
    loading.value = false;
  }
}

// Crear tarea
async function onCreateTask(payload: CreateTaskDto) {
  try {
    await createTask(payload);
    toast.success('Tarea creada correctamente');
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, 'No se ha podido crear la tarea'));
  }
}

// Completar tarea
async function onCompleteTask(taskId: string) {
  try {
    await completeTask(taskId);
    toast.success('Tarea completada');
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, 'No se ha podido completar la tarea'));
  }
}

// Completar todas las tareas pendientes
async function onCompleteAll() {
  try {
    await completeAllPendingTasks();
    toast.success('Todas las tareas pendientes se han completado');
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, 'No se han podido completar las tareas'));
  }
}

// Eliminar tareas completadas
async function onDeleteCompleted() {
  try {
    await deleteAllCompletedTasks();
    toast.success('Tareas completadas eliminadas');
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, 'No se han podido eliminar las tareas completadas'));
  }
}

// Badge de prioridad
function priorityBadge(p: TaskPriority) {
  if (p === 'high') return 'bg-danger';
  if (p === 'medium') return 'bg-primary';
  return 'bg-secondary';
}

onMounted(loadTasks);
</script>

<template>
  <section class="container py-4">
    <header class="d-flex align-items-center justify-content-between mb-3">
      <h1 class="h4 mb-0">Mis tareas</h1>
      <RouterLink to="/" class="btn btn-outline-secondary btn-sm">Volver a Home</RouterLink>
    </header>

    <TaskForm :disabled="loading" @submit="onCreateTask" />

    <!-- Input de búsqueda -->
    <div class="mb-3">
      <label class="form-label">Buscar tareas</label>
      <input
        type="text"
        class="form-control"
        v-model="searchTerm"
        placeholder="Escribe nombre o descripción..."
      />
    </div>

    <!-- Botones de ordenación y vista -->
    <div class="mb-3 d-flex gap-2 flex-wrap">
      <button class="btn btn-outline-primary btn-sm" @click="toggleSort('dueDate')">
        Ordenar por fecha
        <span v-if="sortField === 'dueDate'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
      </button>

      <button class="btn btn-outline-primary btn-sm" @click="toggleSort('priority')">
        Ordenar por prioridad
        <span v-if="sortField === 'priority'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
      </button>

      <button v-if="sortField" class="btn btn-outline-secondary btn-sm ms-auto" @click="clearSort">
        Limpiar orden
      </button>

      <button class="btn btn-outline-info btn-sm" @click="isCardView = !isCardView">
        {{ isCardView ? 'Vista Lista' : 'Vista Tarjetas' }}
      </button>
    </div>

    <div class="d-flex gap-2 mb-3">
      <button
        class="btn btn-sm btn-outline-success"
        :disabled="tasks.length === 0 || loading"
        @click="onCompleteAll"
      >
        Completar todas
      </button>

      <button
        class="btn btn-sm btn-outline-danger"
        :disabled="!tasks.some((t) => t.completed) || loading"
        @click="onDeleteCompleted"
      >
        Eliminar completadas
      </button>

      <button
        class="btn btn-sm btn-outline-secondary ms-auto"
        :disabled="loading"
        @click="loadTasks"
      >
        Recargar
      </button>
    </div>

    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <!-- Vista lista -->
    <div v-if="!loading && displayedTasks.length && !isCardView" class="list-group">
      <RouterLink
        v-for="task in displayedTasks"
        :key="task.id"
        :to="{ name: 'task-detail', params: { id: task.id } }"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        <div class="me-3">
          <span class="badge me-2" :class="task.completed ? 'bg-success' : 'bg-warning text-dark'">
            {{ task.completed ? 'Hecha' : 'Pendiente' }}
          </span>

          <span class="fw-semibold">{{ task.name }}</span>

          <span class="badge ms-2" :class="priorityBadge(task.priority)">
            {{ task.priority }}
          </span>

          <div class="text-muted small mt-1">{{ task.description }}</div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <small class="text-muted">{{ new Date(task.dueDate).toLocaleDateString() }}</small>

          <button
            v-if="!task.completed"
            class="btn btn-sm btn-outline-success"
            @click.prevent="onCompleteTask(task.id)"
            title="Completar"
          >
            ✓
          </button>
        </div>
      </RouterLink>
    </div>

    <!-- Vista tarjetas -->
    <div v-if="!loading && displayedTasks.length && isCardView" class="row g-3">
      <div v-for="task in displayedTasks" :key="task.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <span class="badge me-2" :class="task.completed ? 'bg-success' : 'bg-warning text-dark'">
                {{ task.completed ? 'Hecha' : 'Pendiente' }}
              </span>

              <span class="badge ms-2" :class="priorityBadge(task.priority)">
                {{ task.priority }}
              </span>

              <h5 class="card-title mt-2">{{ task.name }}</h5>
              <p class="card-text">{{ task.description }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <small class="text-muted">{{ new Date(task.dueDate).toLocaleDateString() }}</small>
              <button
                v-if="!task.completed"
                class="btn btn-sm btn-outline-success"
                @click.prevent="onCompleteTask(task.id)"
                title="Completar"
              >
                ✓
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="!loading && tasks.length === 0" class="text-muted">No tienes tareas todavía.</p>
    <p v-if="!loading && displayedTasks.length === 0 && tasks.length > 0" class="text-muted">
      No se encontraron tareas que coincidan con la búsqueda.
    </p>
  </section>
</template>
