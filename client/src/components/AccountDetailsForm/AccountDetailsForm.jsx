import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/store";
import {} from "react-router-dom";
export default function AccountDetailsForm() {
  const [user, setUser] = useState();
  const [state, dispatch] = useStore();


  const fetchUser = async () => {
    try {
      const userDB = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/user/findUser`,
        {
          id: state.user,
        }
      );
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

  return <>SOY EL FORMULARIO</>;
}
