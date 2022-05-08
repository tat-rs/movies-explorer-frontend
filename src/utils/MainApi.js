import { URL_MAIN_API } from "./constants";

class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getAllMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      credentials: "include",
      headers: this.headers,
    })
    .then(this._checkResponse)
  }

  addNewMovie(Movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this.headers,
      body: JSON.stringify({
        country: Movie.country,
        director: Movie.director,
        duration: Movie.duration,
        year: Movie.year,
        description: Movie.description,
        image: Movie.image,
        trailerLink: Movie.trailerLink,
        nameRU: Movie.nameRU,
        nameEN: Movie.nameEN,
        thumbnail: Movie.thumbnail,
        movieId: Movie.movieId,
      })
    })
    .then(this._checkResponse)
  }

  deleteMovieById(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    })
    .then(this._checkResponse)
  }

  register(email, name, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({email, name, password})
    })
    .then(this._checkResponse)
  };

  //аутентификация
  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
  };

  //выход из системы
  logout() {
    return fetch(`${this._url}/signout`, {
      method: "POST",
      credentials: "include",
      headers: this.headers,
    })
    .then(this._checkResponse)
  }

}

const mainApi = new MainApi({
  url: URL_MAIN_API,
  headers: {
    "content-type": "application/json",
  }
})

export default mainApi