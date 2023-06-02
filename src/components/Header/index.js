import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const logoutFromApp = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="app-logo-container">
        <Link to="/" className="home-page-navigation">
          <img
            src="https://res.cloudinary.com/dlvb09jrk/image/upload/v1683038892/wvyms47k5lj2cj5a8lnk.png"
            alt="website logo"
            className="header-app-logo"
          />
        </Link>
        <h1 className="header-app-name"> Tasty Kitchens </h1>
      </div>

      <ul className="header-navigation-container">
        <Link to="/" className="home-page-navigation">
          <li className="navigation-tab"> Home </li>
        </Link>
        <Link to="/cart" className="home-page-navigation">
          <li className="navigation-tab"> Cart </li>
        </Link>
        <li className="navigation-tab">
          <button
            type="button"
            className="logout-button"
            onClick={logoutFromApp}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Header
