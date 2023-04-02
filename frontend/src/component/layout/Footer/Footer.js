import React from 'react'
import "./Footer.css"
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; M.Hannan</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/hannan_.01">Instagram</a>
      </div>
    </footer>
  )
}

export default Footer