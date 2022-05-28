import { useEffect } from "react";

import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";

import { useForm } from "../../hooks/useForm";
import { ERROR_EMAIL_FORMAT, ERROR_NAME_FORMAT, RegExpEmail, RegExpName } from "../../utils/constants";

function Register({
  nameForm,
  title,
  textOfButton,
  onRegister,
  errorMessage,
  setErrorMessage,
}) {

  const {values, errors, isValid, handleChange, resetForm} = useForm();

  useEffect(() => {
    resetForm()
    setErrorMessage('')
  }, [])

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values.email, values.name, values.password);
  }

  return (
    <AuthForm 
      title={title}
      textOfButton={textOfButton}
      nameForm={nameForm}
      text="Уже зарегистрированы?"
      textOfLink="Войти"
      link="/signin"
      isValid={isValid}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage} >

      <Input 
        className="auth-form"
        id="user-name"
        labelText="Имя"
        type="text"
        name="name"
        value={values.name || ""}
        error={errors.name}
        pattern="^[а-яА-ЯёЁa-zA-Z\s/-]+$"
        minLength="2"
        maxLength="30"
        title={ERROR_NAME_FORMAT}
        isValid={isValid}
        onChange={handleChange}
        required
      />
      <Input 
        className="auth-form"
        id="user-email"
        labelText="E-mail"
        type="email"
        name="email"
        value={values.email || ""} 
        error={errors.email}
        pattern='[^\s@]+@[^\s@]+\.[^\s@]{2,}$'
        title={ERROR_EMAIL_FORMAT}
        isValid={isValid}
        onChange={handleChange}
        required
      />
      <Input 
        className="auth-form"
        id="user-password"
        labelText="Пароль"
        type="password"
        name="password"
        value={values.password || ""} 
        onChange={handleChange}
        error={errors.password}
        isValid={isValid}
        required
      />
    </AuthForm>
  )
}

export default Register