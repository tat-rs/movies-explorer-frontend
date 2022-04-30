import { Link } from "react-router-dom";

import ProfileIcon from "../../images/profile.svg";

import "./ProfileButton.css";

function ProfileButton({className}) {
  return (
    <Link
      to="/profile"
      className={`link profile-btn ${className ? `${className}` : ''}`}>
        <p className="profile-btn__text">Аккаунт</p>
        <img
          className="profile-btn__icon"
          src={ProfileIcon}
          alt="Иконка" />
    </Link>
  )
}

export default ProfileButton