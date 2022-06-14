import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../../context/store";
import { useAuth } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import "./accountDetails.css";
import { alertInfo } from '../../helpers/toast'

export default function AccountDetailsForm() {
  const { t } = useTranslation();
  const history = useHistory();

  const { resetPassword } = useAuth();
  const [state, dispatch] = useStore();
  const [errors, setErrors] = useState({})
  const [user, setUser] = useState({
    email: state.user.email,
    name: "",
    lastname: "",
    address: "",
    country: "",
    province: "",
    city: "",
    street: "",
    postalCode: "",
    password: "",
    image: "",
  });



  const expression = {
    Expression: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  };


  function validator(input) {
    let errors = {};

    if (!expression.Expression.test(input.name)) {
      errors.name = `Name is neccesary`;
    } else if (input === "") {
      setErrors("");
    }
    if (!expression.Expression.test(input.lastname)) {
      errors.lastname = `Lastname is neccesary`;
    } else if (input === "") {
      setErrors("");
    }
    if (!expression.Expression.test(input.country)) {
      errors.country = `Country is neccesary`;
    } else if (input === "") {
      setErrors("");
    }
    if (!expression.Expression.test(input.city)) {
      errors.city = `City is neccesary`;
    } else if (input === "") {
      setErrors("");
    }
    if (!expression.Expression.test(input.province)) {
      errors.province = `Province is neccesary`;
    } else if (input === "") {
      setErrors("");
    }



    return errors;
  }

  const handleChangeName = (e) => {
    setErrors("");
    setErrors(validator({ ...user, [e.target.name]: e.target.value }));

    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(errors)
  let id = localStorage.getItem("myUser");

  const fetchUser = async () => {
    try {
      let miStorage = JSON.parse(localStorage.getItem("myUser"));
      const userDB = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/user/details/${miStorage}`
      );
      setUser(userDB.data);
    } catch (err) {
      // console.log(err);
      return err;
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      email,
      name,
      lastname,
      image,
      password,
      country,
      province,
      city,
      street,
      postalCode,
    } = user;
    // console.log(id)
    try {
      await axios.put(
        `${process.env.REACT_APP_DOMAIN}/user/details/${state.user}`,
        {
          email,
          name,
          lastname,
          image,
          password,
          country,
          province,
          city,
          street,
          postalCode,
        }
      );
      alertInfo(t("accountDetailsForm.toastInfo"));
      setTimeout(() => {
        history.push("/accountDetails");
      }, 2000);
    } catch (err) {
      // console.log(err);
      return err;
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log("handleResetPassword USER:",user)
    const answer = window.confirm(t("accountDetailsForm.askPasswordChange"));
    if (answer) {
      try {
        await resetPassword(user.email);
        alert(t("accountDetailsForm.confirmPasswordChange"));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div >
      <h2>{t("accountDetailsForm.updateInfo")}</h2>
      <form onSubmit={handleSubmit}>
        <div className="divInputUser">
          <p className="title">{t("accountDetailsForm.name")}: </p>
          <input
            type="text"
            name="name"
            value={user.name}
            required
            onChange={handleChangeName}
          />
          {errors.name && <p className="error-input">{errors.name}</p>}{" "}
        </div>

        <div className="divInputUser">
          <p className="title">{t("accountDetailsForm.lastname")}: </p>
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            required
            onChange={handleChangeName}
          />
          {errors.lastname && <p className="error-input">{errors.lastname}</p>}{" "}
        </div>
        <div className="divInputUser">
          <p className="title">{t("accountDetailsForm.address")}</p>
          <input
            type="text"
            name="country"
            required
            placeholder={t("accountDetailsForm.country")}
            value={user.country}
            onChange={handleChangeName}
          />
          {errors.country && <p className="error-input">{errors.country}</p>}{" "}
        </div>
        <div className="divInputUser">
          <input
            type="text"
            name="province"
            placeholder={t("accountDetailsForm.province")}
            value={user.province}
            onChange={handleChangeName}
          />
          {errors.province && <p className="error-input">{errors.province}</p>}{" "}
        </div>

        <div className="divInputUser">

          <input
            type="text"
            name="city"
            required
            placeholder={t("accountDetailsForm.city")}
            value={user.city}
            onChange={handleChangeName}
          />
          {errors.city && <p className="error-input">{errors.city}</p>}{" "}
        </div>
        <div className="divInputUser">
          <input
            type="text"
            name="country"
            required
            placeholder={t("accountDetailsForm.country")}
            value={user.country}
            onChange={handleChangeName}
          />
          {errors.country && <p className="error-input">{errors.country}</p>}{" "}
        </div>
        <div className="divInputUser">
          <input
            type="text"
            name="postalCode"
            placeholder={t("accountDetailsForm.postalCode")}
            value={user.postalCode}
            onChange={handleChange}
          />
        </div>
        <div className="divInputUser">
          <input
            type="text"
            name="province"
            placeholder={t("accountDetailsForm.province")}
            value={user.province}
            onChange={handleChangeName}
          />
          {errors.province && <p className="error-input">{errors.province}</p>}{" "}
        </div>
        <div className="divInputUser">
          <input
            type="text"
            name="street"
            placeholder={t("accountDetailsForm.street")}
            value={user.street}
            onChange={handleChangeName}
          />
          {errors.street && <p className="error-input">{errors.street}</p>}{" "}
        </div>

        <div className="divInputUser">
          <input
            type="text"
            name="postalCode"
            placeholder={t("accountDetailsForm.postalCode")}
            value={user.postalCode}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <p className="title">{t("accountDetailsForm.password")}: </p>
          <button onClick={(e) => handleResetPassword(e)}>
            {t("accountDetailsForm.changePassword")}
          </button>
        </div>

        <div className="divInputUser">
          <p className="title">{t("accountDetailsForm.image")}: </p>
          <input
            type="text"
            name="image"
            placeholder="Image..."
            onChange={handleChange}
            value={user.image}
          />
        </div>

        <div className="btn-login">
          <input type="submit" name="Update info" className="input-submit" />
        </div>
      </form >
    </div >
  );
}
