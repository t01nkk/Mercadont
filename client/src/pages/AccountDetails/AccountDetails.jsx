import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/store";
import "./AccountDetails.css";
// import {mostrarFrente} from "./js/main.js"

export default function AccountDetails() {
  const [user, setUser] = useState("");
  const [state, dispatch] = useStore();

  const fetchUser = async () => {
    let userCookie = JSON.parse(localStorage.getItem("myUser"));
    console.log(userCookie);
    try {
      const userDB = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/user/details/${userCookie}`
      );
      setUser(userDB.data);
      console.log(user)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="profile-wrapper">
      {/* <script src="https://kit.fontawesome.com/2c36e9b7b1.js"></script> */}
      {/* <script src="./js/main.js"></script> */}
      <div className="profile-container">
        <div className="profile-info">
          <p className="profile-title">Your Info:</p>
          {user?.image?
          <img src={user?.image} alt="No Image"/>:
          <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" alt="No Image" height="40px"/>
          }
          <p className="profile-title">Email:</p>
          <p>{user?.email}</p>
          <p className="profile-title">Name:</p>
          <p>{user?.name}</p>
          <p className="profile-title">Lastname:</p>
          <p>{user?.lastname}</p>
          {/*<p className="profile-title">Adress:</p>
          <p>{user?.adress}</p>*/}

          <Link to="/accountDetails/editProfile">
            <button className="input-edit-profile">Edit your profile</button>
          </Link>
        </div>
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

      <div>
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
    </div>
  );
}
