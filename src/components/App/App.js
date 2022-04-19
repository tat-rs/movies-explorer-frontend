import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";

import "./App.css";

function App() {

  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function handleMenuClick() {
    setMenuOpen(!isMenuOpen)
  }

  console.log(isMenuOpen)

  return (
    <div className="page__content">

      {/* <Header /> */}

      {/* <main className="content"> */}

        <Switch>

          <Route exact path='/'>
            <Main />
          </Route>

          <Route path='/movies'>
            <Movies handleMenuClick={handleMenuClick}/>
          </Route>

          <Route path='/saved-movies'>
            <SavedMovies handleMenuClick={handleMenuClick}/>
          </Route>

          <Route path='/profile'>
            <Profile handleMenuClick={handleMenuClick}/>
          </Route>

          <Route path='/signin'>
            <Login title="Рады видеть!" textOfButton="Войти" nameForm='sign-in' />
          </Route>

          <Route path='/signup'>
            <Register title="Добро пожаловать!" textOfButton="Зарегистрироваться" nameForm='sign-up'/>
          </Route>

          <Route path='/404'>
            <NotFoundPage/>
          </Route>

        </Switch>

      {/* </main> */}

      {/* <Footer /> */}
      
    </div>
  );
}

export default App;
