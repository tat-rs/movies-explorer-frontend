import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  savedUsersMovies,
  deleteMovie,
  errorMessage
}) {
  
  return (
    <>
      <Header
        openNavMenu={openNavMenu}
        closeNavMenu={closeNavMenu}
        isMenuOpen={isMenuOpen}/>

        <section className="movies page__movies">
          <SearchForm />
          {
            savedUsersMovies.length > 0 ? (
              <MoviesCardList
                data={savedUsersMovies}
                savedUsersMovies={savedUsersMovies}
                deleteMovie={deleteMovie} />
            ) : (
              <p className="movies__result">{errorMessage}</p>
            )
          }
          
        </section>
        
      <Footer />
    </>
    
  )
}

export default SavedMovies