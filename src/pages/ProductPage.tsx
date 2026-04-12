import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Product } from '../types'
import { getProduct } from '../services/api'
import { useCart } from '../context/CartContext'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    if (!id) return
    getProduct(Number(id))
      .then(data => setProduct(data))
      .catch(() => setError('Producte no trobat'))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-success" role="status" />
    </div>
  )

  if (error || !product) return (
    <div className="container mt-5">
      <div className="alert alert-danger">{error}</div>
      <button className="btn btn-secondary" onClick={() => navigate('/shop')}>
        Tornar a la tienda
      </button>
    </div>
  )

  return (
    <div className="container mt-4">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate('/shop')}
      >
        ← Tornar
      </button>

      <div className="row g-4">
        <div className="col-md-6">
          {product.image_path ? (
            <img
              src={`http://nexus.daw/storage/${product.image_path}`}
              alt={product.name}
              className="img-fluid rounded shadow"
            />
          ) : (
            <div
              className="bg-secondary rounded d-flex align-items-center justify-content-center"
              style={{ height: '400px' }}
            >
              <span className="text-white">Sense imatge</span>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h1>{product.name}</h1>
          <h2 className="text-success">{product.price}€</h2>
          {product.description && (
            <p className="text-muted">{product.description}</p>
          )}
          <p>
            Stock:{' '}
            <span className={product.stock > 0 ? 'text-success' : 'text-danger'}>
              {product.stock > 0 ? `${product.stock} disponibles` : 'Sense stock'}
            </span>
          </p>

          <button
            className="btn btn-success btn-lg w-100 mt-3"
            onClick={handleAddToCart}
            disabled={!product.available}
          >
            {added ? '✓ Afegit!' : 'Afegir a la cistella'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage