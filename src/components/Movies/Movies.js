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
  moviesList
}) {
  return (
    <>
    <Header
      openNavMenu={openNavMenu}
      closeNavMenu={closeNavMenu}
      isMenuOpen={isMenuOpen} />

      <section className="movies page__movies">
        <SearchForm />
        {
          isLoading ? (
            <Preloader />
          ) : (
            <>
              <MoviesCardList data={moviesList}/>
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