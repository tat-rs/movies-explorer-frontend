import React from "react";
import Input from "../Input/Input";

import "./AuthForm.css";

function AuthForm({nameForm, title, textOfButton, children}) {
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
    <form className='form' name={nameForm}  onSubmit={() => {}} noValidate >
      <h2 className='form__title'>{title}</h2>
      <div className="form__items">
        {children}
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
      </div>
        <button className='form__button button' type='submit'>{textOfButton}</button>
    </form>
  )
}

export default AuthForm