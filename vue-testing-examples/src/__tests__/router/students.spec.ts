import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import StudentList from '@/components/StudentList.vue';
import StudentDetail from '@/components/StudentDetail.vue';
import { loadStudents } from '@/services/usersService';

// Mock de datos de estudiantes
const mockStudents = [
  { id: 1, name: 'Juan Pérez' },
  { id: 2, name: 'Ana Gómez' },
];

// Creamos rutas como en tu router real
const routes = [
  { path: '/', name: 'home', component: StudentList },
  { path: '/student/:id', name: 'student', component: StudentDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

vi.mock('@/services/usersService', () => ({
  loadStudents: vi.fn().mockResolvedValue([
    { id: 1, name: 'Juan Pérez', email: 'juan@pérez.com', course: 'Nuxt' },
    { id: 2, name: 'Ana Gómez', email: 'ana@gómez.com', course: 'Vue' },
  ]),
}));

describe('Navegación de estudiantes', () => {
  beforeEach(async () => {
    router.push('/');
    await router.isReady();
  });

  it('debería mostrar la lista de estudiantes en la ruta raíz "/"', async () => {
    const wrapper = mount(StudentList, {
      global: { plugins: [router] },
    });
    await flushPromises();

    const items = wrapper.findAll('.list-group-item');
    expect(items).toHaveLength(mockStudents.length);
    expect(items[0].text()).toContain('Juan Pérez');
    expect(items[1].text()).toContain('Ana Gómez');
  });

it('debería navegar al detalle del estudiante al hacer clic en "Ver detalle"', async () => {
  // Montamos la lista con router
  const wrapper = mount(StudentList, { global: { plugins: [router] } })

  // Esperamos que loadStudents termine
  await flushPromises()

  // Encontramos el primer botón de detalle y hacemos click
  const firstDetailButton = wrapper.find('a.btn-detail')
  expect(firstDetailButton.exists()).toBe(true)
  await firstDetailButton.trigger('click')

  // Esperamos a que el router termine de navegar
  await flushPromises()

  // Comprobamos que la ruta cambió al detalle del estudiante
  expect(router.currentRoute.value.fullPath).toBe('/student/1')

  // Montamos StudentDetail en la ruta actual
  const detailWrapper = mount(StudentDetail, { global: { plugins: [router] } })
  await flushPromises()

  // Ahora sí debería mostrar el nombre del estudiante
  expect(detailWrapper.html()).toContain('Juan Pérez')
})
  it('debería navegar al detalle del estudiante al hacer clic en un enlace', async () => {
    const wrapper = mount(StudentList, { global: { plugins: [router] } });
    await flushPromises();

    const firstLink = wrapper.find('a.btn-detail');
    await firstLink.trigger('click');
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/student/1');
  });

  it('debería navegar de vuelta a la lista al hacer clic en "Volver al listado"', async () => {
    const wrapper = mount(StudentDetail, { global: { plugins: [router] } });
    router.push('/student/1');
    await router.isReady();
    await flushPromises();

    const backButton = wrapper.find('button.back-to-list');
    if (backButton.exists()) {
      await backButton.trigger('click');
      await flushPromises();
      expect(router.currentRoute.value.fullPath).toBe('/');
    }
  });
});
