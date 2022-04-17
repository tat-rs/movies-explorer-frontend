import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import Pic1 from "../../images/pic-1.png";
import Pic2 from "../../images/pic-2.png";
import Pic3 from "../../images/pic-3.png";
import Pic4 from "../../images/pic-4.png";

import "./SavedMovies.css";
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

function SavedMovies() {
  return (
    <>
      <Header />
        <section className="movies">
          <SearchForm />
          <MoviesCardList data={data}/>
        </section>
      <Footer />
    </>
    
  )
}

export default SavedMovies