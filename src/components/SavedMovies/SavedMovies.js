import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  savedUsersMovies,
  deleteMovie,
  valuesCheckbox,
  nameCheckbox,
  setSavedUsersMovies,
  searchText,
  setSearchText,
  setValuesCheckbox,
  resultSavedMovies,
  setResultSavedMovies
}) {

  const [isResult, setIsResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(resultSavedMovies.length === 0) {
      setIsResult(true)
    } else {
      setIsResult(false)
    }
  }, [resultSavedMovies])

  function searchMovies(data) {
    setIsLoading(true)

    let list = []
    savedUsersMovies.forEach(item => {
      if(item?.nameRU.toLowerCase().includes(data.toLowerCase())) {
        return list = [...list, item]
      }
      return list
    });
    setTimeout(() => {setIsLoading(false)}, 500)
    setResultSavedMovies(list);
  }

  function onChangeCheckbox(evt) {
    setIsLoading(true)

    let name = evt?.target.name;
    let checked = evt?.target.checked;

    setValuesCheckbox({
      ...valuesCheckbox,
      [name]: checked
    });

    let list = []

    if(!valuesCheckbox[name] && resultSavedMovies?.length > 0) {
      resultSavedMovies.forEach(item => {
      if(item.duration <= 40) {
        return list = [...list, item]
      }
      return list
    });
    setIsLoading(false)
    setResultSavedMovies(list);
    } else {
      searchMovies(searchText['searchMovieInSaved'])
    }
  }
  
  return (
    <>
      <Header
        openNavMenu={openNavMenu}
        closeNavMenu={closeNavMenu}
        isMenuOpen={isMenuOpen}/>

        <section className="movies page__movies">
          <SearchForm
           valuesCheckbox={valuesCheckbox}
           onChangeCheckbox={onChangeCheckbox}
           nameCheckbox={nameCheckbox}
           nameForm='searchMovieInSaved'
           list={savedUsersMovies}
           setList={setSavedUsersMovies}
           searchMovies={searchMovies}
           searchText={searchText}
            setSearchText={setSearchText} />
          {
            isLoading ? (
              <Preloader />
            ) : isResult ? (
              <p className="movies__result">Ничего не найдено</p>
            ) : (
              <MoviesCardList
                data={resultSavedMovies.length > 0 ? resultSavedMovies : savedUsersMovies}
                savedUsersMovies={savedUsersMovies}
                deleteMovie={deleteMovie} />
            )
          }
          
        </section>
        
      <Footer />
    </>
    
  )
}

export default SavedMovies