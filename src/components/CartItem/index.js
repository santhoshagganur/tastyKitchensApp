import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import './index.css'

class CartItem extends Component {
  state = {quantity: 0}

  componentDidMount() {
    const {cartItemDetails} = this.props
    const {quantity} = cartItemDetails

    this.setState({quantity})
  }

  onIncrementQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {cartItemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === cartItemDetails.id) {
        // console.log('found')
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrementQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {cartItemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === cartItemDetails.id) {
        // console.log('found')
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  render() {
    const {cartItemDetails} = this.props
    const {imageUrl, cost, name} = cartItemDetails
    const {quantity} = this.state

    return (
      <li className="cart-item-container" test id="cartItem">
        <div className="cart-food-container">
          <img src={imageUrl} alt="cart-item" className="cart-food" />
          <h1 className="food-name"> {name} </h1>
        </div>
        <div className="cart-quantity-container">
          <button type="button" className="quantity-controller-button">
            <BsDashSquare
              color="#52606D"
              size={12}
              testid="minus"
              onClick={this.onDecrementQuantity}
            />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button type="button" className="quantity-controller-button">
            <BsPlusSquare
              color="#52606D"
              size={12}
              testid="plus"
              onClick={this.onIncrementQuantity}
            />
          </button>
        </div>
        <p className="cart-food-price">
          <BiRupee /> {cost * quantity}
        </p>
      </li>
    )
  }
}

export default CartItem
