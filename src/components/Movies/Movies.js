import { useEffect, useState } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

import Pic1 from "../../images/pic-1.png";
import Pic2 from "../../images/pic-2.png";
import Pic3 from "../../images/pic-3.png";
import Pic4 from "../../images/pic-4.png";

import "./Movies.css";

const data = [
  {
    id: 1,
    image: Pic1,
    nameRU: "33 слова о дизайне",
    duration: "1ч 20м",
  },
  {
    id: 2,
    image: Pic2,
    nameRU: "Киноальманах «100 лет дизайна»",
    duration: "1ч 42м",
  },
  {
    id: 3,
    image: Pic3,
    nameRU: "В погоне за Бенкси",
    duration: "1ч 42м",
  },
  {
    id: 4,
    image: Pic4,
    nameRU: "Баския: Взрыв реальности",
    duration: "1ч 42м",
  },
  {
    id: 5,
    image: Pic1,
    nameRU: "33 слова о дизайне",
    duration: "1ч 42м",
  },
  {
    id: 6,
    image: Pic2,
    nameRU: "Киноальманах «100 лет дизайна»",
    duration: "1ч 42м",
  },
  {
    id: 7,
    image: Pic3,
    nameRU: "В погоне за Бенкси",
    duration: "1ч 42м",
  },
  {
    id: 8,
    image: Pic4,
    nameRU: "Баския: Взрыв реальности Баския: Взрыв реальности Баския: Взрыв реальности Баския: Взрыв реальности",
    duration: "1ч 42м",
  }
]

function Movies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000)
  }, [])
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
              <MoviesCardList data={data}/>
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