import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { useStore } from "../../context/store";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import { useTranslation } from "react-i18next";
export default function AccountDetailsForm() {
  const { t } = useTranslation()
  const history = useHistory()

 // 'User information updated successfully'
  const alertUserUpdated = (msg) => {
    toast.info(msg, {
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

  const { resetPassword } = useAuth();
  const [state, dispatch] = useStore();
  const [user, setUser] = useState({
    email: state.user.email,
    name: "",
    lastname: "",
    country: "",
    province: "",
    city: "",
    street: "",
    postalCode: "",
    password: "",
    image: "",


  });
  let id = localStorage.getItem("myUser")

  const fetchUser = async () => {
    // console.log(state.user)
    try {
      let miStorage = JSON.parse(localStorage.getItem("myUser"));
      const userDB = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/user/details/${miStorage}`
      );
      console.log("user", userDB)
      setUser(userDB.data);
    } catch (err) {
      // console.log(err);
      return err
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, lastname, image, password,country,province, city, street, postalCode } = user;
    // console.log(id)
    try {
      await axios.put(`${process.env.REACT_APP_DOMAIN}/user/details/${state.user}`, {
        email,
        name,
        lastname,
        image,
        password,
        country,
        province,
        city,
        street,
        postalCode
      })
      alertUserUpdated(t("accountDetailsForm.toastInfo"))
      setTimeout(() => {
        history.push('/accountDetails')
      }, 4000);
    } catch (err) {
      // console.log(err);
      return err
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log("handleResetPassword USER:",user)
    const answer = window.confirm(t("accountDetailsForm.askPasswordChange"))
    if(answer){
      try {
        await resetPassword(user.email)
        alert(t("accountDetailsForm.confirmPasswordChange"))
      }
      catch (err) {
        alert(err.message)
      }
    }
  }

  return (
    <div>
      <h2>{t("accountDetailsForm.updateInfo")}</h2>
      <form onSubmit={handleSubmit}>
      <div className="divInputUser">
      <label className="title">{t("accountDetailsForm.email")}: </label>
        <input
          type="email"
          name="email"
          value={user.email}        
          onChange={handleChange}
        />
        </div>
          <div className="divInputUser">
          <p className="title">{t("accountDetailsForm.name")}: </p>
        <input
          type="text"
          name="name"         
          value={user.name}
          onChange={handleChange}
        />
      </div>
        
      <div className="divInputUser">
        <p className="title">{t("accountDetailsForm.lastname")}: </p>
        <input
          type="text"
          name="lastname"
          value={user.lastname}
          onChange={handleChange}
        />
      </div>
        
       <div className="divInputUser">
         <p className="title">{t("accountDetailsForm.address")}</p>
        <input
          type="text"
          name="city"
          placeholder={t("accountDetailsForm.city")}
          value={user.address?.city}
          onChange={handleChange}
        />         
         </div> 
         <div className="divInputUser">
        
        <input
          type="text"
          name="country"
          placeholder={t("accountDetailsForm.country")}
          value={user.address?.country}
          onChange={handleChange}
        />         
         </div> 
         <div className="divInputUser">
  
        <input
          type="text"
          name="postalCode"
          placeholder={t("accountDetailsForm.postalCode")}
          value={user.address?.postalCode}
          onChange={handleChange}
        />         
         </div>    
         <div className="divInputUser">
         
        <input
          type="text"
          name="province"
          placeholder={t("accountDetailsForm.province")}
          value={user.address?.province}
          onChange={handleChange}
        />         
         </div> 
         <div className="divInputUser">
       
        <input
          type="text"
          name="street"
          placeholder={t("accountDetailsForm.street")}
          value={user.address?.street}
          onChange={handleChange}
        />         
         </div>  

      <div className="">
        <p className="title">{t("accountDetailsForm.password")}: </p>
        <button onClick={(e) => handleResetPassword(e)}>{t("accountDetailsForm.changePassword")}</button>       
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

      </form>
       <ToastContainer />
    </div>
  )
}