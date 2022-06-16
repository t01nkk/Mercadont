import axios from "axios";
import React, { useState } from "react";
import { useStore } from "../../context/store";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsFillCursorFill } from "react-icons/bs";
import "./FormQA.css";
import { alertSuccess } from "../../helpers/toast";
export const FormQA = ({ productId }) => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    question: "",
  });
  const [state] = useStore();
  const history = useHistory();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { question } = data;
    if (!state.user) {
      alert(t("formQA.mustLogInToAsk"));
      history.push("/login");
      return;
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_DOMAIN}/qa/${productId}/question`,
        {
          question,
          userId: state.user,
        }
      );

      alertSuccess(t("formQA.postedQuestion"));
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="qua-container">
      <p className="qua-ask">{t("formQA.askSeller")}</p>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-info">
          <textarea
            className="qua-textarea"
            type="text"
            name="question"
            placeholder={t("formQA.askAQuestion")}
            onChange={(e) => handleChange(e)}
            value={data.question}
          />
          <button className="button-qua">{t("formQA.postQuestion")}</button>
        </div>
      </form>
    </div>
  );
};
