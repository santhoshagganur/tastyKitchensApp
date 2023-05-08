import './index.css'
import {BsFilterLeft} from 'react-icons/bs'

const FoodSort = props => {
  const {sortByOptions} = props

  return (
    <>
      <h1 className="home-title"> Popular Restaurants </h1>
      <div className="home-filter-container">
        <p className="home-title-description">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>

        <div className="home-filter">
          <BsFilterLeft className="filter-icon" />
          <p className="home-filter-title">Sort by </p>
          <select className="sort-options-container">
            {sortByOptions.map(each => (
              <option value={each.id} key={each.id} className="sort-item">
                {each.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default FoodSort
