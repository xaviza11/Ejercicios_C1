import { ref, computed } from 'vue'

export function useValidation() {
  const name = ref('')
  const email = ref('')
  const password = ref('')

  // Validaciones individuales
  const nameError = computed(() =>
    name.value.length < 2 ? 'El nombre debe tener al menos 2 caracteres' : ''
  )

  const emailError = computed(() =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Correo electrónico no válido'
  )

  const passwordError = computed(() =>
    password.value.length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : ''
  )

  // Validación general
  const isValid = computed(() => !nameError.value && !emailError.value && !passwordError.value)

  return {
    name,
    email,
    password,
    nameError,
    emailError,
    passwordError,
    isValid
  }
}
