import React from "react";

import Icon from "../../images/rank.svg";

import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list list">
        <li className="portfolio__list-item link">
          <a className="portfolio__list-link" href="HTTP">Статичный сайт</a>
          <img className="list__icon" src={Icon} alt="Иконка"/>
        </li>
        <li className="portfolio__list-item link">
          <a className="portfolio__list-link" href="HTTP">Адаптивный сайт</a>
          <img className="list__icon" src={Icon} alt="Иконка"/>
        </li>
        <li className="portfolio__list-item link">
          <a className="portfolio__list-link" href="HTTP">Одностраничное приложение</a>
          <img className="list__icon" src={Icon} alt="Иконка"/>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio