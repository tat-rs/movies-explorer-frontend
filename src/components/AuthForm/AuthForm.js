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
  textOfLink
}) {

  return (
    <section className="auth-form">
      <Logo className="auth-form__logo"/>
      <form
        className="form"
        name={nameForm}
        onSubmit={() => {}}
        noValidate >
        <div className="form__container">
          <h2 className="form__title">{title}</h2>
          <div className="form__items">
            {children}
          </div>
        </div>
        <button className="form__button button" type="submit">{textOfButton}</button>
      </form>
      <div className="auth-form__information">
        <p className="auth-form__text">{text}</p>
        <Link to={link} className="link auth-form__link">{textOfLink}</Link>
      </div>
    </section>
  )
}

export default AuthForm