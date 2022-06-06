import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../context/store";
import {} from "react-router-dom";
export default function AccountDetailsForm() {
  
  const [state, dispatch] = useStore();
  const [user, setUser] = useState({
    email: state.user.email,
    name: "",
    lastname: "",
    address: {
      country:"",
      province: "",
      city:"",
      street:"",
      postalCode: "",
    },
    password: "",
    image:"",

   
  });


  const fetchUser = async () => {
    console.log(state.user)
    try {
      const userDB = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/user/details/${state.user}`
      );
      console.log("user",userDB)
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
 


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name,  lastname,address, image, password  } =
      user;
     

    try {
      const res = await axios.put(`${process.env.REACT_APP_DOMAIN}/user/details/${state.user}`, {
        email,
         name,
         lastname,        
       address, 
         image,
         password 
      });
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



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
          name="city"
          placeholder="City..."
          value={user.address.city}
          onChange={handleChange}
        />         
         </div> 
         <div className="divInputUser">
        
        <input
          type="text"
          name="country"
          placeholder="Country..."
          value={user.address.country}
          onChange={handleChange}
        />         
         </div> 
         <div className="divInputUser">
  
        <input
          type="text"
          name="postalCode"
          placeholder="postalCode"
          value={user.address.postalCode}
          onChange={handleChange}
        />         
         </div>    
         <div className="divInputUser">
         
        <input
          type="text"
          name="province"
          placeholder="Province"
          value={user.address.province}
          onChange={handleChange}
        />         
         </div> 
         <div className="divInputUser">
       
        <input
          type="text"
          name="street"
          placeholder="Street..."
          value={user.address.street}
          onChange={handleChange}
        />         
         </div>   
         
       {/*   <div className="divInputUser">
         <p className="title">password: </p>
        <input
          type="password"
          name="password"
          placeholder="Password..."
          value={user.password}
          onChange={handleChange}
        />         
         </div> */}  
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
