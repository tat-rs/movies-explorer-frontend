import React from "react";

import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project">
      <h2 className="project__subtitle subtitle">О проекте</h2>
      <ul className="project__list result">
        <li className="result__item">
          <p className="result__subtitle">Дипломный проект включал 5 этапов</p>
          <p className="result__text text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="result__item">
          <p className="result__subtitle">На выполнение диплома ушло 5 недель</p>
          <p className="result__text text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="project__stages">
        <p className="project__time project__time_color_blue">1 неделя</p>
        <p className="project__time project__time_color_grey">4 неделя</p>
        <p className="project__dev">Back-end</p>
        <p className="project__dev">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject