import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

import "./Movies.css";
import { useEffect } from "react";

function Movies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  isLoading,
  resultMovies,
  moviesList,
  searchMovies
}) {

  useEffect(() => {
    localStorage.setItem('resutlt', JSON.stringify(resultMovies))
  }, [resultMovies]);

  return (
    <>
    <Header
      openNavMenu={openNavMenu}
      closeNavMenu={closeNavMenu}
      isMenuOpen={isMenuOpen} />

      <section className="movies page__movies">
        <SearchForm searchMovies={searchMovies} />
        {
          isLoading ? (
            <Preloader />
          ) : (
            <>
              <MoviesCardList data={resultMovies.length > 0 ? resultMovies : moviesList}/>
              <button className="movies__button button">Ещё</button>
            </>
          )
        }
      </section>
    <Footer />
    </>
  )
}

export default Movies