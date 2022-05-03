import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ data }) {
  
  return (
    <ul className="movies-list">
      {
        data && data.map((item) => (
          <MoviesCard
            key={item.id}
            image={item.image.url}
            nameRU={item.nameRU}
            duration={item.duration} />
        ))
      }
    </ul>
  )
}

export default MoviesCardList