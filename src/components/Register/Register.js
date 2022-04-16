import React from "react";
import AuthForm from "../AuthForm/AuthForm";

import "./Register.css";

function Register({nameForm, title, textOfButton}) {
  return (
    <>
      <AuthForm title={title} textOfButton={textOfButton} nameForm={nameForm}/>
    </>
  )
}

export default Register