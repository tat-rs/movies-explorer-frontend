import "./FilterCheckbox.css";

function FilterCheckbox({
  searchMovies,
  searchText,
  list,
  setList,
  name,
  onChangeCheckbox,
  values
}) {

 /*  function onChangeCheckbox(evt) {
    let name = evt?.target.name;
    let checked = evt?.target.checked;

    //объект с инф-ии о значениях в инпуте
    setValues({
      ...values,
      [name]: checked
    });

    let list = []

    if(!values[name] && resultMovies?.length > 0) {
      resultMovies.forEach(item => {
      if(item.duration < 40) {
        return list = [...list, item]
      }
      return list
    });
    setResultMovies(list);
    } else {
      searchMovies(searchText)
    }
  } */

  return (
    <label className="checkbox" htmlFor={name}>
      <input
        className="checkbox__input"
        type="checkbox"
        id={name}
        name={name}
        checked={values[name] || false}
        onChange={onChangeCheckbox} />
      <div className="checkbox__circle"></div>
    </label>
  )
}

export default FilterCheckbox