import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/store";
import { useTranslation } from "react-i18next";
// import "./AccountDetails.css"
// import {mostrarFrente} from "./js/main.js"
import { ToastContainer, toast } from "react-toastify";
export default function AccountDetails() {
  const { t } = useTranslation()
  const [user, setUser] = useState("");
  const [state, dispatch] = useStore();


  const fetchUser = async () => {
    try {
      const userDB = await axios.get(`${process.env.REACT_APP_DOMAIN}/user/details/${state.user}`)
      setUser(userDB.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (state.user) {
      fetchUser();
    }
  }, []);

  let mostrarFrente = (e) => {
    console.log(e);
  };

  return (
    <>
      {/* <script src="https://kit.fontawesome.com/2c36e9b7b1.js"></script> */}
      {/* <script src="./js/main.js"></script> */}
      <Link to="/accountDetails/editProfile">
     
        <button>{t("accountDetails.btnEditProfile") }</button>
      </Link>
      <div>
        <p>{t("accountDetails.info") }</p>
        <p>{t("accountDetails.email") }{user?.email}</p>
        <p>{t("accountDetails.name")}{user?.name}</p>
        <p>{t("accountDetails.lastname")}{user?.lastname}</p>
        <p>{t("accountDetails.address")}{user?.adress}</p>
      </div>
      {/* <div>
        <h3>Yours Cads:</h3>
        <div>
          Iria un div por cada tarjeta que tenga el usuario con boton de
          eliminar
        </div>
      </div> 

      <div>
        <button>Add new card:</button>
      </div>
      */}
      {/* <div>
        <section className="tarjeta" id="tarjeta">
          <div className="front">
            <div className="logo">
              <img src="" alt="" />
            </div>
            <img src="" alt="" className="chip"/>
            <div className="data">
              <div className="group" id="number">
                <p className="label">Nunber Card</p>
                <p className="number">#### #### #### ####</p>
              <div className="flexbox">
                <div className="group" id="name">
                  <p className="label">Name Card</p>
                  <p className="name">Jhon Doe</p>
                </div>

                <div className="group" id="expiration">
                  <p className="label">Expiration</p>
                  <p className="expiration"><span className="mount">MM</span>/<span className="year">AA</span></p>
                </div>
              </div>
              </div>
            </div>
          </div>

        </section>
      </div> */}
    </>
  );
}
