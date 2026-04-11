import type { Product } from '../types'

const API_URL = 'http://nexus.daw/api'

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`)
  if (!response.ok) throw new Error('Error fetching products')
  return response.json()
}

export const getProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`)
  if (!response.ok) throw new Error('Product not found')
  return response.json()
}