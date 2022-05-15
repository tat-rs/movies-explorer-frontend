export const URL_MOVIE_API = 'https://api.nomoreparties.co/beatfilm-movies';
/*  export const URL_MAIN_API = 'https://api.movie-explorer22.nomoredomains.work'; */
export const URL_MAIN_API = 'http://localhost:3000';

export const RegExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const RegExpName = new RegExp(/^[а-яА-ЯёЁa-zA-Z\s/-]+$/);

export const ERROR_REQUIRED = "Вы пропустили это поле";

export const ERROR_NAME_LENGTH = "Имя пользователя должно содержать от 2 до 30 символов";

export const ERROR_NAME_FORMAT = "Имя пользователя должно содержать только латиницу, кириллицу, пробел или дефис";

export const ERROR_INCORRECT_EMAIL = "Введен некорректный эл. адрес";

export const ERROR_REGISTER = "Пользователь с таким email уже существует";

export const ERROR_AUTH = "Вы ввели неправильный логин или пароль";

export const ERROR_UPTADE_PROFILE = "При обновлении профиля произошла ошибка";