import React from "react";
import { Switch, Route, Link, NavLink } from "react-router-dom";

import LogoIcon from "../../images/logo.svg";
import ProfileIcon from "../../images/profile.svg";

import "./Header.css";

function Header() {

  return (
        
    <header className="header page__header">

      <Link to="/" className="logo">
        <img className="logo__icon" src={LogoIcon} alt="Логотип" />
      </Link>

      <Switch>

        <Route exact path="/">

        <div className="header__container">
          <Link to="/signup" className="header__link button">
            Регистрация
          </Link>
          <Link to="/signin" className="header__link header__link_color_blue button">
            Войти
          </Link>
        </div>

        </Route>

        <Route path={["/movies", "/saved-movies"]}>

          <div className="links">
            <NavLink to="/movies" className="links__item" activeClassName="links__item_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="links__item" activeClassName="links__item_active">Сохранённые фильмы</NavLink>
          </div>

          <Link to="/profile" className="profile-btn link">
            <p className="profile-btn__text">Аккаунт</p>
            <img className="profile-btn__icon" src={ProfileIcon} alt="Иконка" />
          </Link>
          
        </Route>

      </Switch>
    </header>
  )
}

export default Header