import './index.css'

const Header = () => (
  <div className="header-container">
    <div className="app-logo-container">
      <img
        src="https://res.cloudinary.com/dlvb09jrk/image/upload/v1683038892/wvyms47k5lj2cj5a8lnk.png"
        alt="website logo"
        className="header-app-logo"
      />
      <h1 className="header-app-name"> Tasty Kitchens </h1>
    </div>

    <ul className="header-navigation-container">
      <li className="navigation-tab"> Home </li>
      <li className="navigation-tab"> Cart </li>
      <li className="navigation-tab">
        <button type="button" className="logout-button">
          Logout
        </button>
      </li>
    </ul>
  </div>
)

export default Header
