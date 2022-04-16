import React from "react";
import { Link } from "react-router-dom";

import "./AuthForm.css";

function AuthForm({nameForm, title, textOfButton, children, text, link, textOfLink}) {

  return (
    <section className="auth-form">
      <form className='form' name={nameForm}  onSubmit={() => {}} noValidate >
      <h2 className='form__title'>{title}</h2>
      <div className="form__items">
        {children}
      </div>
        <button className='form__button button' type='submit'>{textOfButton}</button>
      </form>
      <div className="auth-form__container">
        <p className="auth-form__text">{text}</p>
        <Link to={link} className="auth-form__link link">{textOfLink}</Link>
      </div>
    </section>
  )
}

export default AuthForm