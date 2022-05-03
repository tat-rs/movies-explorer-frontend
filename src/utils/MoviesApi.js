import { URL_MOVIE_API } from "./constants";

class MoviesApi {
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
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this.headers,
    })
    .then(this._checkResponse)
  }
}

const moviesApi = new MoviesApi({
  url: URL_MOVIE_API,
  headers: {
    "content-type": "application/json",
  }
})

export default moviesApi