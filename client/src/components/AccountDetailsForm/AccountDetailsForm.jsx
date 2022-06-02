import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/store";

export default function AccountDetailsForm() {
  const [user, setUser] = useState();
  const [state, dispatch] = useStore();

  const fetchUser = async () => {
    try {
      const userDB = await axios.post("https://mercadon-t.herokuapp.com/user/findUser", {
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
  return <>SOY EL FORMULARIO</>;
}
