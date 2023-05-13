import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

const restaurantApiStatusConstants = {
  initial: 'INITIAL',
  onProgress: 'ON_PROGRESS',
  failure: 'FAILED',
  success: 'SUCCESS',
}

class SpecificRestaurantDetails extends Component {
  state = {
    restaurantData: {},
    foodDetails: [],
    restaurantApiStatus: restaurantApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getFoodItems = data => {
    const updatedFood = data.map(each => ({
      name: each.name,
      cost: each.cost,
      foodType: each.food_type,
      imageUrl: each.image_url,
      id: each.id,
      rating: each.rating,
    }))

    return updatedFood
  }

  getUpdatedData = data => {
    const modifiedData = {
      rating: data.rating,
      id: data.id,
      name: data.name,
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      imageUrl: data.image_url,
      reviewsCount: data.reviews_count,
      opensAt: data.opens_at,
      location: data.location,
      itemsCount: data.items_count,
    }

    return modifiedData
  }

  getRestaurantDetails = async () => {
    this.setState({
      restaurantApiStatus: restaurantApiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getUpdatedData(data)
      const updatedFoodData = this.getFoodItems(data.food_items)
      this.setState({
        restaurantData: updatedData,
        foodDetails: updatedFoodData,
        restaurantApiStatus: restaurantApiStatusConstants.success,
      })
    } else {
      this.setState({restaurantApiStatus: restaurantApiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaurantSuccessView = () => {
    const {restaurantData, foodDetails} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantData

    return (
      <>
        <div className="specific-restaurant-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="specific-restaurant-img"
          />

          <div>
            <h1 className="specific-restaurant-name"> {name} </h1>
            <p className="specific-restaurant-description"> {cuisine} </p>
            <p className="specific-restaurant-location"> {location} </p>
            <div className="specific-restaurant-rating-container">
              <div className="specific-restaurant-item">
                <div className="specific-rating-container">
                  <AiFillStar className="specific-restaurant-star" />
                  <p className="specific-restaurant-rating"> {rating} </p>
                </div>
                <p className="specific-restaurant-number-of-ratings">
                  {reviewsCount}+ Ratings
                </p>
              </div>

              <div>
                <div className="specific-rating-container">
                  <BiRupee className="specific-restaurant-star" />
                  <p className="specific-restaurant-rating"> {costForTwo} </p>
                </div>
                <p className="specific-restaurant-number-of-ratings">
                  Cost for two
                </p>
              </div>
            </div>
          </div>
        </div>

        <ul className="specific-restaurant-food-items-container">
          {foodDetails.map(each => (
            <FoodItem key={each.id} foodItem={each} />
          ))}
        </ul>
      </>
    )
  }

  renderRestaurantDetails = () => {
    const {restaurantApiStatus} = this.state

    switch (restaurantApiStatus) {
      case restaurantApiStatusConstants.inProgress:
        return this.renderLoader()

      case restaurantApiStatusConstants.success:
        return this.renderRestaurantSuccessView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderRestaurantDetails()}
        <Footer />
      </>
    )
  }
}

export default SpecificRestaurantDetails
