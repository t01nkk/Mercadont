import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../../context/store";
import { useTranslation } from "react-i18next";
import "./AccountDetails.scss";
// import {mostrarFrente} from "./js/main.js"

export default function AccountDetails() {
  const { t } = useTranslation();
  const [user, setUser] = useState("");
  const [state, dispatch] = useStore();
  const history = useHistory();

 

  const fetchUser = async () => {
    let userCookie = JSON.parse(localStorage.getItem("myUser"));
    try {
      const userDB = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/user/details/${userCookie}`
      );
      setUser(userDB.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBack = async (e) => {
    e.preventDefault();
    history.push("/home");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-info">
          <p className="title-profile">{t("accountDetails.info")}</p>
          {user?.image ? (
            <img
              src={user?.image}
              className="img-details"
              height="100px"
              alt="No Image"
            />
          ) : (
            <img
              className="img-details"
              src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
              alt="No Image"
              height="100px"
            />
          )}
          <p className="profile-title">
            {user?.name} {user?.lastname}
          </p>

          <div className="data-user">
            <div className="data-user1">
              <p className="word-break">
                <span className="label-accDetails">
                  {t("accountDetails.country")}
                </span>
                {user?.country}
              </p>
              <p className="word-break">
                <span className="label-accDetails">
                  {t("accountDetails.city")}
                </span>
                {user?.city}
              </p>
              <p className="word-break">
                <span className="label-accDetails">
                  {t("accountDetails.province")}
                </span>
                {user?.province}
              </p>
            </div>
            <div className="data-user2">
              <p className="word-break">
                <span className="label-accDetails">E-Mail: </span>
                {user?.email}
              </p>
              <p className="word-break">
                <span className="label-accDetails">
                  {t("accountDetails.street")}
                </span>
                {user?.street}
              </p>
              <p className="word-break">
                <span className="label-accDetails">
                  {t("accountDetails.postalCode")}
                </span>
                {user?.postalCode}
              </p>
            </div>
          </div>
          <Link to="/accountDetails/editProfile">
            <button className="input-edit-profile">
              {t("accountDetails.btnEditProfile")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
