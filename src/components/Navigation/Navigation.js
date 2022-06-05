import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfileIcon from "../../images/profile.svg";

import "./Navigation.css";

function Navigation({
  isMenuOpen,
  closeNavMenu
}) {
  return (
    <div className={`header__navbar ${isMenuOpen ? 'header__navbar_opened' : '' }`}>
      <nav className="navbar">
        <ul className="navbar__list">
          <li>
            <NavLink
              exact to="/"
              className="navbar__item"
              activeClassName="navbar__item_active"
              onClick={closeNavMenu}>
                Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className="navbar__item"
              activeClassName="navbar__item_active"
              onClick={closeNavMenu}>
                Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-movies"
              className="navbar__item"
              activeClassName="navbar__item_active"
              onClick={closeNavMenu}>
                Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link to="/profile" className="nav__profile-btn link" onClick={closeNavMenu}>
            <p className="nav__profile-btn__text">Аккаунт</p>
            <img className="nav__profile-btn__icon" src={ProfileIcon} alt="Иконка" />
        </Link>
    </nav>
    </div>
  )
}

export default Navigation