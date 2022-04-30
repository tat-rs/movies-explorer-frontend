import React from "react";

import "./Input.css";

function Input({
  id,
  name,
  type,
  labelText,
  value,
  onChange,
  className,
  required,
  error,
}) {
  return (
    <div className={`input__container ${className ? `input__container_type_${className}` : ''}`}>
      <label className={`label ${className ? `label_type_${className}` : ''}`} htmlFor={id}>
        {labelText}
      </label>
      <input
        className={`input ${className ? `input_type_${className}` : ''}`}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required} />
        <span className="error">{error || ''}</span>
    </div>
  )
}

export default Input