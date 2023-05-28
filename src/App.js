import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import CartContext from './context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import SpecificRestaurantDetails from './components/SpecificRestaurantDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {cartList: []}

  addCartItem = cartItem => {
    this.setState(prevState => ({cartList: [...prevState.cartList, cartItem]}))
  }

  increaseCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const updatedQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: updatedQuantity}
        }
        return eachItem
      }),
    }))
  }

  decreaseCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.find(each => each.id === id)
    if (cartItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            const updatedQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    }
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          increaseCartItemQuantity: this.increaseCartItemQuantity,
          decreaseCartItemQuantity: this.decreaseCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={SpecificRestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
