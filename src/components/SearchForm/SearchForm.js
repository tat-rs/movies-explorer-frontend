import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import "./SearchForm.css";

function SearchForm({
  searchMovies
}) {

  const [values, setValues] = useState({});

  function handleChangeInput(evt) {
    let name = evt.target.name
    let value = evt.target.value

    setValues({
      ...values,
      [name] : value,
    })
  }

  function onSubmit(evt) {
    evt.preventDefault()
    searchMovies(values.searchMovie)
  }

  return (
    <div className="page__search">
      <form className="search movies__search" name="search-movie" onSubmit={onSubmit}>
        <label className="search__label" htmlFor="search-movie">
          <input
            className="search__input"
            id="search-movie"
            name="searchMovie"
            type="text"
            placeholder="Фильм"
            value={values.searchMovie || ""} 
            onChange={handleChangeInput}
            required />
        </label>
        <button className="search__btn button" type="submit">Найти</button>
      </form>
      <div className="search__checkbox">
        <FilterCheckbox />
        <p className="search__checkbox-text">Короткометражки</p>
      </div>
    </div>
  )
}

export default SearchForm