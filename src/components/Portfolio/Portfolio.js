import Icon from "../../images/rank.svg";

import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list list">
        <li className="portfolio__list-item link">
          <a
            className="portfolio__list-link" 
            href="https://tat-rs.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer">
              Статичный сайт
          </a>
          <img
            className="list__icon"
            src={Icon}
            alt="Иконка"/>
        </li>
        <li className="portfolio__list-item link">
          <a
            className="portfolio__list-link"
            href="https://tat-rs.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer">
              Адаптивный сайт
          </a>
          <img
            className="list__icon"
            src={Icon}
            alt="Иконка"/>
        </li>
        <li className="portfolio__list-item link">
          <a
            className="portfolio__list-link"
            href="https://mesto22.herokuapp.com/"
            target="_blank"
            rel="noreferrer">
              Одностраничное приложение
          </a>
          <img
            className="list__icon"
            src={Icon}
            alt="Иконка"/>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio