import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import Input from "../Input/Input";

import "./Register.css";

function Register({nameForm, title, textOfButton}) {
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
    <AuthForm title={title} textOfButton={textOfButton} nameForm={nameForm} text="Уже зарегистрированы?" textOfLink="Войти" link="/signin">
      <Input 
        className='auth-form'
        id='user-name'
        labelText='Имя'
        type='text'
        name='name'
        value={values.name || ''} 
        onChange={handleChangeInput}
        required
      />
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
        error="Что-то пошло не так"
        required
      />
    </AuthForm>
  )
}

export default Register