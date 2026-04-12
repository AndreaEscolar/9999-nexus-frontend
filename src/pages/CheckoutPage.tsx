import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCartShopping} from '@fortawesome/free-solid-svg-icons'

interface CheckoutForm {
  nom: string
  cognoms: string
  email: string
  adreca: string
  ciutat: string
  codiPostal: string
  pagament: 'targeta' | 'transferencia' | 'contrareembolsament'
}

function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [completed, setCompleted] = useState(false)
  const [form, setForm] = useState<CheckoutForm>({
    nom: '',
    cognoms: '',
    email: '',
    adreca: '',
    ciutat: '',
    codiPostal: '',
    pagament: 'targeta'
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearCart()
    setCompleted(true)
  }

  if (items.length === 0 && !completed) {
    navigate('/cart')
    return null
  }

  if (completed) {
    return (
      <div className="container mt-5 text-center">
        <div className="card shadow p-5 mx-auto" style={{ maxWidth: '500px' }}>
          <div className="text-success" style={{ fontSize: '3rem' }}>
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <h2 className="mt-3 text-success">Comanda realitzada!</h2>
          <p className="text-muted mt-2">
            Gràcies {form.nom}! Rebràs la teva comanda aviat.
          </p>
          <button
            className="btn btn-success mt-3"
            onClick={() => navigate('/')}
          >
            Tornar a l'inici
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        <FontAwesomeIcon icon={faCartShopping} className="me-2 text-success" />
        Finalitzar compra
      </h2>
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Dades d'enviament</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nom</label>
                  <input
                    className="form-control"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cognoms</label>
                  <input
                    className="form-control"
                    name="cognoms"
                    value={form.cognoms}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Adreça</label>
                  <input
                    className="form-control"
                    name="adreca"
                    value={form.adreca}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-8">
                  <label className="form-label">Ciutat</label>
                  <input
                    className="form-control"
                    name="ciutat"
                    value={form.ciutat}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Codi Postal</label>
                  <input
                    className="form-control"
                    name="codiPostal"
                    value={form.codiPostal}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Mètode de pagament</label>
                  <select
                    className="form-select"
                    name="pagament"
                    value={form.pagament}
                    onChange={handleChange}
                  >
                    <option value="targeta">
                      💳 Targeta de crèdit
                    </option>
                    <option value="transferencia">
                      🏦 Transferència bancària
                    </option>
                    <option value="contrareembolsament">
                      💵 Contrareembolsament
                    </option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 mt-4 btn-lg"
              >
                <FontAwesomeIcon icon={faCircleCheck} className="me-2" />
                Confirmar comanda
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Resum de la comanda</h5>
            {items.map(item => (
              <div key={item.product.id} className="d-flex justify-content-between mb-2">
                <span>{item.product.name} x{item.quantity}</span>
                <span>{(item.product.price * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span className="text-success">{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage