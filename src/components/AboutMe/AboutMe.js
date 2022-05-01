import { Link } from "react-router-dom";
import Portfolio from "../Portfolio/Portfolio";
import StudentPhoto from "../../images/student.jpg";

import "./AboutMe.css";
import Title from "../Title/Title";
import Container from "../Container/Container";

function AboutMe() {
  return (
    <section className="student page__student" id="student">
      <Container>
        <Title title="Студент" className="student__subtitle" />
        <div className="student__container">
          <div className="student__info">
            <div className="student__container-info">
            <h3 className="student__name">
              Татьяна
            </h3>
            <p className="student__about">Фронтенд-разработчик, 25 лет</p>
            <p className="student__desc">Я родилась и живу в Раменском, закончила экономический факультет в РосНОУ. После окончания университета работала по специальности. В свободное время люблю читать детективы, слушать музыку, начинать заниматься йогой. Сейчас заканчиваю курс веб-разработки в Яндекс.Практикум :)</p>
            </div>
            <ul className="student__list list">
              <li className="list__item">
                <Link className="list__link link" to="/">Facebook</Link>
              </li>
              <li className="list__item">
              <Link className="list__link link" to="/">Github</Link>
              </li>
            </ul>
          </div>
          <img className="student__photo" src={StudentPhoto} alt="Фото студента"></img>
        </div>
        <Portfolio />
      </Container>
    </section>
  )
}

export default AboutMe