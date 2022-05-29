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
    if(item.duration <= 40) {
      return list = [...list, item]
    }
    return list
  });
  return list
};