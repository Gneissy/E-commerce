import React from "react";
import "./Footer.css";

function Footer(){
  return(
    <div className = "footer-wrapper">
      <div className = "footer-container">
        <div className = "footer-individual-wrapper" >
          <p className = "footer-title"> Links </p>
          <a className = "footer-link"> Headphones </a>
          <a className = "footer-link"> Keyboards </a>
          <a className = "footer-link"> Mouses </a>
          <a className = "footer-link"> Mousepads </a>
        </div>
        <div className = "footer-individual-wrapper" >
          <p className = "footer-title"> Customer Services </p>
          <a className = "footer-link"> Support </a>
          <a className = "footer-link"> Instructions </a>
          <a className = "footer-link"> Contact </a>
          <a className = "footer-link"> FAQ </a>
        </div>
        <div className = "footer-individual-wrapper" >
          <p className = "footer-title"> Company </p>
          <a className = "footer-link"> About  </a>
          <a className = "footer-link"> Terms & Conditions </a>
          <a className = "footer-link"> Privacy Policy </a>
        </div>
        <div className = "footer-individual-wrapper" >
          <p className = "footer-title"> Follow us </p>
          <div className = "footer-contact-container">
            <a className = "footer-link fa-brands fa-twitter fa-2x" />
            <a className = "footer-link fa-brands fa-instagram fa-2x" />
            <a className = "footer-link fa-brands fa-facebook fa-2x" />
          </div>

        </div>
      </div>
    </div>

  )
}

export default Footer;
