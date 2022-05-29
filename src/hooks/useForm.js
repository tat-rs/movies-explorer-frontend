import { useCallback, useState } from "react";

export function useForm() {

  const [values, setValues] = useState({});

  const [errors, setErrors] = useState({});

  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {

    let name = evt.target.name
    let value = evt.target.value

    setValues({
      ...values,
      [name] : value,
    })

    setErrors({
      ...errors,
      [name]: evt.target.validationMessage
    })
    
    setIsValid(evt.target.closest(".form").checkValidity())
  }

  //очистка формы
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

  return {
    values,
    errors,
    isValid,
    setValues,
    setErrors,
    setIsValid,
    handleChange,
    resetForm
  }
}
