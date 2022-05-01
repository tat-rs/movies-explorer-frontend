import { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";

import {useScrollLock} from "../../hooks/useScroll";

import "./App.css";

function App() {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const {lockScroll, unlockScroll} = useScrollLock();

  function handleMenuClick() {
    setMenuOpen(!isMenuOpen)
    if(!isMenuOpen) {
      return lockScroll()
    } else {
      return unlockScroll()
    }
  }

  return (
    <div className="page__content">

        <Switch>

          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/movies">
            <Movies
              handleMenuClick={handleMenuClick}
              isMenuOpen={isMenuOpen}/>
          </Route>

          <Route path="/saved-movies">
            <SavedMovies
              handleMenuClick={handleMenuClick}
              isMenuOpen={isMenuOpen}/>
          </Route>

          <Route path="/profile">
            <Profile
              handleMenuClick={handleMenuClick}
              isMenuOpen={isMenuOpen}/>
          </Route>

          <Route path="/signin">
            <Login
              title="Рады видеть!"
              textOfButton="Войти"
              nameForm="sign-in" />
          </Route>

          <Route path="/signup">
            <Register
            title="Добро пожаловать!"
            textOfButton="Зарегистрироваться"
            nameForm="sign-up"/>
          </Route>

          <Route path="*">
            <NotFoundPage/>
          </Route>

        </Switch>
      
    </div>
  );
}

export default App;
