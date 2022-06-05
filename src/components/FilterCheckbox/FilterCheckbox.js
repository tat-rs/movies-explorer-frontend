import "./FilterCheckbox.css";

function FilterCheckbox({
  name,
  onChangeCheckbox,
  values
}) {

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