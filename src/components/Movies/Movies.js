import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

import "./Movies.css";

function Movies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  isLoading,
  resultMovies,
  searchMovies,
}) {

  return (
    <>
    <Header
      openNavMenu={openNavMenu}
      closeNavMenu={closeNavMenu}
      isMenuOpen={isMenuOpen} />

      <section className="movies page__movies">
        <SearchForm searchMovies={searchMovies} />
        {
          resultMovies.length > 0 ? (
            <>
              <MoviesCardList resultMovies={resultMovies}/>
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