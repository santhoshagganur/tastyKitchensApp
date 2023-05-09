import {FaStar} from 'react-icons/fa'
import './index.css'

const ResturantCard = props => {
  const {restaurantDetails} = props
  const {imageUrl, name, cuisine, userRating} = restaurantDetails
  const {totalReviews, rating} = userRating

  return (
    <li className="resturant-card-container">
      <img src={imageUrl} alt="restaurant" className="restaurant-img" />
      <div>
        <h1 className="restaurant-card-name"> {name} </h1>
        <p className="restaurant-card-food-type"> {cuisine} </p>
        <div className="rating-container">
          <FaStar className="rating-star" />
          <p className="users-rating"> {rating} </p>
          <p className="total-ratings"> ({totalReviews} ratings) </p>
        </div>
      </div>
    </li>
  )
}

export default ResturantCard
