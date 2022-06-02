import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function LogInForm() {
  const [errors, setErrors] = useState({});
 
  const [data, setData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    payment: "",
    profilePic: "",
  });
  const history = useHistory();
  

  function validator(input) {
    let errors = {};    
    
    if (!expresiones.nombre.test(input.name)) {
        errors.name = 'Name is necessary';
    }
    if (!expresiones.correo.test(input.email)) {
      errors.email = 'Email is necessary';
  }
    return errors
  }

  const handleChangeMin = (e) => {
    setErrors("")  
    if (!expresiones.nombre.test(data.name))setErrors(validator({ ...data, [e.target.name]: e.target.value }));
    
        setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeMi = (e) => {
    setErrors("")  
    if (!expresiones.correo.test(data.password))setErrors(validator({ ...data, [e.target.name]: e.target.value }));
    
        setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeM = (e) => {
   
        setData({ ...data, [e.target.name]: e.target.value });
  };

 
  const expresiones = {	
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    correo: /\S+@\S+\.\S+/
  }

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastName, email, password } = data;
    try {
      await axios.post("http://localhost:3001/user/register", {
        email: email,
        password: password,
      });
      history.push("/login");
    } catch (err) {
      alert(err);
    }
  };
  console.log(data);
  return (
    <div className="container-login">
      <div className="loginCard">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="divInputUser">
            <input
              type="text"
              name="name"
              placeholder="First Name ..."
              onChange={ handleChangeMin}
              value={data.name}
            />
            {errors.name && ( <p className='error-input'>{errors.name}</p> )}
          </div>
          <div className="divInputUser">
            <input
              type="email"
              name="email"
              placeholder="Email ..."
              onChange={handleChangeMi}
              required
              value={data.email}
            />
             {errors.email && ( <p className='error-input'>{errors.email}</p> )}
          </div>
          <div className="divInputUser">
            <input
              type="password"
              name="password"
              placeholder="Password..."
              onChange={handleChangeM}
              required
              value={data.password}
            />
          </div>
          <div className="btn-login">
            <input type="submit" value="Create User" className="input-submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
