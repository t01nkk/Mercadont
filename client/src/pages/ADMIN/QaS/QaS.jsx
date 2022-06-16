import React, { useState, useEffect } from "react";
import axios from "axios";
import { QaSIndividual } from "./QaSIndividual";
import { useTranslation } from "react-i18next";
import "./QaS.scss";
export const QaS = () => {
  const { t } = useTranslation();

  const [stateQas, setStateQas] = useState(false);
  const [dataQaS, setDataQaS] = useState("");

  useEffect(() => {
    getStateQaS();
  }, [stateQas]);

  let getStateQaS = async () => {
    try {
      let qas = await axios(
        `${process.env.REACT_APP_DOMAIN}/admin/all/${stateQas}`
      );
      setDataQaS(qas.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="qas-list-container">
        {stateQas ? (
          <p className="qas-list-title">{t("adminQaS.solvedQuestions")}</p>
        ) : (
          <p className="qas-list-title">{t("adminQaS.pendingQuestions")}</p>
        )}

        <div className="qas-btn-wrapper">
          <button className="btn-edit-qas" onClick={() => setStateQas(true)}>
            {t("adminQaS.answered")}
          </button>
          <button
            className="btn-edit-qas change-color "
            onClick={() => setStateQas(false)}
          >
            {t("adminQaS.pending")}
          </button>
        </div>
        <section className="qas-container">
          <article className="qas-cards">
            {dataQaS?.length ? (
              React.Children.toArray(
                dataQaS.map((e) => (
                  <QaSIndividual
                    id={e.id}
                    createdAt={e.createdAt}
                    name={e.products[0].name}
                    idProduct={e.products[0].id}
                    userId={e.users[0].id}
                    question={e.question}
                    answer={e.answer}
                  />
                ))
              )
            ) : (
              <p className="qas-notPending">{t("adminQaS.noPending")}</p>
            )}
          </article>
        </section>
      </div>
    </>
  );
};
