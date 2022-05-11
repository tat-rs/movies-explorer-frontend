import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ resultMovies }) {
  
  return (
    <ul className="movies-list">
      {
        resultMovies.length > 0 && resultMovies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))
      }
    </ul>
  )
}

export default MoviesCardList