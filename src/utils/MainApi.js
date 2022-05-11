import { URL_MAIN_API } from "./constants";

class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    /* if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`) */
    try {
      if (res.status === 200 || res.status === 201){
        return res.json();
      }
    } catch(error){
      return (error)
    }
  }

  getAllMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
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

  //получаем данные пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  
  //редактируем данные пользователя
 uptadeUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({name, email})
    })
    .then(this._checkResponse)
  }

  //проверка токена
  getContent() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this.headers,
    })
    .then(this._checkResponse)
  }

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