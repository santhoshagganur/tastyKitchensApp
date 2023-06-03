import {BiRupee} from 'react-icons/bi'

import './index.css'

const CartSummary = () => {
  const calculateTotalBill = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    let cartBill = 0
    cartData.forEach(eachItem => {
      cartBill += eachItem.price * eachItem.quantity
    })
    return cartBill
  }

  return (
    <div className="cart-bill-container">
      <h1 className="cart-bill-heading"> Order Total: </h1>
      <div>
        <p className="cart-bill-amount" testid="total-price">
          <BiRupee /> {calculateTotalBill()}
        </p>
        <button type="button" className="place-order-btn">
          Place Order
        </button>
      </div>
    </div>
  )
}

export default CartSummary
