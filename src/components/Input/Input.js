import "./Input.css";

function Input({
  id,
  name,
  type,
  labelText,
  placeholder,
  value,
  onChange,
  className,
  required,
  error
}) {

  return (
    <div className={`input__container ${className ? `input__container_type_${className}` : ''}`}>
      <label className={`label ${className ? `label_type_${className}` : ''}`} htmlFor={id}>
        {labelText}
        <input
        className={`input ${className ? `input_type_${className}` : ''}`}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required} />
      </label>
      <span className={`error ${className ? `error_type_${className}` : ''}`}>{error || ''}</span>
    </div>
  )
}

export default Input