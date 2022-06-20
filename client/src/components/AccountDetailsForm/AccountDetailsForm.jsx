import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../../context/store";
import { useAuth } from "../../context/authContext";
import { useTranslation } from "react-i18next";
import "./accountDetails.scss";
import { alertInfo } from "../../helpers/toast";

export default function AccountDetailsForm() {
  const { t } = useTranslation();
  const history = useHistory();

  const { resetPassword } = useAuth();
  const [state, dispatch] = useStore();
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    email: state.user.email,
    name: "",

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
      errors.name = t("errors.error_name");
    } else if (input === "") {
      setErrors("");
    }
    if (!expression.Expression.test(input.country)) {
      errors.country = t("errors.error_country");
    } else if (input === "") {
      setErrors("");
    }
    if (!expression.Expression.test(input.city)) {
      errors.city = t("errors.error_city");
    } else if (input === "") {
      setErrors("");
    }
    if (!expression.Expression.test(input.province)) {
      errors.province = t("errors.error_province");
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
  let id = localStorage.getItem("myUser");

  const fetchUser = async () => {
    try {
      let miStorage = JSON.parse(localStorage.getItem("myUser"));
      const userDB = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/user/details/${miStorage}`
      );
      setUser(userDB.data);
    } catch (err) {
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
      }, 1000);
    } catch (err) {
      return err;
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
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
  const handleKick = async () => {
    const check = await JSON.parse(localStorage.getItem("myUser"));
    if (check === null) {
      history.push("/login");
    }
  };
  useEffect(() => {
    handleKick();
  }, []);

  return (
    <div className="form-details">
      <p className="title-details">{t("accountDetailsForm.updateInfo")}</p>
      <form onSubmit={handleSubmit} className="form-editProfile">
        <div className="address-details">
          <div className="address-details1">
            <div className="input-details">
              <p>{t("accountDetailsForm.name")}: </p>
              <input
                className="input-line"
                type="text"
                name="name"
                value={user.name}
                required
                onChange={handleChangeName}
              />
              {errors.name && <p>{errors.name}</p>}{" "}
            </div>
            <div className="input-details">
              <p>City</p>
              <input
                className="input-line"
                type="text"
                name="city"
                required
                placeholder={t("accountDetailsForm.city")}
                value={user.city}
                onChange={handleChangeName}
              />
              {errors.city && <p>{errors.city}</p>}{" "}
            </div>
            <div className="input-details">
              <p>Country</p>
              <input
                className="input-line"
                type="text"
                name="country"
                required
                placeholder={t("accountDetailsForm.country")}
                value={user.country}
                onChange={handleChangeName}
              />
              {errors.country && <p>{errors.country}</p>}{" "}
            </div>
            <div className="input-details">
              <p>PostalCode</p>
              <input
                className="input-line"
                type="text"
                name="postalCode"
                placeholder={t("accountDetailsForm.postalCode")}
                value={user.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="address-details2">
            <div className="input-details">
              <p>Province</p>
              <input
                className="input-line"
                type="text"
                name="province"
                placeholder={t("accountDetailsForm.province")}
                value={user.province}
                onChange={handleChangeName}
              />
              {errors.province && <p>{errors.province}</p>}{" "}
            </div>
            <div className="input-details">
              <p> Street</p>
              <input
                className="input-line"
                type="text"
                name="street"
                placeholder={t("accountDetailsForm.street")}
                value={user.street}
                onChange={handleChangeName}
              />
              {errors.street && <p>{errors.street}</p>}{" "}
            </div>
            <div className="input-details">
              <p>{t("accountDetailsForm.image")}: </p>
              <input
                className="input-line"
                type="text"
                name="image"
                placeholder="Image..."
                onChange={handleChange}
                value={user.image}
              />
            </div>
          </div>
        </div>

        <div className="btn-editProfile">
          <button
            className="input-submit-editProfile"
            onClick={(e) => handleResetPassword(e)}
          >
            {t("accountDetailsForm.changePassword")}
          </button>
          <button className="input-submit-editProfile">{t("accountDetailsForm.submit")}</button>
        </div>
      </form>
    </div>
  );
}
