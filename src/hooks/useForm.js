import { useCallback, useState } from "react";

const validator = require('validator');

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


/* import { useCallback, useState } from "react";
import { ERROR_EMAIL_FORMAT, ERROR_NAME_FORMAT, RegExpEmail, RegExpName } from "../utils/constants";

const validator = require('validator');

export function useForm() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  function handleChangeEmail(evt) {

    let value = evt.target.value

    setEmail(value)

    if(!RegExpEmail.test(value)) {
      setErrorEmail(ERROR_EMAIL_FORMAT)
    } else {
      setErrorEmail(evt.target.validationMessage)
    }

    if(errorEmail === "") {
      setIsValidEmail(true)
    } else {
      setIsValidEmail(false)
    }
  
  }

  function handleChangePassword(evt) {

    let value = evt.target.value

    setPassword(value)

    setErrorPassword(evt.target.validationMessage)

    if(errorPassword === "") {
      setIsValidPassword(true)
    } else {
      setIsValidPassword(false)
    }
  
  }

  function handleChangeName(evt) {

    let value = evt.target.value

    setName(value)

    if(!RegExpName.test(value)) {
      setErrorName(ERROR_NAME_FORMAT)
    } else {
      setErrorName(evt.target.validationMessage)
    }

    if(errorName === "") {
      setIsValidName(true)
    } else {
      setIsValidName(false)
    }
  
  }

  //очистка формы
  const resetForm = useCallback(
    (email = '', name = '', password = '', errorEmail = '', errorName = '', errorPassword = '', isValidEmail = false, isValidName = false, isValidPassword = false) => {
      setEmail(email);
      setName(name);
      setPassword(password);
      setErrorEmail(errorEmail);
      setErrorName(errorName);
      setErrorPassword(errorPassword);
      setIsValidEmail(isValidEmail);
      setIsValidName(isValidName);
      setIsValidPassword(isValidPassword);
    }, [setEmail, setName, setPassword, setErrorEmail, setErrorName, setErrorPassword, setIsValidEmail, setIsValidName, setIsValidPassword]);

  return {
    email,
    name,
    password,
    errorEmail,
    errorName,
    errorPassword,
    setEmail,
    setName,
    setPassword,
    setIsValidEmail,
    setIsValidName,
    setIsValidPassword,
    isValidEmail,
    isValidName,
    isValidPassword,
    handleChangeEmail,
    handleChangeName,
    handleChangePassword,
    resetForm
  }
} */