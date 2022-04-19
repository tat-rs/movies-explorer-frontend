import React from "react";
import { Switch, Route, Link, NavLink } from "react-router-dom";

import ProfileIcon from "../../images/profile.svg";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import Logo from "../Logo/Logo";

import "./Header.css";

function Header(props) {

  return (
        
    <header className="header page__header">

      <Logo />

      <Switch>

        <Route exact path="/">

        <div className="header__container">
          <Link to="/signup" className="header__link link">
            Регистрация
          </Link>
          <Link to="/signin" className="header__link header__link_color_blue button">
            Войти
          </Link>
        </div>

        </Route>

        <Route path={["/movies", "/saved-movies", "/profile"]}>

          <div className="links">
            <NavLink to="/movies" className="links__item" activeClassName="links__item_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="links__item" activeClassName="links__item_active">Сохранённые фильмы</NavLink>
          </div>

          <Link to="/profile" className="profile-btn link">
            <p className="profile-btn__text">Аккаунт</p>
            <img className="profile-btn__icon" src={ProfileIcon} alt="Иконка" />
          </Link>

          <HamburgerButton handleMenuClick={props.handleMenuClick}/>
          
        </Route>

      </Switch>
    </header>
  )
}

export default Header