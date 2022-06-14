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
  console.log(errors);
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
    <div className="account-details navPush-accountDetails">
      <div className="form-details">
        <h2 className="title-details">{t("accountDetailsForm.updateInfo")}</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className="input-details">
          <label >{t("accountDetailsForm.email")}: </label>
          <input 
           className="input-line"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div> */}
          <div className="address-details">
            {/* <p >{t("accountDetailsForm.address")}</p> */}
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
                <p>{t("accountDetailsForm.lastname")}: </p>
                <input
                  className="input-line"
                  type="text"
                  name="lastname"
                  value={user.lastname}
                  required
                  onChange={handleChangeName}
                />
                {errors.lastname && <p>{errors.lastname}</p>}{" "}
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
            </div>
            <div className="address-details2">
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

          <div className="password-user ">
            <p>{t("accountDetailsForm.password")}: </p>
            <div className="button-user">
              <button
                className="button-details"
                onClick={(e) => handleResetPassword(e)}
              >
                {t("accountDetailsForm.changePassword")}
              </button>
            </div>
          </div>

          <div className="button-user">
            <button className="button-details">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
