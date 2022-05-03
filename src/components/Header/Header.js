import { Switch, Route, Link, NavLink } from "react-router-dom";

import HamburgerButton from "../HamburgerButton/HamburgerButton";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import ProfileButton from "../ProfileButton/ProfileButton";

import "./Header.css";

function Header({
  openNavMenu,
  closeNavMenu,
  isMenuOpen
}) {

  return (

    <header className="header page__header">
      <Logo />
      <Switch>
        <Route exact path="/">
          <div className="header__container">
            <Link to="/signup"
              className="link header__link">
                Регистрация
            </Link>
            <Link to="/signin"
            className="button header__link header__link_color_blue">
              Войти
            </Link>
          </div>
        </Route>
        <Route path={["/movies", "/saved-movies", "/profile"]}>
          <div className="links">
            <NavLink
              to="/movies"
              className="links__item"
              activeClassName="links__item_active">
                Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="links__item"
              activeClassName="links__item_active">
                Сохранённые фильмы
            </NavLink>
          </div>
          
          <ProfileButton className="profile-btn_type_header" />
          
          <HamburgerButton
            openNavMenu={openNavMenu}
            closeNavMenu={closeNavMenu}
            isMenuOpen={isMenuOpen} />
            
          {
            isMenuOpen && (
              <Navigation
                closeNavMenu={closeNavMenu}
                isMenuOpen={isMenuOpen} />
            )
          }
        </Route>

      </Switch>
    </header>
        
  )
}

export default Header