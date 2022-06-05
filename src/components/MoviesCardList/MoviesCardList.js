import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({
  data,
  saveMovie,
  savedUsersMovies,
  deleteMovie
}) {
  
  return (
    <ul className="movies-list">
      {
        data.length > 0 && data.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            saveMovie={saveMovie}
            savedUsersMovies={savedUsersMovies}
            deleteMovie={deleteMovie} />
        ))
      }
    </ul>
  )
}

export default MoviesCardList