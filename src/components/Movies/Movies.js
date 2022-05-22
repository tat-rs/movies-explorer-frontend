import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./Movies.css";
import { useState } from "react";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";

function Movies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
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

  async function searchMovies(data) {

    try {
      setIsLoading(true)
      const moviesList = await moviesApi.getAllMovies()

      let list = []
    
      moviesList?.forEach(item => {
        if(item?.nameRU.toLowerCase().includes(data.toLowerCase())) {
          return list = [...list, item]
        }
        return list
      });
      setResultMovies(list);
      setIsLoading(false)
    }

    catch {
      setIsLoading(false)
    }
    
  }

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
    } else if(!Object.keys(searchText).length || !searchText[nameForm] || searchText[nameForm] === "") {
      return
    }
      else {
      searchMovies(searchText[nameForm])
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
          nameForm={nameForm}
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