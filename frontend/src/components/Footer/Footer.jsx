import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo_small} alt=""/>
                <p>Discover unique, customizable apparel at WEAREASE. Express your style with our high-quality, personalized clothing and accessories. Your fashion, your way.</p>
                <div className="social-media-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.insta_icon} alt="" />
                    <img src={assets.youtube_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+94 11-7680-008</li>
                    <li>contact@muse.com</li>
                </ul>

            </div>
        </div>
        <hr/>
        <p className="footer-copyright">© 2025 WEAREASE. All rights reserved. | Privacy Policy | Terms of Service</p>
    </div>
  )
}

export default Footer