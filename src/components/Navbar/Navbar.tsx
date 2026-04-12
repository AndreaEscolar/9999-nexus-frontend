import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function Navbar() {
  const { itemCount } = useCart()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          NexusNerd
        </Link>

        <div className="d-flex gap-3 align-items-center">
          <Link className="nav-link text-white" to="/">Home</Link>
          <Link className="nav-link text-white" to="/shop">Tienda</Link>
          <Link className="nav-link text-white position-relative" to="/cart">
            🛒
            {itemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar