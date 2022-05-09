import { useForm } from "../../hooks/useForm";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";

function Register({
  nameForm,
  title,
  textOfButton,
  onRegister,
  errorMessage,
  setErrorMessage
}) {

  const {values, errors, isValid, handleChange, resetForm} = useForm();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values.email, values.name, values.password);
    resetForm();
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