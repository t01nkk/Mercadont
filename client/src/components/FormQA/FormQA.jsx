import axios from 'axios';
import React, { useState } from 'react'
import { useStore } from '../../context/store';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from "react-toastify";
export const FormQA = ({ productId }) => {
    const { t } = useTranslation()
    const [data, setData] = useState({
        question: "",
    });
    const [state] = useStore();
    const history = useHistory()

    const alertSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    });
  };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { question } = data;
        if (!state.user) {
            alert(t("formQA.mustLogInToAsk"))
            history.push("/login")
            return
        }
        try {
            await axios.post(`${process.env.REACT_APP_DOMAIN}/qa/${productId}/question`, {
                question,
                userId: state.user
            });
            
                alertSuccess(t("formQA.postedQuestion"))
            setTimeout(() => {
                window.location.reload()
            }, 2500);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div>
            <h4>{t("formQA.askSeller")}</h4>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="divInputQuestuion">
                    <input
                        type="text"
                        name="question"
                        placeholder={t("formQA.askAQuestion")}
                        onChange={(e) => handleChange(e)}
                        value={data.question}
                    />
                </div>
                <div className="btn-question">
                    <input type="submit" value={t("formQA.postQuestion")} className="input-submit" />
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

