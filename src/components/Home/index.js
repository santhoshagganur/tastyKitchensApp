import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import FoodSort from '../FoodSort'
import ResturantCard from '../ResturantCard'
import Footer from '../Footer'

const LIMIT = 9

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const carouselApiStatusConstants = {
  initial: 'INITIAL',
  onProgress: 'ON_PROGRESS',
  failure: 'FAILED',
  success: 'SUCCESS',
}

const restaurantApiStatusConstants = {
  initial: 'INITIAL',
  onProgress: 'ON_PROGRESS',
  failure: 'FAILED',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    carouselImages: [],
    activePage: 1,
    restaurantImages: [],
    carouselApiStatus: carouselApiStatusConstants.initial,
    restaurantApiStatus: restaurantApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCarouselImages()
    this.getRestaurantsList()
  }

  getUpdatedData = data => {
    const modifiedData = data.restaurants.map(each => ({
      hasOnlineDelivery: each.has_online_delivery,
      userRating: {
        ratingText: each.user_rating.rating_text,
        ratingColor: each.user_rating.rating_color,
        totalReviews: each.user_rating.total_reviews,
        rating: each.user_rating.rating,
      },
      name: each.name,
      hasTableBooking: each.has_table_booking,
      isDeliveringNow: each.is_delivering_now,
      costForTwo: each.cost_for_two,
      cuisine: each.cuisine,
      imageUrl: each.image_url,
      id: each.id,
      menuType: each.menu_type,
      location: each.location,
      opensAt: each.opens_at,
      groupByTime: each.group_by_time,
    }))

    return modifiedData
  }

  getRestaurantsList = async () => {
    this.setState({
      restaurantApiStatus: restaurantApiStatusConstants.inProgress,
    })
    const {activePage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * LIMIT
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}`
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
      this.setState({
        restaurantImages: updatedData,
        restaurantApiStatus: restaurantApiStatusConstants.success,
      })
    } else {
      this.setState({restaurantApiStatus: restaurantApiStatusConstants.failure})
    }
  }

  getCarouselImages = async () => {
    this.setState({carouselApiStatus: carouselApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.offers.map(each => ({
        imageUrl: each.image_url,
        id: each.id,
      }))

      this.setState({
        carouselImages: updatedData,
        carouselApiStatus: carouselApiStatusConstants.success,
      })
    } else {
      this.setState({carouselApiStatus: carouselApiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCarouselSuccessView = () => {
    const {carouselImages} = this.state

    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <ul>
        <Slider {...settings}>
          {carouselImages.map(each => (
            <img
              src={each.imageUrl}
              className="home-carousel-img"
              alt="carousel"
            />
          ))}
        </Slider>
      </ul>
    )
  }

  renderRestaurantSuccessView = () => {
    const {restaurantImages} = this.state

    return (
      <div className="home-body-container">
        <FoodSort sortByOptions={sortByOptions} />
        <hr className="home-horizontal-line" />
        <ul className="home-carousel-container">
          {restaurantImages.map(each => (
            <ResturantCard key={each.id} restaurantDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderCarousels = () => {
    const {carouselApiStatus} = this.state
    console.log(carouselApiStatus)

    switch (carouselApiStatus) {
      case carouselApiStatusConstants.inProgress:
        return this.renderLoader()

      case carouselApiStatusConstants.success:
        return this.renderCarouselSuccessView()

      default:
        return null
    }
  }

  renderRestaurants = () => {
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
        {this.renderCarousels()}
        {this.renderRestaurants()}

        <Footer />
      </>
    )
  }
}

export default Home
