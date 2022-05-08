import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const data = [
  {
    id: 1,
    image: {
      url: '/uploads/all_tommoros_parties_33a125248d.jpeg'
    },
    nameRU: "33 слова о дизайне",
    duration: "129",
  },
  {
    id: 2,
    image: {
      url: '/uploads/all_tommoros_parties_33a125248d.jpeg'
    },
    nameRU: "Киноальманах «100 лет дизайна»",
    duration: "99",
  },
]

function SavedMovies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen
}) {
  return (
    <>
      <Header
        openNavMenu={openNavMenu}
        closeNavMenu={closeNavMenu}
        isMenuOpen={isMenuOpen}/>

        <section className="movies page__movies">
          <SearchForm />
          <MoviesCardList data={data}/>
        </section>
        
      <Footer />
    </>
    
  )
}

export default SavedMovies