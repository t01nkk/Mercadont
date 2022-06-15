import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { alertInfo } from "../../../helpers/toast";
import { useTranslation } from "react-i18next";
import { alertSuccess } from "../../../helpers/toast";
import "./QaSIndividual.css";

export const QaSIndividual = ({
  id,
  idProduct,
  createdAt,
  name,
  userId,
  question,
  answer,
  image,
}) => {
  const [textArea, setTextArea] = useState("");
  const [changeQaS, setChangeQaS] = useState(false);
  const history = useHistory();

  const { t } = useTranslation();

  const sendQaS = async () => {
    try {
      if (!textArea) {
        alertInfo(t("adminQaS.fillThisSpace"));
      }
      let sendAnswerAdmin = await axios.put(
        `${process.env.REACT_APP_DOMAIN}/admin/${id}/answer`,
        {
          answer: textArea,
          idProduct,
        }
      );
      if (sendAnswerAdmin) {
        alertSuccess(t("adminQaS.answerAdded"));
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        // Redirect("/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/QaS")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTextArea(e.target.value);
  };

  const viewProduct = () => {
    history.push(`/admin/edit/${idProduct}`);
  };

  return (
    <div className="card-body-qas">
      <p className="card-title-qas">
        {t("adminQaS.product")}
        {name}
      </p>
      <p>
        {t("adminQaS.questionDate")}
        {createdAt}
      </p>
      <p className="qas-question">
        {t("adminQaS.question")}
        {question}
      </p>
      <button
        className="btn-edit-qas-view  margin-btn"
        onClick={() => viewProduct()}
      >
        {t("adminQaS.view")}
      </button>

      {answer ? (
        <button
          className="btn-edit-qas-answer"
          onClick={() => setChangeQaS(true)}
        >
          {t("adminQaS.edit")}
        </button>
      ) : (
        <button
          className="btn-edit-qas-answer"
          onClick={() => setChangeQaS(true)}
        >
          {t("adminQaS.answerQuestion")}
        </button>
      )}
      {changeQaS ? (
        <>
          <button
            className="btn-edit-qas-answer-x"
            onClick={() => setChangeQaS(false)}
          >
            Close
          </button>
          <textarea
            className="qua-textarea-answer"
            name=""
            id=""
            cols="20"
            rows="5"
            value={textArea}
            required
            onChange={handleChange}
          />
          <button className="btn-edit-qas-answer" onClick={() => sendQaS()}>
            {t("adminQaS.submit")}
          </button>
        </>
      ) : null}
    </div>
  );
};
