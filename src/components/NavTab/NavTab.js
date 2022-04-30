import "./NavTab.css";

function NavTab() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="button nav__item">
          <a href="#project" className="nav__item-link">
            О проекте
          </a>
        </li>
        <li className="button nav__item">
          <a href="#techs" className="nav__item-link">
            Технологии
          </a>
        </li>
        <li className="button nav__item">
          <a href="#student" className="nav__item-link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavTab