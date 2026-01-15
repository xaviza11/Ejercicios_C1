import { describe, it, expect } from 'vitest'

interface Pokemon {
  id: number
  name: string
}

// Servicio real que consulta PokeAPI usando fetch
async function getUsers(limit = 10): Promise<Pokemon[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
  if (!response.ok) {
    throw new Error('Error al obtener los usuarios')
  }
  const data = await response.json()
  return data.results.map((p: any, index: number) => ({
    id: index + 1,
    name: p.name
  }))
}

describe('userService real con PokeAPI usando fetch', () => {

  it('debería devolver la lista de pokemons', async () => {
    const users = await getUsers(5)

    // Comprobamos que devuelve 5 elementos
    expect(users).toHaveLength(5)

    // Cada elemento debe tener id y name
    users.forEach((u, index) => {
      expect(u).toHaveProperty('id', index + 1)
      expect(u).toHaveProperty('name')
      expect(typeof u.name).toBe('string')
    })
  })

  it('debería devolver un error si la URL falla', async () => {
    async function getUsersFail() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-invalid`)
      if (!response.ok) throw new Error('Error al obtener los usuarios')
      return response.json()
    }

    await expect(getUsersFail()).rejects.toThrow('Error al obtener los usuarios')
  })

})
