import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import Axios from "axios";

export default function LogInForm() {
  const [data, setData] = useState({
    // password: "",
    email: "",
  });
  let yourStorageUser = JSON.parse(localStorage.getItem("myUser")) || {};
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(yourStorageUser)



  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
      // const register = () => {
        await Axios({
          method: "POST",
          data: {
            username: email,
            password: password,
          },
          withCredentials: true,
          url: "http://localhost:3001/user/login",
        }).then((res) => console.log(res));
      }

      // const usere=  await axios.post("http://localhost:3001/user/login",
  //  {
       
  //       data: {email,
  //       password}
  //     });
  //     console.log(usere, "SOY USERE")
  //     setUser(usere.data)
  //     // console.log(user)
  //   } catch (err) {
  //     console.log(err)
  //     alert(err.response.data.error,);
  //   }
  // };

  const mostra = ()=>{
    let miStorage = JSON.parse(localStorage.getItem("myUser"))
    console.log(miStorage)
  }

  useEffect(()=>{
    localStorage.setItem("myUser", JSON.stringify(user));
  }, [user])

  return (
    <div className="loginCard">
      <button onClick={()=>mostra()}>mostra storage</button> 
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="divInputUser">
          <input
            type="email"
            name="email"
            placeholder="Email ..."
            onChange={(e)=>setEmail(e.target.value)}
            required
            value={email}
          />
        </div>
        <div className="divInputUser">
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(e)=>setPassword(e.target.value)}
            required
            value={password}
          />
        </div>
        <div className="btn">
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
}
