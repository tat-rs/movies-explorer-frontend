import { useState } from "react";

export function useForm() {

  const [values, setValues] = useState({}); //состояние значений инпутов формы

  const [errors, setErrors] = useState({}); //состояние ошибок инпутов формы

  const [isValid, setValid] = useState(false); //состояние валидности формы


  function handleChange(evt) {

    let name = evt.target.name
    let value = evt.target.value

    //объект с инф-ии о значениях в инпуте
    setValues({
      ...values,
      [name] : value,
    })

    //объект с инф-ии об ошибках в инпуте
    setErrors({
      ...errors,
      [evt.target.name]: evt.target.validationMessage
    })

    setValid(evt.target.closest(".form").checkValidity());//состояние валидности формы
  }

  return {
    values,
    errors,
    isValid,
    setValues,
    setErrors,
    setValid,
    handleChange,
  }
}