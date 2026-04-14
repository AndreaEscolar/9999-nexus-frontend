import type { Product } from '../types'

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "One Piece Vol. 1",
    price: 8.99,
    description: "El primer volum del manga més venut del món.",
    image_path: null,
    stock: 15,
    available: true,
    category_id: 1
  },
  {
    id: 2,
    name: "Figura Naruto Uzumaki",
    price: 34.99,
    description: "Figura col·leccionable d'alta qualitat. 25cm d'alçada.",
    image_path: null,
    stock: 5,
    available: true,
    category_id: 2
  },
  {
    id: 3,
    name: "Samarreta Goku Super Saiyan",
    price: 22.99,
    description: "Samarreta de cotó 100% amb disseny exclusiu.",
    image_path: null,
    stock: 0,
    available: false,
    category_id: 3
  },
  {
    id: 4,
    name: "Attack on Titan Vol. 1",
    price: 9.99,
    description: "El primer volum del manga de Hajime Isayama.",
    image_path: null,
    stock: 8,
    available: true,
    category_id: 1
  },
  {
    id: 5,
    name: "Figura Demon Slayer - Tanjiro",
    price: 42.99,
    description: "Figura oficial de Tanjiro Kamado. Edició limitada.",
    image_path: null,
    stock: 3,
    available: true,
    category_id: 2
  },
  {
    id: 6,
    name: "Ratolí Gaming RGB",
    price: 49.99,
    description: "Ratolí gaming amb 7 botons programables i RGB.",
    image_path: null,
    stock: 12,
    available: true,
    category_id: 4
  },
  {
    id: 7,
    name: "Dragon Ball Z Vol. 1",
    price: 7.99,
    description: "Inici de l'arc de les boles del drac Z.",
    image_path: null,
    stock: 20,
    available: true,
    category_id: 1
  },
  {
    id: 8,
    name: "Teclat Mecànic Gaming",
    price: 89.99,
    description: "Teclat mecànic amb switches Cherry MX Red.",
    image_path: null,
    stock: 0,
    available: false,
    category_id: 4
  }
]