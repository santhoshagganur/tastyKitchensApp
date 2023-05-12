import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dlvb09jrk/image/upload/v1683800418/erroring_1_etja0p.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-text"> Page Not Found </h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/" className="home-page-navigation">
      <button type="button" className="navigation-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
