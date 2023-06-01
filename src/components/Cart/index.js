import Header from '../Header'
import CartListView from '../CartListView'
import Footer from '../Footer'
import './index.css'

const Cart = () => {
  const cartData = JSON.parse(localStorage.getItem('cartData'))
  const showEmptyCartView = cartData.length === 0
  console.log(cartData)

  return (
    <>
      <Header />
      {showEmptyCartView ? (
        <div className="empty-cart-container">
          <img
            src="https://res.cloudinary.com/dlvb09jrk/image/upload/v1685252872/cooking_1_n9v3hj.png"
            alt="empty-cart-view"
            className="empty-cart-img"
          />
          <h1 className="empty-cart-heading">No Orders Yet!</h1>
          <p className="empty-cart-description">
            Your cart is empty. Add something from the menu.
          </p>
          <button type="button" className="order-now-button">
            Order Now
          </button>
        </div>
      ) : (
        <>
          <CartListView />
          <Footer />
        </>
      )}
    </>
  )
}

export default Cart
