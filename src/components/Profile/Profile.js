import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useForm } from "../../hooks/useForm";
import Header from "../Header/Header";
import Input from "../Input/Input";

import "./Profile.css";

function Profile({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  logout,
  errorMessage,
  setErrorMessage,
  updateUserInfo
}) {

  const currentUserData = useContext(CurrentUserContext);

  const {values, setValues, errors, setErrors, isValid, setIsValid, handleChange} = useForm();

  useEffect(() => {
    setIsValid(false)
    setErrors({})
    setErrorMessage('')
    setValues({
      ...values, name: currentUserData.user.name, email: currentUserData.user.email
    })
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
      <form className="form profile__form" name="editor-profile" onSubmit={handleSubmit}>
        <div>
        <Input
          className="profile"
          id="user-name"
          labelText="Имя"
          type="text"
          name="name"
          value={values.name || ''}
          error={errors.name}
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
          isValid={isValid}
          onChange={handleChange}
          required />
        </div>
        <span>{errorMessage}</span>
        <div className="buttons__container">
          <button className="profile__button link" type='submit' disabled={!isValid}>Редактировать</button>
          <button className="profile__button profile__button_type_signout link" type="button" onClick={logout}>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Profile