import type { Product } from '../types'
import { mockProducts } from '../data/products'

export const getProducts = async (): Promise<Product[]> => {
  return Promise.resolve(mockProducts)
}

export const getProduct = async (id: number): Promise<Product> => {
  const product = mockProducts.find(p => p.id === id)
  if (!product) throw new Error('Product not found')
  return Promise.resolve(product)
}