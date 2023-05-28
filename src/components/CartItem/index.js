import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {increaseCartItemQuantity, decreaseCartItemQuantity} = value
      const {cartItemDetails} = props
      const {imageUrl, quantity, cost, name, id} = cartItemDetails

      const onDecrementQuantity = () => {
        decreaseCartItemQuantity(id)
      }

      const onIncrementQuantity = () => {
        increaseCartItemQuantity(id)
      }

      return (
        <li className="cart-item-container">
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
                onClick={onDecrementQuantity}
              />
            </button>
            <p className="cart-quantity">{quantity}</p>
            <button type="button" className="quantity-controller-button">
              <BsPlusSquare
                color="#52606D"
                size={12}
                testid="plus"
                onClick={onIncrementQuantity}
              />
            </button>
          </div>
          <p className="cart-food-price">
            <BiRupee /> {cost * quantity}
          </p>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
