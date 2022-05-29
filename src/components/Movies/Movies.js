import { useEffect, useState } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

import "./Movies.css";

import { useWindowSize } from "../../hooks/useWindowSize";
import { findMoviesByWord, findShortMovies } from "../../utils/filterSearch";
import {
  ADDED_COUNT_MOVIES_MAX,
  ADDED_COUNT_MOVIES_MIN,
  COUNT_MOVIES_IN_MAX_SIZE_SCREEN,
  COUNT_MOVIES_IN_MIDDLE_SIZE_SCREEN,
  COUNT_MOVIES_IN_MIN_SIZE_SCREEN,
  MAX_SIZE_SCREEN,
  MIDDLE_SIZE_SCREEN,
  MIN_SIZE_SCREEN
} from "../../utils/constants";

function Movies({
  isLoggedIn,
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  isLoading,
  allMoviesList,
  resultMovies,
  setResultMovies,
  saveMovie,
  savedUsersMovies,
  deleteMovie,
  searchText,
  setSearchText,
  nameCheckbox,
  valuesCheckbox,
  setValuesCheckbox,
  nameForm
}) {

  const [index, setIndex] = useState(localStorage.getItem('count') || '0');
  const [limitCount, setLimitCount] = useState(0);
  const [addedCount, setAddedCount] = useState(0);
  //массив с отрендеринными карточками
  const [renderedMoviesList, setRenderedMoviesList] = useState(
    JSON.parse(localStorage.getItem('renderedMoviesList')) || []);
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem('shortMovies')) || []);
  const [isActiveBtn, setIsActiveBtn] = useState(false);

  const {width} = useWindowSize();

  useEffect(() => {
    //кол-во карточек при определенной ширине экрана
    if(width > MAX_SIZE_SCREEN) {
      setLimitCount(COUNT_MOVIES_IN_MAX_SIZE_SCREEN)
      setAddedCount(ADDED_COUNT_MOVIES_MAX)
    } else if(width <= MAX_SIZE_SCREEN && width > MIDDLE_SIZE_SCREEN) {
      setLimitCount(COUNT_MOVIES_IN_MIDDLE_SIZE_SCREEN)
      setAddedCount(ADDED_COUNT_MOVIES_MIN)
    } else if(width <= MIDDLE_SIZE_SCREEN && width >= MIN_SIZE_SCREEN) {
      setLimitCount(COUNT_MOVIES_IN_MIN_SIZE_SCREEN)
      setAddedCount(ADDED_COUNT_MOVIES_MIN)
    }
  }, [width])

  useEffect(() => {
    if(valuesCheckbox[nameCheckbox]) {
      const list = findShortMovies(resultMovies)
      setShortMovies(list);
      setRenderedMoviesList(list.slice(0, index))
    } else {
      setShortMovies([])
      setRenderedMoviesList(resultMovies.slice(0, index))
    }
  }, [index, nameCheckbox, resultMovies, valuesCheckbox])

  useEffect(() => {
    localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
  }, [shortMovies, valuesCheckbox])

  useEffect(() => {
    localStorage.setItem('count', index);
    localStorage.setItem('renderedMoviesList', JSON.stringify(renderedMoviesList.slice(0, index)));

    if((!valuesCheckbox[nameCheckbox] && renderedMoviesList.length < resultMovies.length) ||
      (valuesCheckbox[nameCheckbox && renderedMoviesList.length < shortMovies.length])) {
        setIsActiveBtn(true);
      } else {
        setIsActiveBtn(false);
      }
  }, [index, limitCount, renderedMoviesList, resultMovies, shortMovies])

  function searchMovies(data) {
    setIndex(limitCount)
    const list = findMoviesByWord(allMoviesList, data)
    setResultMovies(list); //обновляем стейт результата поиска
  }

  //фильтруем результат поиска в зависимости от состояния чекбокса
  function onChangeCheckbox(evt) {

    let name = evt?.target.name;
    let checked = evt?.target.checked;

    setValuesCheckbox({
      ...valuesCheckbox,
      [name]: checked
    });
  }

  //показать больше результат по клике на кнопку
  function addedMoreMovies() {
    setRenderedMoviesList(renderedMoviesList.slice(0, index + addedCount))
    if(index - addedCount < renderedMoviesList.length) {
      setIndex(index + addedCount)
    } else {
      setIndex(renderedMoviesList.length)
      setIsActiveBtn(false)
    }
  }

  return (
    <>
    <Header
      isLoggedIn={isLoggedIn}
      openNavMenu={openNavMenu}
      closeNavMenu={closeNavMenu}
      isMenuOpen={isMenuOpen} />

      <section className="movies page__movies">
        <SearchForm
          nameCheckbox={nameCheckbox}
          nameForm={nameForm}
          valuesCheckbox={valuesCheckbox}
          onChangeCheckbox={onChangeCheckbox}
          list={resultMovies}
          setList={setResultMovies}
          searchMovies={searchMovies}
          resultMovies={resultMovies}
          searchText={searchText}
          setSearchText={setSearchText} />

          {
            isLoading ? (
              <Preloader />
            ) : renderedMoviesList.length > 0 ? (
              <>
                <MoviesCardList
                  data={renderedMoviesList}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie} 
                  savedUsersMovies={savedUsersMovies} />
                  {
                    isActiveBtn && (
                      <button className="movies__button button" onClick={addedMoreMovies}>Ещё</button>
                    )
                  }
              </>
            ) : (
              <p className="movies__result">Ничего не найдено</p>
            )
          }
      </section>
    <Footer />
    </>
  )
}

export default Movies