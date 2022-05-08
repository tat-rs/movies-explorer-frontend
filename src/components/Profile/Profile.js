import Header from "../Header/Header";
import Input from "../Input/Input";

import "./Profile.css";

function Profile({
  openNavMenu,
  closeNavMenu,
  isMenuOpen,
  logout
}) {

  return (
    <>
    <Header
      openNavMenu={openNavMenu}
      closeNavMenu={closeNavMenu}
      isMenuOpen={isMenuOpen}/>
      
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form" name="editor-profile">
        <Input
          className="profile"
          id="user-name"
          labelText="Имя"
          type="text"
          name="name"
          value="Виталий"
          onChange={() => { } }
          required />
        <span className="profile__line"></span>
        <Input
          className="profile"
          id="user-email"
          labelText="E-mail"
          type="email"
          name="email"
          value="pochta@yandex.ru"
          onChange={() => { } }
          required />
        <div className="buttons__container">
          <button className="profile__button link" type="button">Редактировать</button>
          <button className="profile__button profile__button_type_signout link" type="button" onClick={logout}>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Profile