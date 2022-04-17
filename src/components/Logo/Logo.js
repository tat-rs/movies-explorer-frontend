import React from "react";
import { Link } from "react-router-dom";

import LogoIcon from "../../images/logo.svg";

import "./Logo.css";

function Logo({className}) {
 return (
  <Link to="/" className={`logo ${className ? `${className}` : ''}`}>
    <img className="logo__icon" src={LogoIcon} alt="Логотип" />
  </Link>
 ) 
}

export default Logo;