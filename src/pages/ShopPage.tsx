// TODO: Descomentar cuando la API esté desplegada en el servidor (rama feature-api)

// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import type { Product } from '../types'
// import { getProducts } from '../services/api'
// import { useCart } from '../context/CartContext'

// function ShopPage() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const { addToCart } = useCart()

//   useEffect(() => {
//     getProducts()
//       .then(data => setProducts(data))
//       .catch(() => setError('Error carregant els productes'))
//       .finally(() => setLoading(false))
//   }, [])

//   if (loading) return (
//     <div className="container mt-5 text-center">
//       <div className="spinner-border text-success" role="status" />
//       <p className="mt-3">Carregant productes...</p>
//     </div>
//   )

//   if (error) return (
//     <div className="container mt-5">
//       <div className="alert alert-danger">{error}</div>
//     </div>
//   )

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Tienda</h2>
//       <div className="row g-4">
//         {products.map(product => (
//           <div key={product.id} className="col-md-4 col-lg-3">
//             <div className="card h-100 shadow-sm">
//               {product.image_path && (
//                 <img
//                   src={`http://nexus.daw/storage/${product.image_path}`}
//                   className="card-img-top"
//                   alt={product.name}
//                   style={{ height: '200px', objectFit: 'cover' }}
//                 />
//               )}
//               <div className="card-body d-flex flex-column">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="card-text text-success fw-bold">
//                   {product.price}€
//                 </p>
//                 <div className="mt-auto d-flex gap-2">
//                   <Link
//                     to={`/product/${product.id}`}
//                     className="btn btn-outline-secondary btn-sm"
//                   >
//                     Veure
//                   </Link>
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => addToCart(product)}
//                     disabled={!product.available}
//                   >
//                     {product.available ? 'Afegir' : 'Sense stock'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ShopPage


// TEMPORAL: Datos de prueba mientras la API no está disponible
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'One Piece Vol. 1',
    price: 8.99,
    description: 'Primer volum del manga',
    stock: 10,
    available: true,
    category_id: 1
  },
  {
    id: 2,
    name: 'Figura Naruto',
    price: 24.99,
    description: 'Figura col·leccionable',
    stock: 0,
    available: false,
    category_id: 2
  },
  {
    id: 3,
    name: 'Samarreta Goku',
    price: 19.99,
    description: 'Samarreta de cotó',
    stock: 5,
    available: true,
    category_id: 3
  }
]

function ShopPage() {
  const [products] = useState<Product[]>(mockProducts)
  const { addToCart } = useCart()

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tienda</h2>
      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-success fw-bold">
                  {product.price}€
                </p>
                <div className="mt-auto d-flex gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Veure
                  </Link>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => addToCart(product)}
                    disabled={!product.available}
                  >
                    {product.available ? 'Afegir' : 'Sense stock'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopPage