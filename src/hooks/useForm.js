import { useCallback, useState } from "react";
import {
  ERROR_INCORRECT_EMAIL,
  ERROR_NAME_FORMAT,
  ERROR_NAME_LENGTH,
  ERROR_REQUIRED,
  RegExpEmail,
  RegExpName
} from "../utils/constants";

export function useForm() {

  const [values, setValues] = useState({}); //состояние значений инпутов формы

  const [errors, setErrors] = useState({}); //состояние ошибок инпутов формы

  const [isValid, setIsValid] = useState(false); //состояние валидности формы

  //проверка ошибки
  function handleError(name, value, evt) {
    switch (name) {
      case 'name':
        //обязательное поле
        if(!RegExpName.test(evt.target.value)) {
          setErrors({
            ...errors, [name]: ERROR_NAME_FORMAT
          })
        } else {
          setErrors({
            ...errors, [name]: evt.target.validationMessage
          })
        }
        break;
      case 'email':
        //обязательное поле
        if(!RegExpEmail.test(value)) {
          setErrors({
            ...errors, [name]: ERROR_INCORRECT_EMAIL
          })
        } else {
          setErrors({
            ...errors, [name]: evt.target.validationMessage
          })
        }
        break;
      case 'password':
        setErrors({
          ...errors, [name]: evt.target.validationMessage
        })
        break;
      default: break
    }
  }

  //обработчик изменения значения инпута
  function handleChange(evt) {

    let name = evt.target.name
    let value = evt.target.value

    setValues({...values, [name] : value,})

    handleError(name, value, evt)

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
