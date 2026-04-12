import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faShieldHalved, faTruck, faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div style={{
        minHeight: '90vh',
        background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container text-center text-white">
          <p className="text-success fw-semibold mb-2" style={{ letterSpacing: '3px', fontSize: '0.85rem' }}>
            ▸ BENVINGUT A L'UNIVERS NERD
          </p>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1 }}>
            Nexus<span className="text-success">Nerd</span>
          </h1>
          <p className="mt-4 text-secondary mx-auto" style={{ maxWidth: '500px', fontSize: '1.1rem' }}>
            Col·leccionables, manga i gaming. Tot el que necessites en un sol lloc.
          </p>
          <div className="mt-5 d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/shop" className="btn btn-success btn-lg px-4 py-3">
              <FontAwesomeIcon icon={faBolt} className="me-2" />
              Explorar tienda
            </Link>
            <Link to="/cart" className="btn btn-outline-light btn-lg px-4 py-3">
              Veure cistella
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background: '#111', padding: '80px 0' }}>
        <div className="container">
          <h2 className="text-white text-center fw-bold mb-5">
            Per què <span className="text-success">NexusNerd?</span>
          </h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div style={{
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '16px',
                padding: '2rem'
              }}>
                <div className="text-success mb-3" style={{ fontSize: '2rem' }}>
                  <FontAwesomeIcon icon={faTruck} />
                </div>
                <h5 className="text-white fw-bold">Enviament ràpid</h5>
                <p className="text-secondary mb-0">
                  Rebs la teva comanda en 24-48h a qualsevol punt de la península.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div style={{
                background: '#1a1a1a',
                border: '1px solid #1a3a1a',
                borderRadius: '16px',
                padding: '2rem'
              }}>
                <div className="text-success mb-3" style={{ fontSize: '2rem' }}>
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
                <h5 className="text-white fw-bold">Compra segura</h5>
                <p className="text-secondary mb-0">
                  Les teves dades i pagaments sempre protegits amb encriptació SSL.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div style={{
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '16px',
                padding: '2rem'
              }}>
                <div className="text-success mb-3" style={{ fontSize: '2rem' }}>
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <h5 className="text-white fw-bold">Productes exclusius</h5>
                <p className="text-secondary mb-0">
                  Col·leccionables i edicions limitades que no trobaràs a cap altra botiga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#0a0a0a', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 className="text-white fw-bold mb-3">Preparat per començar?</h2>
          <p className="text-secondary mb-4">Milers de productes t'esperen</p>
          <Link to="/shop" className="btn btn-success btn-lg px-5 py-3">
            Anar a la tienda
            <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage