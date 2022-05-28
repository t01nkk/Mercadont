import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStore } from "../../context/store";

export default function AccountDetailsForm() {
  const [user, setUser] = useState();
  const [state, dispatch] = useStore();
  const idUser = state.user;
  const fetchUser = async (idUser) => {
    const userDB = await axios.get();
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return <div>AccountDetails FORM</div>;
}
