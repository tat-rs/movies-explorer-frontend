import React from "react";

import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear(); //сохранен текущий год в переменной
  return (
    <footer className="footer">
      <p class="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__year">&#169;{currentYear}</p>
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item"><a href="https://practicum.yandex.ru" className="footer__nav-link link" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
            <li className="footer__nav-item"><a href="https://github.com/tat-rs" className="footer__nav-link link" target="_blank" rel="noreferrer">Github</a></li>
            <li className="footer__nav-item"><a href="#" className="footer__nav-link link" target="_blank" rel="noreferrer">Facebook</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer