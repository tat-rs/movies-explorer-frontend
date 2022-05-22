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

  register(email, name, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({email, name, password})
    })
    .then(this._checkResponse)
  };

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  
  uptadeUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({name, email})
    })
    .then(this._checkResponse)
  }

  getContent() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this.headers,
    })
    .then(this._checkResponse)
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: "POST",
      credentials: "include",
      headers: this.headers,
    })
    .then(this._checkResponse)
  }

  getAllMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  
  saveMovie(movie) {
    const savedMovie = {
      country: movie.country || "Не указано",
      director: movie.director || "Не указано",
      duration: movie.duration || "Не указано",
      year: movie.year || "Не указано",
      description: movie.description || "Не указано",
      image:movie.image || "Не указано",
      trailerLink: movie.trailerLink || "https://youtu.be",
      nameRU: movie.nameRU || "Не указано",
      nameEN: movie.nameEN || "Не указано",
      thumbnail: movie.thumbnail || "Не указано",
      movieId: movie.movieId || "Не указано",
    }
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(savedMovie)
    })
    .then(this._checkResponse)
  }

}

const mainApi = new MainApi({
  url: URL_MAIN_API,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default mainApi