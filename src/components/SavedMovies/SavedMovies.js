import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  savedUsersMovies,
  deleteMovie,
  valuesCheckbox,
  nameCheckbox,
  setSavedUsersMovies,
  searchText,
  setSearchText,
  setValuesCheckbox,
  resultSavedMovies,
  setResultSavedMovies,
  nameForm
}) {

  function searchMovies(data) {

    let list = []
    savedUsersMovies.forEach(item => {
      if(item?.nameRU.toLowerCase().includes(data.toLowerCase())) {
        return list = [...list, item]
      }
      return list
    });
    setResultSavedMovies(list);
  }

  function onChangeCheckbox(evt) {

    let name = evt?.target.name;
    let checked = evt?.target.checked;

    setValuesCheckbox({
      ...valuesCheckbox,
      [name]: checked
    });

    let list = []

    if(!valuesCheckbox[name] && resultSavedMovies?.length > 0) {
      resultSavedMovies.forEach(item => {
      if(item.duration <= 40) {
        return list = [...list, item]
      }
      return list
    });
    setResultSavedMovies(list);
    } else if(valuesCheckbox[name] && (!Object.keys(searchText).length || !searchText[nameForm] || searchText[nameForm] === "")) {
      setResultSavedMovies(savedUsersMovies)
    } else {
      searchMovies(searchText[nameForm])
    }
  }
  
  return (
    <>
      <Header
        openNavMenu={openNavMenu}
        closeNavMenu={closeNavMenu}
        isMenuOpen={isMenuOpen}/>

        <section className="movies page__movies">
          <SearchForm
            valuesCheckbox={valuesCheckbox}
            onChangeCheckbox={onChangeCheckbox}
            nameCheckbox={nameCheckbox}
            nameForm={nameForm}
            list={savedUsersMovies}
            setList={setSavedUsersMovies}
            searchMovies={searchMovies}
            searchText={searchText}
            setSearchText={setSearchText} />
            
            <MoviesCardList
              data={resultSavedMovies}
              savedUsersMovies={savedUsersMovies}
              deleteMovie={deleteMovie} />
            {
              savedUsersMovies.length === 0 && (
                <p className="movies__result">У вас нет сохраненных фильмов</p>
              )
            }

            {
              savedUsersMovies.length !== 0 && resultSavedMovies.length === 0 && (
                <p className="movies__result">Ничего не найдено</p>
              )
            }
          
        </section>
        
      <Footer />
    </>
    
  )
}

export default SavedMovies