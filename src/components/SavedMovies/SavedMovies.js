import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import Pic1 from "../../images/pic-1.png";
import Pic2 from "../../images/pic-2.png";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const data = [
  {
    id: 1,
    image: Pic1,
    nameRU: "33 слова о дизайне",
    duration: "1ч 42м",
  },
  {
    id: 2,
    image: Pic2,
    nameRU: "Киноальманах «100 лет дизайна»",
    duration: "1ч 42м",
  },
]

function SavedMovies(props) {
  return (
    <>
      <Header handleMenuClick={props.handleMenuClick} isMenuOpen={props.isMenuOpen}/>
        <section className="movies page__movies">
          <SearchForm />
          <MoviesCardList data={data}/>
        </section>
      <Footer />
    </>
    
  )
}

export default SavedMovies