import { Link } from "react-router-dom";
import ProfileIcon from "../../images/profile.svg";

import "./Navigation.css";

function Navigation({isMenuOpen}) {
  return (
    <div className={`header__navbar ${isMenuOpen ? 'header__navbar_opened' : '' }`}>
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item link">Главная</li>
          <li className="navbar__item link">Фильмы</li>
          <li className="navbar__item link">Сохранённые фильмы</li>
        </ul>
        <Link to="/profile" className="nav__profile-btn link">
            <p className="nav__profile-btn__text">Аккаунт</p>
            <img className="nav__profile-btn__icon" src={ProfileIcon} alt="Иконка" />
        </Link>
    </nav>
    </div>
  )
}

export default Navigation