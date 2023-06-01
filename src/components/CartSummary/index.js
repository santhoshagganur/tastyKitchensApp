import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartSummary = () => {
  const cartData = JSON.parse(localStorage.getItem('cartData'))
  let cartBill = 0
  cartData.forEach(eachItem => {
    cartBill += eachItem.price * eachItem.quantity
  })

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
}

export default CartSummary
