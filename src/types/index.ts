export interface Product {
  id: number
  name: string
  price: number
  description?: string
  image_path?: string
  stock: number
  available: boolean
  category_id: number
}

export interface CartItem {
  product: Product
  quantity: number
}