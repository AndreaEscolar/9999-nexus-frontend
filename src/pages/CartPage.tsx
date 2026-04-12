import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, total, itemCount } = useCart()
  const navigate = useNavigate()

  if (itemCount === 0) return (
    <div className="container mt-5 text-center">
      <h2>La cistella és buida</h2>
      <p className="text-muted">Afegeix productes des de la tienda</p>
      <button
        className="btn btn-success mt-3"
        onClick={() => navigate('/shop')}
      >
        Anar a la tienda
      </button>
    </div>
  )

  return (
    <div className="container mt-4">
      <h2 className="mb-4">La meva cistella</h2>

      <div className="row">
        <div className="col-lg-8">
          {items.map(item => (
            <div key={item.product.id} className="card mb-3 shadow-sm">
              <div className="card-body d-flex align-items-center gap-3">
                {item.product.image_path && (
                  <img
                    src={`http://nexus.daw/storage/${item.product.image_path}`}
                    alt={item.product.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    className="rounded"
                  />
                )}
                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.product.name}</h5>
                  <p className="text-success mb-0">{item.product.price}€</p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className="mb-0 fw-bold" style={{ minWidth: '70px' }}>
                  {(item.product.price * item.quantity).toFixed(2)}€
                </p>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}

          <button
            className="btn btn-outline-danger mt-2"
            onClick={clearCart}
          >
            Buidar cistella
          </button>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4>Resum</h4>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Productes</span>
                <span>{itemCount}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Subtotal</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span className="text-success">{total.toFixed(2)}€</span>
              </div>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={() => navigate('/checkout')}
              >
                Finalitzar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage