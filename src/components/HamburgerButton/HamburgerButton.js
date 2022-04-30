import "./HamburgerButton.css";

function HamburgerButton({ handleMenuClick, isMenuOpen }) {
  return (
    <div className="hamburger-btn" onClick={handleMenuClick}>
      <span className={`hamburger-btn__line ${isMenuOpen ? 'hamburger-btn__line_left' : '' }`}/>
      <span className={`hamburger-btn__line ${isMenuOpen ? 'hamburger-btn__line_hidden' : '' }`}/>
      <span className={`hamburger-btn__line ${isMenuOpen ? 'hamburger-btn__line_right' : '' }`}/>
    </div>
  )
}

export default HamburgerButton