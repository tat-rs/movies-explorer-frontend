import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./Movies.css";
import { useState } from "react";
import Preloader from "../Preloader/Preloader";

function Movies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  resultMovies,
  moviesList,
  setResultMovies,
  saveMovie,
  savedUsersMovies,
  deleteMovie,
  searchText,
  setSearchText,
  nameCheckbox,
  valuesCheckbox,
  setValuesCheckbox
}) {

  const [isLoading, setIsLoading] = useState(false);

  function searchMovies(data) {
    setIsLoading(true)
    
    let list = []
    
    moviesList?.forEach(item => {
      if(item?.nameRU.toLowerCase().includes(data.toLowerCase())) {
        return list = [...list, item]
      }
      return list
    });
    setIsLoading(false)
    setResultMovies(list);
    
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

    if(!valuesCheckbox[name] && resultMovies?.length > 0) {
      resultMovies.forEach(item => {
      if(item.duration <= 40) {
        return list = [...list, item]
      }
      return list
    });
    setTimeout(() => {setIsLoading(false)}, 500)
    setResultMovies(list);
    } else {
      searchMovies(searchText['searchMovieInAll'])
    }
  }

  return (
    <>
    <Header
      openNavMenu={openNavMenu}
      closeNavMenu={closeNavMenu}
      isMenuOpen={isMenuOpen} />

      <section className="movies page__movies">
        <SearchForm
          valuesCheckbox={valuesCheckbox}
          onChangeCheckbox={onChangeCheckbox}
          nameCheckbox={nameCheckbox}
          nameForm='searchMovieInAll'
          list={resultMovies}
          setList={setResultMovies}
          searchMovies={searchMovies}
          resultMovies={resultMovies}
          searchText={searchText}
          setSearchText={setSearchText} />

          {
            isLoading ? (
              <Preloader />
            ) : resultMovies.length > 0 ? (
              <>
                <MoviesCardList
                  data={resultMovies}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie} 
                  savedUsersMovies={savedUsersMovies} />
                <button className="movies__button button">Ещё</button>
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