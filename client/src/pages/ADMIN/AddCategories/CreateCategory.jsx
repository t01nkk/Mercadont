import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchCategories } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store";
import { useHistory } from "react-router-dom";
import "./CategoryCard.css";
import { ToastContainer, toast } from 'react-toastify'
import { useTranslation } from "react-i18next";
export default function CreateCategory() {
  const { t } = useTranslation()

  const alertSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    })
  }
  const history = useHistory()
  const [state, dispatch] = useStore(); 
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    name: "",
  });

  const expression = {	
		name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
   
  }
  function validator(input) {
    let errors = {};   

    if (!expression.name.test(input.name)) {
        errors.name = 'Name is necessary';
    }
   
    return errors
  }
  const handleChangeName = (e) => {
    setErrors("")  
   setErrors(validator({ ...data, [e.target.name]: e.target.value }));
    
        setData({ ...data, [e.target.name]: e.target.value });
  };
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = data;
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/categories/`, {
        name: name,
      });
      alertSuccess(t("adminCreateCategory.created"))
      setTimeout(() => {
        history.push('CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/categories')
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);
  return (
    <div className="loginCard">
      <h2>{t("adminCreateCategory.postCategory")}</h2>

      <form onSubmit={handleSubmit}>
        <div className="divInputUser">
          <input
            type="text"
            name="name"
            placeholder={t("adminCreateCategory.name")}
            onChange={handleChangeName }
            value={data.name}
          />
        </div>
        {errors.name && ( <p className='error-input'>{errors.name}</p> )}
        <div className="btn-createUser">
          <input type="submit" value={t("adminCreateCategory.submit")} disabled={errors} className="input-submit" />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
