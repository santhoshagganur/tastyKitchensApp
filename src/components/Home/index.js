import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import './index.css'
import Header from '../Header'
import FoodSort from '../FoodSort'

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

class Home extends Component {
  state = {carouselImages: []}

  componentDidMount() {
    this.getCarouselImages()
  }

  getCarouselImages = async () => {
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

      this.setState({carouselImages: updatedData})
    }
  }

  render() {
    const {carouselImages} = this.state
    console.log(carouselImages)
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <>
        <Header />
        <ul className="home-carousel-container">
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
        <div className="home-body-container">
          <FoodSort sortByOptions={sortByOptions} />
          <hr className="home-horizontal-line" />
        </div>
      </>
    )
  }
}

export default Home
