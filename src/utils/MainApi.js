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
      headers: this.headers,
    })
    .then(this._checkResponse)
  }

  addNewMovie(Movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
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