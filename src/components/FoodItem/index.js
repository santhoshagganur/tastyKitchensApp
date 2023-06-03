import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import {BsPlus} from 'react-icons/bs'
import {HiOutlineMinusSm} from 'react-icons/hi'

import './index.css'

class FoodItem extends Component {
  state = {isClicked: false, quantity: 0}

  componentDidMount() {
    this.findCartItems()
  }

  findCartItems = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItem} = this.props
    const cartItem = cartData.filter(each => each.id === foodItem.id)

    if (cartItem.length !== 0) {
      if (cartItem.quantity > 1) {
        this.setState({quantity: cartItem.quantity})
      } else if (cartItem.quantity < 1) {
        this.removeCartItem()
      }
    }
  }

  incrementFoodQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
    this.findCartItems()
  }

  decrementFoodQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
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
    this.findCartItems()
  }

  addToCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItem} = this.props
    const cartItem = {...foodItem, quantity: 1}
    cartData.push(cartItem)

    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.setState({isClicked: true})
    console.log(localStorage.getItem('cartData'))
    this.findCartItems()
  }

  renderFoodItem = () => {
    const {foodItem} = this.props
    const {name, cost, rating, imageUrl} = foodItem
    const {isClicked, quantity} = this.state

    return (
      <li className="specific-restaurant-specific-food" testid="foodItem">
        <img
          src={imageUrl}
          className="specific-restaurant-food-img"
          alt="food"
        />
        <div>
          <h1 className="specific-food-name"> {name} </h1>
          <div className="specific-rating-container">
            <BiRupee className="specific-restaurant-specific-food-rupee" />
            <p className="specific-restaurant-food-cost"> {cost} </p>
          </div>
          <div className="specific-rating-container">
            <AiFillStar className="specific-restaurant-specific-food-star" />
            <p className="specific-restaurant-food-rating">{rating}</p>
          </div>

          {isClicked ? (
            <div className="adding-quantity-container">
              <button
                type="button"
                className="add-sub-quantity"
                onClick={this.decrementFoodQuantity}
              >
                <HiOutlineMinusSm />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="add-sub-quantity"
                onClick={this.incrementFoodQuantity}
              >
                <BsPlus />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="add-food-button"
              onClick={this.addToCart}
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }

  render() {
    return this.renderFoodItem()
  }
}

export default FoodItem
