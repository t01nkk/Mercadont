import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/store";

export default function AccountDetails() {
  const [user, setUser] = useState();
  const [state, dispatch] = useStore();

  const fetchUser = async () => {
    try {
      const userDB = await axios.post("http://localhost:3001/user/findUser", {
        id: state.user,
      });
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
  return (
    <>
      <Link to="/editProfile">
        <button>Edit your profile</button>
      </Link>
      <div>
        <p>Your Info:</p>
        <p>Email:{user?.email}</p>
        <p>Name:{user?.name}</p>
        <p>Lastname:{user?.lastname}</p>
        <p>Adress:{user?.adress}</p>
      </div>
    </>
  );
}
