import React from "react";

import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title subtitle">Технологии</h2>
      <p className="techs__subtitle title">7 технологий</p>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__item button">HTML</li>
        <li className="techs__item button">CSS</li>
        <li className="techs__item button">JS</li>
        <li className="techs__item button">React</li>
        <li className="techs__item button">Git</li>
        <li className="techs__item button">Express.js</li>
        <li className="techs__item button">mongoDB</li>
      </ul>

    </section>
  )
}

export default Techs