import Container from "../Container/Container";

import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <p className="footer__text">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
        <div className="footer__container">
          <p className="footer__year">&#169;{currentYear}</p>
          <nav className="footer__nav">
            <ul className="footer__nav-list">
              <li className="footer__nav-item">
                <a
                  href="https://practicum.yandex.ru"
                  className="footer__nav-link link"
                  target="_blank"
                  rel="noreferrer">
                    Яндекс.Практикум
                </a>
                </li>
              <li className="footer__nav-item">
                <a
                  href="https://github.com/tat-rs"
                  className="footer__nav-link link"
                  target="_blank"
                  rel="noreferrer">
                    Github
                </a>
                </li>
              <li className="footer__nav-item">
                <a
                  href="https://facebook.com"
                  className="footer__nav-link link"
                  target="_blank"
                  rel="noreferrer">
                    Facebook
                </a>
                </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}

export default Footer