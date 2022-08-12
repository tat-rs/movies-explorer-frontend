import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { findMoviesByWord, findShortMovies } from "../../utils/filterSearch";
import { useEffect, useState } from "react";

function SavedMovies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  isLoggedIn,
  savedUsersMovies,
  setSavedUsersMovies,
  deleteMovie,
  valuesCheckbox,
  nameCheckbox,
  searchText,
  setSearchText,
  setValuesCheckbox,
  resultSavedMovies,
  setResultSavedMovies,
  nameForm
}) {

  const [renderedSavedMovies, setRenderedSavedMovies] = useState([]);

  useEffect(() => {
    return () => {
      setValuesCheckbox({
        ...valuesCheckbox,
        [nameCheckbox]: !valuesCheckbox
      });
      setSearchText({
        ...searchText,
        [nameForm]: ''
      })
    }
  }, [])

  useEffect(() => {
    if(searchText[nameForm] === '' && !nameCheckbox) {
      setRenderedSavedMovies(savedUsersMovies)
    } else if(valuesCheckbox[nameCheckbox]) {
      const list = findShortMovies(resultSavedMovies)
      setRenderedSavedMovies(list);
    } else {
      setRenderedSavedMovies(resultSavedMovies)
    }
  }, [nameCheckbox, resultSavedMovies, savedUsersMovies, valuesCheckbox])

  function searchMovies(data) {
    const list = findMoviesByWord(savedUsersMovies, data)
    setResultSavedMovies(list);
  }

  function onChangeCheckbox(evt) {

    let name = evt?.target.name;
    let checked = evt?.target.checked;

    setValuesCheckbox({
      ...valuesCheckbox,
      [name]: checked
    });
  }
  
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        openNavMenu={openNavMenu}
        closeNavMenu={closeNavMenu}
        isMenuOpen={isMenuOpen}/>

        <section className="movies page__movies">
          <SearchForm
            valuesCheckbox={valuesCheckbox}
            onChangeCheckbox={onChangeCheckbox}
            nameCheckbox={nameCheckbox}
            nameForm={nameForm}
            list={savedUsersMovies}
            setList={setSavedUsersMovies}
            searchMovies={searchMovies}
            searchText={searchText}
            setSearchText={setSearchText} />
            
            <MoviesCardList
              data={renderedSavedMovies}
              savedUsersMovies={savedUsersMovies}
              deleteMovie={deleteMovie} />
            {
              savedUsersMovies.length === 0 && (
                <p className="movies__result">У вас нет сохраненных фильмов</p>
              )
            }

            {
              savedUsersMovies.length !== 0 && renderedSavedMovies.length === 0 && (
                <p className="movies__result">Ничего не найдено</p>
              )
            }
          
        </section>
        
      <Footer />
    </>
    
  )
}

export default SavedMovies