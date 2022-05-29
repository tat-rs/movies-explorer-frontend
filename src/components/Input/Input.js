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
  error,
  pattern,
  minLength,
  maxLength,
  title,
  disabled
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
          required={required}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          title={title}
          disabled={disabled} />
    </label>
    <span className={`error ${className ? `error_type_${className}` : ''}`}>{error && title ? title : (error || '')}</span>
  </div>
  )
}

export default Input