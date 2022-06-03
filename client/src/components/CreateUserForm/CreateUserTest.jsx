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
    passwordValidate:"",
    address: "",
    payment: "",
    profilePic: "",
  });
  const history = useHistory();
  

  function validator(input) {
    let errors = {};    
    
    if (!expression.nameExpression.test(input.name)) {
        errors.name = 'Name is necessary';
    }
    if (!expression.email.test(input.email)) {
      errors.email = 'Email is necessary';
  }if ((!expression.password.test(input.password)) !== (!expression.password.test(input.passwordValidate))) {
    errors.password = 'Passwords must be the same ';
     }
    return errors
   
  }

  const handleChangeName = (e) => {   
    setErrors("")  
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));    
        setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeEmail = (e) => {
    setErrors("")  
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));
    
        setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangePasspord = (e) => {
    setErrors("")  
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));
        setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangePasspor = (e) => {
    setErrors("")  
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));
        setData({ ...data, [e.target.name]: e.target.value });
  };

 
  const expression = {	
		nameExpression: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /\S+@\S+\.\S+/,
    password: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{0,16}$/,
  }
  

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastName, email, password } = data;
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/user/register`, {
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
              onChange={ handleChangeName}
              value={data.name}
            />
            {errors.name && ( <p className='error-input'>{errors.name}</p> )}
          </div>
          <div className="divInputUser">
            <input
              type="email"
              name="email"
              placeholder="Email ..."
              onChange={handleChangeEmail}
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
              onChange={handleChangePasspord}
              required
              value={data.password}
            />
             
          </div>
          <div className="divInputUser">
            <input
              type="password"
              name="passwordValidate"
              placeholder="Password..." 
              onChange={handleChangePasspor}
              required
              value={data.passwordValidate}
            />
          </div>
          {errors.password && ( <p className='error-input'>{errors.password}</p> )}
          <div className="btn-login">
            <input type="submit" value="Create User"  disabled={errors} className="input-submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
