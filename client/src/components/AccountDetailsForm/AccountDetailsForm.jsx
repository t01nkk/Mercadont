import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../context/store";
import {} from "react-router-dom";
import { useAuth } from "../../context/authContext";
export default function AccountDetailsForm() {
  
  const { resetPassword } = useAuth();
  const [state, dispatch] = useStore();
  const [user, setUser] = useState({
    email: state.user.email,
    name: "",
    lastname: "",
    address: "",
    password: "",
    image:"",  
  });
  let id= localStorage.getItem("myUser")

  const fetchUser = async () => {
    // console.log(state.user)
    try {
      let miStorage = JSON.parse(localStorage.getItem("myUser"));
      const userDB = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/user/details/${miStorage}`
      );
      // console.log("user",userDB.data)
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
    const { email, name,  lastname,address, image, password  } = user;
      // console.log(id)
    try {
      const res = await axios.put(`${process.env.REACT_APP_DOMAIN}/user/details/${state.user}`, {
        email,
        name,
        lastname,        
        address, 
        image,
        password 
      });
      // console.log(user);
      return res
    } catch (err) {
      // console.log(err);
      return err
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e)=>{
    e.preventDefault();
    // console.log("handleResetPassword USER:",user)
    const answer = window.confirm("Are you sure you want to change your password?")
    if(answer){
      try {
        await resetPassword(user.email)
        alert("Check your email inbox to reset your password")
      }
      catch (err){
        alert(err.message)
      }
    } 
  }

  return (
    <div>
      <h2>Edit profile</h2>
      <form onSubmit={handleSubmit}>
      <div className="divInputUser">
      <label className="title">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}        
          onChange={handleChange}
        />
        </div>
          <div className="divInputUser">
          <p className="title">Name: </p>
        <input
          type="text"
          name="name"         
          value={user.name}
          onChange={handleChange}
        />
      </div>
        
      <div className="divInputUser">
        <p className="title">lastname: </p>
        <input
          type="text"
          name="lastname"
          value={user.lastname}
          onChange={handleChange}
        />
      </div>

      <div className="divInputUser">
        <p className="title">address: </p>
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
        />         
      </div> 
  
      <div className="">
        <p className="title">password: </p>
        <button onClick={(e) => handleResetPassword(e)}>Change Password</button>       
      </div>

      <div className="divInputUser">
        <p className="title">Image: </p>
          <input
            type="text"
            name="image"
            placeholder="Image..."
            onChange={handleChange}
            value={user.image}
          />
      </div>       
        <div className="btn-login">
        <input type="submit"  name="Update info" className="input-submit"/>
        </div>
        
      </form>

    </div>
  )
}
