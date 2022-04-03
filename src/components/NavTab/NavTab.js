import React from "react";
import { Link } from "react-router-dom";

import "./NavTab.css";

function NavTab() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item button"><Link to="" className="nav__item-link">О проекте</Link></li>
        <li className="nav__item"><Link to="" className="nav__item-link button">Технологии</Link></li>
        <li className="nav__item"><Link to="" className="nav__item-link button">Студент</Link></li>
      </ul>
    </nav>
  )
}

export default NavTab