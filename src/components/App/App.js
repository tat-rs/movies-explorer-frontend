import { useEffect, useState } from "react";
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
import moviesApi from "../../utils/MoviesApi";

function App() {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const {lockScroll, unlockScroll} = useScrollLock();
  const [isLoading, setIsLoading] = useState(true);
  const [moviesList, setMoviesList] = useState(null);

  useEffect(() => {
    moviesApi.getAllMovies()
      .then((res) => {
        setMoviesList(res)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])


  function openNavMenu() {
    lockScroll()
    setMenuOpen(true)
  }

  function closeNavMenu() {
    unlockScroll()
    setMenuOpen(false)
  }

  return (
    <div className="page__content">

        <Switch>

          <Route exact path="/">
            <Main />
          </Route>

          <Route path="/movies">
            <Movies
              openNavMenu={openNavMenu}
              closeNavMenu={closeNavMenu}
              isMenuOpen={isMenuOpen}
              isLoading={isLoading}
              moviesList={moviesList} />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies
              openNavMenu={openNavMenu}
              closeNavMenu={closeNavMenu}
              isMenuOpen={isMenuOpen}/>
          </Route>

          <Route path="/profile">
            <Profile
              openNavMenu={openNavMenu}
              closeNavMenu={closeNavMenu}
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
