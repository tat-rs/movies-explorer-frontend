import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

import "./AuthForm.css";

function AuthForm({
  nameForm,
  title,
  textOfButton,
  children,
  text,
  link,
  textOfLink,
  onSubmit,
  isValid,
  errorMessage,
  successMessage
}) {

  return (
    <section className="auth-form">
      <Logo className="auth-form__logo"/>
      <form
        className="auth-form__form form"
        name={nameForm}
        onSubmit={onSubmit}
        noValidate >
        <div className="form__container">
          <h2 className="form__title">{title}</h2>
          <div className="form__items">
            {children}
          </div>
        </div>
        <div className="form__btn-container">
        <span className={`${successMessage ? 'form__success-text' : 'form__error' }`}>{successMessage ? successMessage : errorMessage}</span>
          <button
            className={`form__button ${!isValid ? 'form__button_disabled' : 'button'}`}
            type="submit"
            disabled={!isValid}>
              {textOfButton}
          </button>
        </div>
      </form>
      <div className="auth-form__information">
        <p className="auth-form__text">{text}</p>
        <Link to={link} className="link auth-form__link">{textOfLink}</Link>
      </div>
    </section>
  )
}

export default AuthForm