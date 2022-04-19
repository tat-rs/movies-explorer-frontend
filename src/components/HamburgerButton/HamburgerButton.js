import React from "react";

import "./HamburgerButton.css";

function HamburgerButton(props) {

  return (
    <div className='hamburger-btn link' onClick={props.handleMenuClick}>
      {
        props.isMenuOpen && (
          <h1> TITLE
          </h1>
        )
      }
      <span className={`hamburger-btn__line ${props.isMenuOpen ? 'hamburger-btn__line_left' : '' }`}/>
      <span className={`hamburger-btn__line ${props.isMenuOpen ? 'hamburger-btn__line_hidden' : '' }`}/>
      <span className={`hamburger-btn__line ${props.isMenuOpen ? 'hamburger-btn__line_right' : '' }`}/>
    </div>
  )
}

export default HamburgerButton