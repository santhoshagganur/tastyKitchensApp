import CartContext from '../../context/CartContext'

import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      console.log(cartList)

      return (
        <>
          <ul className="cart-list-items-container">
            {cartList.map(each => (
              <CartItem key={each.id} cartItemDetails={each} />
            ))}
          </ul>
          <CartSummary />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
