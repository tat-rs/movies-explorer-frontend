import { useForm } from "../../hooks/useForm";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";

function Login({
  nameForm,
  title,
  textOfButton,
  onLogin,
  errorMessage,
  setErrorMessage
}) {
  const {values, errors, isValid, handleChange} = useForm();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <AuthForm 
      title={title}
      textOfButton={textOfButton}
      nameForm={nameForm}
      text="Ещё не зарегистрированы?"
      textOfLink="Регистрация"
      link="/signup"
      isValid={isValid}
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage} >

      <Input 
        className="auth-form"
        id="user-email"
        labelText="E-mail"
        type="email"
        name="email"
        value={values.email || ""} 
        onChange={handleChange}
        isValid={isValid}
        error={errors.email}
        required />

      <Input
        className="auth-form input_not-underline"
        id="user-password"
        labelText="Пароль"
        type="password"
        name="password"
        value={values.password || ""} 
        onChange={handleChange}
        isValid={isValid}
        error={errors.password}
        required />

    </AuthForm>
  )
}

export default Login