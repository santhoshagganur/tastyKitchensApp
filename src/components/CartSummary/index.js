import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let cartBill = 0
      cartList.forEach(eachItem => {
        cartBill += eachItem.price * eachItem.quantity
      })
      console.log(cartList)

      return (
        <div className="cart-bill-container">
          <h1 className="cart-bill-heading"> Order Total: </h1>
          <div>
            <p className="cart-bill-amount">
              <BiRupee /> {cartBill}
            </p>
            <button type="button" className="place-order-btn">
              Place Order
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
