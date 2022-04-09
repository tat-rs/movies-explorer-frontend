import React from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="page__search">
      <form className="search" name="search-movie">
        <label className="search__label" htmlFor="search-movie">
          <input 
            id="search-movie"
            name="search-movie"
            type="text"
            placeholder="Фильм"
            className="search__input" />
        </label>
        <button className="search__btn" type="submit">Найти</button>
      </form>
      <FilterCheckbox />
    </div>
  )
}

export default SearchForm