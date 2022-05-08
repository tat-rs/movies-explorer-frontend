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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function App() {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const {lockScroll, unlockScroll} = useScrollLock();
  const [isLoading, setIsLoading] = useState(true);
  const [moviesList, setMoviesList] = useState(null);
  const [resultMovies, setResultMovies ] = useState(
    JSON.parse(localStorage.getItem('resutlt')) || []
  );

  const userEmail = localStorage.getItem('email');

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
}); //стейт текущих данных пользователя

  const history = useHistory();

  //проверка токена пользователя
  function tokenCheck() {
    if(userEmail){
      mainApi.getContent()
        .then((data) => data)
        .then((res) => {
          if(res?.email)
          localStorage.setItem('email', res.email); //обновили стейт эл. почты пользователя
          setIsLoggedIn(true); //обновлен статус пользователя - зарегистрирован
          history.push('/movies'); //переадресация на страницу пользователя
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {

    if(isLoggedIn && userEmail) {
      Promise.all([moviesApi.getAllMovies(), mainApi.getUserInfo()])
      .then(([movies, userData]) => {
        setMoviesList(movies)
        setCurrentUser(userData)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
    }

    tokenCheck();
    
  }, [isLoggedIn])


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
        return arr = [...arr, item]
      }
      return arr
    });
    
    setResultMovies(arr)
  }

  function onRegister(userEmail, userName, userPassword) {
    
    mainApi.register(userEmail, userName, userPassword)
      .then((res) => {
        if(res) {
          setCurrentUser({
            name: userName,
            email: userEmail
          })
          onLogin(userEmail, userPassword)
        }
        else {
          setErrorMessage(" При регистрации пользователя произошла ошибка.")
        }
      })
      .catch((err) => console.log(err))
  }

  //функция перехода на страницу пользователя
  function onLogin(userEmail, userPassword) {

    mainApi.authorize(userEmail, userPassword)
      .then((data) => {
        if(data?.token) {
          localStorage.setItem('email', userEmail);
          setIsLoggedIn(true);
          history.push('/movies');
        } else {
          setErrorMessage("Вы ввели неправильный логин или пароль.")
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
    setIsLoggedIn(false);
    history.push('/signin');//переадресация на странцицу входа
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>

          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute
            component={Movies}
            path="/movies"
            openNavMenu={openNavMenu}
            closeNavMenu={closeNavMenu}
            isMenuOpen={isMenuOpen}
            isLoading={isLoading}
            moviesList={moviesList}
            resultMovies={resultMovies}
            searchMovies={searchMovies}
            isLoggedIn={isLoggedIn} />

          <ProtectedRoute
            component={SavedMovies}
            path="/saved-movies"
            openNavMenu={openNavMenu}
            closeNavMenu={closeNavMenu}
            isMenuOpen={isMenuOpen}
            searchMovies={searchMovies}
            isLoggedIn={isLoggedIn} />

          <ProtectedRoute
            component={Profile}
            path="/profile"
            openNavMenu={openNavMenu}
            closeNavMenu={closeNavMenu}
            isMenuOpen={isMenuOpen}
            logout={signOutClick}
            isLoggedIn={isLoggedIn}
            errorMessage={errorMessage} />

          <Route path="/signin">
            <Login
              title="Рады видеть!"
              textOfButton="Войти"
              nameForm="sign-in" 
              onLogin={onLogin}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage} />
          </Route>

          <Route path="/signup">
            <Register
            title="Добро пожаловать!"
            textOfButton="Зарегистрироваться"
            nameForm="sign-up"
            onRegister={onRegister}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage} />
          </Route>

          <Route path="*">
            <NotFoundPage/>
          </Route>

        </Switch>
      </CurrentUserContext.Provider>

      
    </div>
  );
}

export default App;
