import React from "react";
import { Link } from "react-router-dom";

import LogoIcon from "../../images/logo.svg";

import "./Header.css";

function Header() {
  return (
    <header className="header page__header">
      <Link to="/" className="logo">
      <img className="logo__icon" src={LogoIcon} alt="Логотип" />
      </Link>
      <div className="header__container">
        <Link to="/signup" className="header__link button">
          Регистрация
        </Link>
        <Link to="/signin" className="header__link header__link_color_blue button">
          Войти
        </Link>
      </div>
    </header>
  )
}

export default Header