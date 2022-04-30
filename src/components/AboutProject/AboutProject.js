import Container from "../Container/Container";
import Title from "../Title/Title";

import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project page__project" id="project">
      <Container>
        <Title title="О проекте" className="project__subtitle" />
        <ul className="project__list result">
          <li className="result__item">
            <p className="result__subtitle">Дипломный проект включал 5&nbsp;этапов</p>
            <p className="result__text text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
          </li>
          <li className="result__item">
            <p className="result__subtitle">На&nbsp;выполнение диплома ушло 5&nbsp;недель</p>
            <p className="result__text text">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="project__stages">
          <p className="project__time project__time_color_blue">1&nbsp;неделя</p>
          <p className="project__time project__time_color_grey">4&nbsp;неделя</p>
          <p className="project__dev">Back-end</p>
          <p className="project__dev">Front-end</p>
        </div>
      </Container>
    </section>
  )
}

export default AboutProject