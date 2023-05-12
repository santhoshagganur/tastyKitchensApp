import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-section-container">
      <div className="footer-website-information">
        <img
          src="https://res.cloudinary.com/dlvb09jrk/image/upload/v1683616918/Vector_e475av.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-website-name"> Tasty Kitchens </h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="footer-website-information">
        <FaPinterestSquare className="logos" testid="pintrest-social-icon" />
        <FaInstagram className="logos" testid="instagram-social-icon" />
        <FaTwitterSquare className="logos" testid="twitter-social-icon" />
        <FaFacebookSquare className="logos" testid="facebook-social-icon" />
      </div>
    </div>
  )
}
