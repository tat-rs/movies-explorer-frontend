import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";

import mainApi from "../../utils/MainApi";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ERROR_AUTH, ERROR_REGISTER, ERROR_UPTADE_PROFILE } from "../../utils/constants";

import {useScrollLock} from "../../hooks/useScroll";

import "./App.css";

function App() {

  const [isMenuOpen, setMenuOpen] = useState(false);
  //результат поиска по всем фильмам
  const [resultMovies, setResultMovies] = useState (
    JSON.parse(localStorage.getItem('result')) || []
  )
  //результат поиска по сохраненным фильмам
  const [resultSavedMovies, setResultSavedMovies] = useState (
    JSON.parse(localStorage.getItem('resultSavedMovies')) || []
  )
  //массив сохраненных фильмов
  const [savedUsersMovies, setSavedUsersMovies] = useState([]);
  //объект со значением инпута поиска
  const [searchText, setSearchText] = useState (
    JSON.parse(localStorage.getItem('searchText')) || {}
  )
  //состояние чекбокса
  const [valuesCheckbox, setValuesCheckbox] = useState(
    JSON.parse(localStorage.getItem('checkbox')) || {}
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    user: {
      name: "",
      email: "",
    }
});
  const userEmail = localStorage.getItem('email');

  const {lockScroll, unlockScroll} = useScrollLock();

  const history = useHistory();

  //проверка токена пользователя
  function tokenCheck() {
    if(userEmail){
      mainApi.getContent()
        .then((data) => data)
        .then((res) => {
          if(res?.email) {
            localStorage.setItem('email', res.email); //обновили стейт эл. почты пользователя
            setIsLoggedIn(true); //обновлен статус пользователя - зарегистрирован
            history.push('/movies'); //переадресация на страницу пользователя
          }
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    //получаем данные пользователя
    if(isLoggedIn && userEmail) {
      mainApi.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData)
        })
        .catch((err) => console.log(err))
        getUsersMovies();
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

  //получаем сохраненные фильмы
  function getUsersMovies() {
    mainApi.getAllMovies()
      .then((movies) => {
        setSavedUsersMovies(movies)
        setResultSavedMovies(movies)
      })
      .catch(() => setErrorMessage('Не найдены сохраненные фильмы'))
  }

  //открыть меню навигации
  function openNavMenu() {
    lockScroll()
    setMenuOpen(true)
  }
  //закрыть меню навигации
  function closeNavMenu() {
    unlockScroll()
    setMenuOpen(false)
  }

  //сохранение фильмов по клику на лайк
  function saveMovie(movie) {

    mainApi.saveMovie(movie)
      .then((res) => {
        setSavedUsersMovies([...savedUsersMovies, res]) //обновили стейт сохраненных фильмов
        setResultSavedMovies([...savedUsersMovies, res]) //обновили стейт резульата сохраненных фильмов
      })
      .catch((err) => console.log(err))

  }
  //удаление фильмов из сохраненных
  function deleteMovie(movie) {
    
    mainApi.deleteMovie(movie._id)
    .then(() => {
      const newList = savedUsersMovies.filter(element => element._id !== movie._id)
      setSavedUsersMovies(newList)
      setResultSavedMovies(newList)
    })
    .catch(err => console.log(err));
  }

  //регистрация
  function onRegister(userEmail, userName, userPassword) {
    setisLoading(true)
    
    mainApi.register(userEmail, userName, userPassword)
      .then((res) => {
        if(res) {
          setCurrentUser({
            name: userName,
            email: userEmail
          })
          onLogin(userEmail, userPassword); //авторизация
        }
        else {
          setErrorMessage(ERROR_REGISTER)
        }
      })
      .catch(() => setErrorMessage(ERROR_REGISTER))
      .finally(() => {
        setisLoading(false)
      })
  }

  //авторизация и переход на страницу пользователя
  function onLogin(userEmail, userPassword) {
    setisLoading(true)

    mainApi.authorize(userEmail, userPassword)
      .then((data) => {
        if(data?.token) {
          localStorage.setItem('email', userEmail);
          setIsLoggedIn(true);
          history.push('/movies'); //переход на странийу с фильмами
        } else {
          setErrorMessage(ERROR_AUTH)
        }
      })
      .catch(() => {
        setErrorMessage(ERROR_AUTH)
      })
      .finally(() => {
        setisLoading(false)
      })
  }
  //обновление данных пользователя
  function updateUserInfo(userName, userEmail) {
    setisLoading(true)
    
    mainApi.uptadeUserInfo(userName, userEmail)
      .then((userData) => {
        if(userData) {
          setSuccessMessage("Данные успешно обновлены")
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
      .finally(() => {
        setisLoading(false);
      })
  }

  //функция выхода из системы
  function signOutClick(){
    mainApi.logout()
      .then(res => res)
      .catch(err => console.log(err));

    localStorage.removeItem('email');
    localStorage.removeItem('result');
    localStorage.removeItem('resultSavedMovies');
    localStorage.removeItem('searchText');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('count');
    localStorage.removeItem('renderedMoviesList');

    setSearchText({});
    setResultMovies([]);
    setResultSavedMovies([]);
    setValuesCheckbox({});

    setIsLoggedIn(false);
    history.push('/signin');
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
            isLoggedIn={isLoggedIn}
            openNavMenu={openNavMenu}
            closeNavMenu={closeNavMenu}
            isMenuOpen={isMenuOpen}
            resultMovies={resultMovies}
            setResultMovies={setResultMovies}
            savedUsersMovies={savedUsersMovies}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            searchText={searchText}
            setSearchText={setSearchText}
            nameCheckbox='moviesCheckbox'
            valuesCheckbox={valuesCheckbox}
            setValuesCheckbox={setValuesCheckbox}
            nameForm='searchMovieInAll' />

          <ProtectedRoute
            component={SavedMovies}
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
            openNavMenu={openNavMenu}
            closeNavMenu={closeNavMenu}
            isMenuOpen={isMenuOpen}
            savedUsersMovies={savedUsersMovies}
            setSavedUsersMovies={setSavedUsersMovies}
            deleteMovie={deleteMovie}
            valuesCheckbox={valuesCheckbox}
            searchText={searchText}
            setSearchText={setSearchText}
            nameCheckbox='savedMoviesCheckbox'
            setValuesCheckbox={setValuesCheckbox}
            resultSavedMovies={resultSavedMovies}
            setResultSavedMovies={setResultSavedMovies}
            nameForm='searchMovieInSaved'  />

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
            updateUserInfo={updateUserInfo}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage} />

          <Route path="/signin">
            <Login
              title="Рады видеть!"
              textOfButton={isLoading ? "Войти..." : "Войти"}
              nameForm="sign-in" 
              onLogin={onLogin}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage} />
          </Route>

          <Route path="/signup">
            <Register
              title="Добро пожаловать!"
              textOfButton={isLoading ? "Регистрация..." : "Зарегистрироваться"}
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
