import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({data}) {
  
  return (
    <ul className="movies-list">
      {
        data.map((item) => (
          <MoviesCard key={item.id} image={item.image} nameRU={item.nameRU} duration={item.duration} />
        ))
      }
    </ul>
  )
}

export default MoviesCardList