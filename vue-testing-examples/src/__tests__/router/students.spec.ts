import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '@/components/StudentList.vue'
import StudentDetail from '@/components/StudentDetail.vue'
import { students } from '@/assets/data/students'

// Definimos rutas como en tu router real
const routes = [
  { path: '/', name: 'home', component: StudentList },
  { path: '/student/:id', name: 'student', component: StudentDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



describe('Navegación de estudiantes', () => {

  it('debería mostrar la lista de estudiantes en la ruta raíz "/"', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(StudentList, {
      global: { plugins: [router] }
    })

    // Comprobamos que aparecen los nombres de todos los estudiantes
    students.forEach(student => {
      expect(wrapper.html()).toContain(student.name)
    })
  })

  it('debería mostrar el detalle del estudiante en la ruta "/student/:id"', async () => {
    const student = students[0]

    expect(student.id).toBe(1)
    expect(typeof student.name).toBe('string')
    expect(typeof student.email).toBe('string')
    expect(typeof student.course).toBe('string')

    //! el user esta definido, además el id es 1 lo cual es correcto.

    router.push(`/student/${student.id}`)
    await router.isReady()

    const wrapper = mount(StudentDetail, {
      global: { plugins: [router] }
    })

    //! aquí hay un error el wrapper nunca tiene el user, creo que es devido a que el componente nunca logra cargar el json con los datos
    //! todo parece correcto y además en local funciona.
    //! quizas mockeando la llamada?

    expect(wrapper.html()).toBe(true)

    expect(wrapper.html()).toContain(student.name)
    expect(wrapper.html()).toContain(student.email)
    expect(wrapper.html()).toContain(student.course)
  })

  it('debería navegar al detalle del estudiante al hacer clic en un enlace', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(StudentList, {
      global: { plugins: [router] }
    })

    // Simulamos clic en el primer estudiante
    const enlace = wrapper.find('a')
    await enlace.trigger('click')
    await flushPromises() // Espera que se resuelvan todas las promesas de navegación

    expect(router.currentRoute.value.path).toBe(`/student/${students[0].id}`)
  })

  it('debería navegar de vuelta a la lista al hacer clic en "Volver al listado"', async () => {
    const student = students[0]
    router.push(`/student/${student.id}`)
    await router.isReady()

    const wrapper = mount(StudentDetail, {
      global: { plugins: [router] }
    })

    // Simulamos clic en el botón "Volver al listado"
    const botonVolver = wrapper.get('a.btn-back')
    await botonVolver.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/')
  })
})
