import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <label className="checkbox" htmlFor="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        id="checkbox"
        name="checkbox" />
      <div className="checkbox__circle"></div>
    </label>
  )
}

export default FilterCheckbox