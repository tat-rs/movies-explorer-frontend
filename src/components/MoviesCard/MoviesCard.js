import { Route, Switch } from "react-router-dom";
import BtnDelete from "../../images/btn-delete.svg";

import "./MoviesCard.css";

function MoviesCard({
  movie,
}) {

  function getTime (movie) {
    let hours = Math.floor(movie/60);
    let min = movie % 60;
    return `${hours}ч${min}м`
  }

  const isLiked = false;


  return (
    <li className="card">
      <img className="card__image" src={`https://api.nomoreparties.co${movie.image?.url}`} alt={movie.nameRU}></img>
      <div className="card__container">
        <h3 className="card__title">{movie.nameRU}</h3>
        <Switch>
          <Route path="/movies">
            <button className="card__button button" type="submit">
              <svg className={`card__icon-like ${isLiked ? 'card__icon-like_active' : ''}`} viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.27273 0C6.27273 0 5.54545 0.523077 5 1.08974C4.45455 0.566667 3.72727 0 2.72727 0C1.13636 0 0 1.2641 0 2.83333C0 3.61795 0.318182 4.31538 0.909091 4.79487L5 8.5L9.09091 4.79487C9.63636 4.27179 10 3.61795 10 2.83333C10 1.2641 8.86364 0 7.27273 0Z" fill="white"/>
              </svg>
            </button>
          </Route>
          <Route path="/saved-movies">
            <button className="card__button button" type="button">
              <img className="card__button-delete" src={BtnDelete} alt="Удалить" />
            </button>
          </Route>
        </Switch>
      </div>
      <p className="card__duration">{getTime(movie.duration)}</p>
    </li>
  )
}

export default MoviesCard