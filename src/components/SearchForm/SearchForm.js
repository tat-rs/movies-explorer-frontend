import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Input from "../Input/Input";

import "./SearchForm.css";

function SearchForm({
  nameCheckbox,
  nameForm,
  searchMovies,
  list,
  setList,
  searchText,
  setSearchText,
  valuesCheckbox,
  onChangeCheckbox,
}) {

  const {values, setValues, isValid, handleChange} = useForm();

  useEffect(() => {
    setValues({
      ...values,
      [nameForm]: searchText[nameForm],
    })
  }, [])

  function onSubmit(evt) {
    evt.preventDefault()
    setSearchText({
      ...searchText,
      [nameForm]: values[nameForm]
    })
    searchMovies(values[nameForm])
  }

  return (
    <div className="page__search">
      <form className="form search movies__search" name={nameForm} onSubmit={onSubmit} noValidate>
        <label className="search__label" htmlFor="search-movie">
          <Input
            className="search-form"
            id="search-movie"
            name={nameForm}
            type="text"
            placeholder="Фильм"
            value={values[nameForm] || ''}
            onChange={handleChange}
            required />
        </label>
        <button className="search__btn button" type="submit" disabled={!isValid}>Найти</button>
      </form>
      <div className="search__checkbox">
        <FilterCheckbox
          values={valuesCheckbox}
          onChangeCheckbox={onChangeCheckbox}
          name={nameCheckbox} />
        <p className="search__checkbox-text">Короткометражки</p>
      </div>
    </div>
  )
}

export default SearchForm