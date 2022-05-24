import { useEffect, useState } from "react";

import moviesApi from "../../utils/MoviesApi";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

import "./Movies.css";

import { ERROR_SEARCH_MOVIES } from "../../utils/constants";
import { useWindowSize } from "../../hooks/useWindowSize";

function Movies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  isLoggedIn,
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

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [index, setIndex] = useState(localStorage.getItem('count') || '0');
  const [limitCount, setLimitCount] = useState(0);
  const [addedCount, setAddedCount] = useState(0);
  //массив с отрендеринными карточками
  const [renderedMoviesList, setRenderedMoviesList] = useState(
    JSON.parse(localStorage.getItem('renderedMoviesList')) || []);
  const [isActiveBtn, setIsActiveBtn] = useState(false);

  const {width} = useWindowSize();

  useEffect(() => {
    //кол-во карточек при определенной ширине
    if(width > 768) {
      setLimitCount(12)
      setAddedCount(3)
    } else if(width <= 768 && width > 480) {
      setLimitCount(8)
      setAddedCount(2)
    } else if(width <= 480 && width >= 320) {
      setLimitCount(5)
      setAddedCount(2)
    }
  }, [width])

  useEffect(() => {
    localStorage.setItem('count', index);
    localStorage.setItem('renderedMoviesList', JSON.stringify(renderedMoviesList));

    if(renderedMoviesList.length < resultMovies.length) {
      setIsActiveBtn(true);
    } else if(renderedMoviesList.length === resultMovies.length) {
      setIsActiveBtn(false);
    }
  }, [renderedMoviesList])

  async function searchMovies(data) {

    try {
      setIndex(limitCount)
      setIsLoading(true)
      const moviesList = await moviesApi.getAllMovies(); //сохраняем все фильмы с сервера

      let list = []
      //фильтруем фильмы по ключевому слову
      moviesList?.forEach(item => {
        if(item?.nameRU.toLowerCase().includes(data.toLowerCase())) {
          return list = [...list, item]
        }
        return list
      });
      setResultMovies(list); //обновляем стейт результата поиска
      setRenderedMoviesList(list.slice(0, limitCount)); //рендерим макс. кол-во карточек, доступные при заданой ширине
      setIsLoading(false)
    }

    catch {
      setIndex(0)
      setErrorMessage(ERROR_SEARCH_MOVIES)
      setIsLoading(false)
    }
    
  }
  //фильтруем результат поиска в зависимости от состояния чекбокса
  function onChangeCheckbox(evt) {

    let name = evt?.target.name;
    let checked = evt?.target.checked;

    setValuesCheckbox({
      ...valuesCheckbox,
      [name]: checked
    });

    let list = []

    if(!valuesCheckbox[name] && resultMovies?.length !== 0 ) {
      resultMovies.forEach(item => {
      if(item.duration <= 40) {
        return list = [...list, item]
      }
      return list
    });
    setResultMovies(list);
    setRenderedMoviesList(list.slice(0, limitCount));
    } else if(!Object.keys(searchText).length || !searchText[nameForm] || searchText[nameForm] === "") {
      return
    }
      else {
      searchMovies(searchText[nameForm])
    }
  }
  //показать больше результат по клике на кнопку
  function addedMoreMovies() {
    setRenderedMoviesList(resultMovies.slice(0, index + addedCount))
    if(index - addedCount < resultMovies.length) {
      setIndex(index + addedCount)
    } else {
      setIndex(resultMovies.length)
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
              <p className="movies__result">{errorMessage ? errorMessage : "Ничего не найдено"}</p>
            )
          }
      </section>
    <Footer />
    </>
  )
}

export default Movies