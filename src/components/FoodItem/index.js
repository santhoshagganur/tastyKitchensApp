import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import {BsPlus} from 'react-icons/bs'
import {HiOutlineMinusSm} from 'react-icons/hi'

import CartContext from '../../context/CartContext'

import './index.css'

class FoodItem extends Component {
  state = {isClicked: false, quantity: 0}

  incrementFoodQuantity = () => {
    const cartDetails = JSON.parse(localStorage.getItem('cartDetails'))
    console.log(cartDetails)
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  decrementFoodQuantity = () => {
    const {quantity} = this.state

    if (quantity > 0) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  renderFoodItem = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const {foodItem} = this.props
        const {name, cost, rating, imageUrl} = foodItem
        const {isClicked, quantity} = this.state

        const foodData = {...foodItem, quantity: 1}

        const addToCart = () => {
          addCartItem(foodData)
        }

        return (
          <li className="specific-restaurant-specific-food">
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
                  onClick={addToCart}
                >
                  Add
                </button>
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return this.renderFoodItem()
  }
}

export default FoodItem
