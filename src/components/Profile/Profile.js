import { useContext, useEffect } from "react";

import { useForm } from "../../hooks/useForm";

import Header from "../Header/Header";
import Input from "../Input/Input";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ERROR_EMAIL_FORMAT, ERROR_NAME_FORMAT, RegExpEmail, RegExpName } from "../../utils/constants";

import "./Profile.css";

function Profile({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  logout,
  errorMessage,
  setErrorMessage,
  updateUserInfo,
  successMessage,
  setSuccessMessage
}) {

  const currentUserData = useContext(CurrentUserContext);

  const {values, setValues, errors, setErrors, isValid, setIsValid, handleChange} = useForm();

  useEffect(() => {
    setIsValid(false);
    setErrors({});
    setErrorMessage('');
    setSuccessMessage('');
    setValues({
      ...values,
      name: currentUserData.user.name,
      email: currentUserData.user.email
    });
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    updateUserInfo(values.name, values.email);
  }

  return (
    <>
    <Header
      openNavMenu={openNavMenu}
      closeNavMenu={closeNavMenu}
      isMenuOpen={isMenuOpen}/>
      
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${currentUserData.user.name}!`}</h2>
      <form className="form profile__form" name="editor-profile" onSubmit={handleSubmit} noValidate>
        <div>
        <Input
          className="profile"
          id="user-name"
          labelText="Имя"
          type="text"
          name="name"
          value={values.name || ''}
          error={errors.name}
          pattern={RegExpName}
          minLength="2"
          maxLength="30"
          title={ERROR_NAME_FORMAT}
          isValid={isValid}
          onChange={handleChange}
          required />
        <span className="profile__line"></span>
        <Input
          className="profile"
          id="user-email"
          labelText="E-mail"
          type="email"
          name="email"
          value={values.email || ''}
          error={errors.email}
          pattern={RegExpEmail}
          title={ERROR_EMAIL_FORMAT}
          isValid={isValid}
          onChange={handleChange}
          required />
        </div>
        <span className={`${successMessage ? 'form__success-text' : 'form__error' }`}>
          {successMessage ? successMessage : errorMessage}
        </span>
        <div className="buttons__container">
          <button
            className="profile__button link"
            type='submit'
            disabled={!isValid}>
              Редактировать
          </button>
          <button
            className="profile__button profile__button_type_signout link"
            type="button"
            onClick={logout}>
              Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Profile