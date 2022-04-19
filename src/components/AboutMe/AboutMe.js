import React from "react";
import { Link } from "react-router-dom";
import Portfolio from "../Portfolio/Portfolio";
import StudentPhoto from "../../images/student.png";

import "./AboutMe.css";
import Title from "../Title/Title";

function AboutMe() {
  return (
    <section className="student">
      <Title title='Студент' className="student__subtitle" />
      <div className="student__container">
        <div className="student__info">
          <div className="student__container-info">
          <h3 className="student__name">
            Виталий
          </h3>
          <p className="student__about">Фронтенд-разработчик, 30 лет</p>
          <p className="student__desc">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          </div>
          <ul className="student__list list">
            <li className="list__item">
              <Link className="list__link link" to='/'>Facebook</Link>
            </li>
            <li className="list__item">
            <Link className="list__link link" to='/'>Github</Link>
            </li>
          </ul>
        </div>
        <img className="student__photo" src={StudentPhoto} alt="Фото студента"></img>
      </div>
      <Portfolio />
    </section>
  )
}

export default AboutMe