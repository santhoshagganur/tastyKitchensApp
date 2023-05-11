import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class SpecificRestaurantDetails extends Component {
  state = {restaurantData: {}}

  componentDidMount() {
    this.getRestaurantDetails()
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
      foodItems: data.food_items.map(each => ({
        name: each.name,
        cost: each.cost,
        foodType: each.food_type,
        imageUrl: each.image_url,
        id: each.id,
      })),
    }

    return modifiedData
  }

  getRestaurantDetails = async () => {
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
      this.setState({restaurantData: updatedData})
    }
  }

  render() {
    const {restaurantData} = this.state
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
        <Header />
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

        {this.renderFoodItemsView()}
      </>
    )
  }
}

export default SpecificRestaurantDetails
