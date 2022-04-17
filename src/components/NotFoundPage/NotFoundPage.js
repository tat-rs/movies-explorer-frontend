import React from "react";
import { useHistory } from "react-router-dom";

import "./NotFoundPage.css";

function NotFoundPage() {
  const history = useHistory();
  return (
    <section className="not-found">
      <div className="not-found__content">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <button className="not-found__back link" onClick={() => history.goBack()}>Назад</button>
    </section>
  )
}

export default NotFoundPage