import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import './index.css'

const CartListView = () => {
  const cartData = JSON.parse(localStorage.getItem('cartData'))

  return (
    <>
      <ul className="cart-list-items-container">
        {cartData.map(each => (
          <CartItem key={each.id} cartItemDetails={each} />
        ))}
      </ul>
      <CartSummary />
    </>
  )
}

export default CartListView
