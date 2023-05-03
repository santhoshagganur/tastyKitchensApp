import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {userName: '', password: ''}

  changeUserName = event => {
    this.setState({userName: event.target.value})
  }

  changePassword = event => {
    this.setState({Password: event.target.value})
  }

  render() {
    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <img
            src="https://res.cloudinary.com/dlvb09jrk/image/upload/v1683038892/wvyms47k5lj2cj5a8lnk.png"
            className="login-app-image"
            alt="website logo"
          />
          <h1 className="login-page-app-name"> Tasty Kitchens </h1>
          <p className="login-text"> Login </p>
          <form className="form-control">
            <label className="label-element" htmlFor="input">
              USERNAME
            </label>
            <input
              type="text"
              className="input-element"
              id="input"
              onChange={this.changeUserName}
            />
            <label className="label-element" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              className="input-element"
              id="password"
              onChange={this.changePassword}
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
