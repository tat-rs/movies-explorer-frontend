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
import { ERROR_AUTH, ERROR_REGISTER, ERROR_UPTADE_PROFILE } from "../../utils/constants";

function App() {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const {lockScroll, unlockScroll} = useScrollLock();
  const [moviesList, setMoviesList] = useState(null);
  const [resultMovies, setResultMovies] = useState (
    JSON.parse(localStorage.getItem('result')) || []
  )

  const [resultSavedMovies, setResultSavedMovies] = useState (
    JSON.parse(localStorage.getItem('resultSavedMovies')) || []
  )

  const [searchText, setSearchText] = useState (
    JSON.parse(localStorage.getItem('searchText')) || {}
  )
  
  const userEmail = localStorage.getItem('email');

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({
    user: {
      name: "",
      email: "",
    }
});

  const [savedUsersMovies, setSavedUsersMovies] = useState([]);

  const [valuesCheckbox, setValuesCheckbox] = useState(
    JSON.parse(localStorage.getItem('checkbox')) || {}
  );

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
    }
    tokenCheck();
  }, [isLoggedIn])

  useEffect(() => {
    if(isLoggedIn && userEmail) {
      localStorage.setItem('result', JSON.stringify(resultMovies));
      localStorage.setItem('searchText', JSON.stringify(searchText));
      localStorage.setItem('checkbox', JSON.stringify(valuesCheckbox));
      localStorage.setItem('resultSavedMovies', JSON.stringify(resultSavedMovies));
    }
  }, [isLoggedIn, resultMovies, searchText, valuesCheckbox, resultSavedMovies])

  useEffect(() => {
    if(isLoggedIn) {
      getUsersMovies()
    }

  }, [isLoggedIn])

  function getUsersMovies() {
    mainApi.getAllMovies()
      .then((movies) => {
        setSavedUsersMovies(movies)
      })
      .catch(() => setErrorMessage('Не найдены сохраненные фильмы'))
  }

  function openNavMenu() {
    lockScroll()
    setMenuOpen(true)
  }

  function closeNavMenu() {
    unlockScroll()
    setMenuOpen(false)
  }

  function saveMovie(movie) {

    mainApi.saveMovie(movie)
      .then((res) => {
        setSavedUsersMovies([...savedUsersMovies ,res])
      })
      .catch((err) => console.log(err))

  }

  function deleteMovie(movie) {
    
    mainApi.deleteMovie(movie._id)
    .then(() => {
      const newList = savedUsersMovies.filter(element => element._id !== movie._id)
      setSavedUsersMovies(newList)
    })
    .catch(err => console.log(err));
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
          setErrorMessage(ERROR_REGISTER)
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
          setErrorMessage(ERROR_AUTH)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function updateUserInfo(userName, userEmail) {
    
    mainApi.uptadeUserInfo(userName, userEmail)
      .then((userData) => {
        console.log(userData)
        if(userData) {
          setCurrentUser({
            user: {
              name: userName,
              email: userEmail
            }
          })
        }
        else {
          setErrorMessage(ERROR_UPTADE_PROFILE)
        }
      })
      .catch((err) => console.log(err))
  }

  //функция выхода из системы
  function signOutClick(){
    mainApi.logout()
      .then(res => res)
      .catch(err => console.log(err));

    localStorage.removeItem('email');
    localStorage.removeItem('result');
    localStorage.removeItem('searchText');
    localStorage.removeItem('checkbox');

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
            moviesList={moviesList}
            resultMovies={resultMovies}
            isLoggedIn={isLoggedIn}
            savedUsersMovies={savedUsersMovies}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            setResultMovies={setResultMovies}
            searchText={searchText}
            setSearchText={setSearchText}
            nameCheckbox='moviesCheckbox'
            valuesCheckbox={valuesCheckbox}
            setValuesCheckbox={setValuesCheckbox} />

          <ProtectedRoute
            component={SavedMovies}
            path="/saved-movies"
            openNavMenu={openNavMenu}
            closeNavMenu={closeNavMenu}
            isMenuOpen={isMenuOpen}
            /* searchMovies={searchMovies} */
            isLoggedIn={isLoggedIn}
            savedUsersMovies={savedUsersMovies}
            setSavedUsersMovies={setSavedUsersMovies}
            deleteMovie={deleteMovie}
            valuesCheckbox={valuesCheckbox}
            searchText={searchText}
            setSearchText={setSearchText}
            nameCheckbox='savedMoviesCheckbox'
            /* onChangeCheckbox={onChangeCheckbox} */
            setValuesCheckbox={setValuesCheckbox}
            getUsersMovies={getUsersMovies}
            resultSavedMovies={resultSavedMovies}
            setResultSavedMovies={setResultSavedMovies}  />

          <ProtectedRoute
            component={Profile}
            path="/profile"
            openNavMenu={openNavMenu}
            closeNavMenu={closeNavMenu}
            isMenuOpen={isMenuOpen}
            logout={signOutClick}
            isLoggedIn={isLoggedIn}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            updateUserInfo={updateUserInfo} />

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
