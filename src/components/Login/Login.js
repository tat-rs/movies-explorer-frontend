import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";

function Login({nameForm, title, textOfButton}) {
  const [values, setValues] = React.useState({});

  function handleChangeInput(evt) {
    let name = evt.target.name
    let value = evt.target.value

    setValues({
      ...values,
      [name] : value,
    })
  }

  return (
    <AuthForm title={title} textOfButton={textOfButton} nameForm={nameForm} text="Ещё не зарегистрированы?" textOfLink="Регистрация" link="/signup">
      <Input 
        className='auth-form'
        id='user-email'
        labelText='E-mail'
        type='email'
        name='email'
        value={values.email || ''} 
        onChange={handleChangeInput}
        required
      />
      <Input
        className='auth-form'
        id='user-password'
        labelText='Пароль'
        type='password'
        name='password'
        value={values.password || ''} 
        onChange={handleChangeInput}
        required
      />
    </AuthForm>
  )
}

export default Login