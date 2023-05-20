import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  increaseCartItemQuantity: () => {},
  decreaseCartItemQuantity: () => {},
})

export default CartContext
