import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

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
import mainApi from "../../utils/MainApi";

function App() {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const {lockScroll, unlockScroll} = useScrollLock();
  const [isLoading, setIsLoading] = useState(true);
  const [moviesList, setMoviesList] = useState(null);
  const [resultMovies, setResultMovies ] = useState(
    JSON.parse(localStorage.getItem('resutlt')) || []
  );

  const userEmail = localStorage.getItem('email');

  console.log(userEmail)

  const history = useHistory();

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

  function searchMovies(data) {
    let arr = []
    moviesList.forEach(item => {
      if(item.nameRU.toLowerCase().includes(data.toLowerCase())) {
        console.log(item)
        return arr = [...arr, item]
      }
      return arr
    });
    
    setResultMovies(arr)
  }

  function onRegister(userEmail, userName, userPassword) {
    
    mainApi.register(userEmail, userName, userPassword)
      .then((res) => {
        console.log(res)
        if(res) {
          alert("Success")
          onLogin(userEmail, userPassword)
        }
        else {
          alert("УПС")
        }
      })
      .catch((err) => console.log(err))
  }

  //функция перехода на страницу пользователя
  function onLogin(userEmail, userPassword) {

    mainApi.authorize(userEmail, userPassword)
      .then((data) => {
        if(data?.token) {
          localStorage.setItem('email', userEmail);//сохранили эл. почту пользователя
          history.push('/movies'); //переадресация на основную страницу
        } else {
          return
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //функция выхода из системы
  function signOutClick(){
    mainApi.logout()
      .then(res => res)
      .catch(err => console.log(err));

    localStorage.removeItem('email'); //удалили токен
    history.push('/signin');//переадресация на странцицу входа
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
              moviesList={moviesList}
              resultMovies={resultMovies}
              searchMovies={searchMovies} />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies
              openNavMenu={openNavMenu}
              closeNavMenu={closeNavMenu}
              isMenuOpen={isMenuOpen}
              searchMovies={searchMovies} />
          </Route>

          <Route path="/profile">
            <Profile
              openNavMenu={openNavMenu}
              closeNavMenu={closeNavMenu}
              isMenuOpen={isMenuOpen}
              logout={signOutClick} />
          </Route>

          <Route path="/signin">
            <Login
              title="Рады видеть!"
              textOfButton="Войти"
              nameForm="sign-in" 
              onLogin={onLogin} />
          </Route>

          <Route path="/signup">
            <Register
            title="Добро пожаловать!"
            textOfButton="Зарегистрироваться"
            nameForm="sign-up"
            onRegister={onRegister} />
          </Route>

          <Route path="*">
            <NotFoundPage/>
          </Route>

        </Switch>
      
    </div>
  );
}

export default App;
