import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  renderSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  renderFailureView = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  loginToWebsite = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.renderSuccessView(data.jwt_token)
    } else {
      this.renderFailureView(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state

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
          <form className="form-control" onSubmit={this.loginToWebsite}>
            <label className="label-element" htmlFor="input">
              USERNAME
            </label>
            <input
              type="text"
              className="input-element"
              id="input"
              value={username}
              onChange={this.changeUserName}
            />
            <label className="label-element" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              className="input-element"
              id="password"
              value={password}
              onChange={this.changePassword}
            />
            {showErrorMsg ? <p className="error-msg"> {errorMsg} </p> : null}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>

        <img
          src="https://res.cloudinary.com/dlvb09jrk/image/upload/v1683097799/Rectangle_1456_vk2qhf.png"
          className="login-side-img"
          alt="website login"
        />
      </div>
    )
  }
}

export default Login
