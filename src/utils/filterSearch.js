import { MAX_DURATION_SHORTFILMS } from "./constants";

export function findMoviesByWord(moviesList, searchText) {
  let list = [];
  moviesList?.forEach(item => {
      if(item?.nameRU.toLowerCase().includes(searchText.toLowerCase())) {
        return list = [...list, item]
      }
      return list
    });
  return list
};

export function findShortMovies(moviesList) {
  let list = []
  moviesList?.forEach(item => {
    if(item.duration <= MAX_DURATION_SHORTFILMS) {
      return list = [...list, item]
    }
    return list
  });
  return list
};