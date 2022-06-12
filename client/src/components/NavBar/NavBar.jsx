import React, { useEffect } from "react";
import "./navBar.css";
import { checkSession, fetchCategories } from "../../redux/actions/actions";
import LoggedNavBar from "./LoggedNavBar/LoggedNavBar.jsx";
import GuestNavBar from "./GuestNavBar/GuestNavBar";
import { useStore } from "../../context/store";

export default function NavBar() {
  const [state, dispatch] = useStore();
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);
  useEffect(() => {
    checkSession(dispatch);
  }, [state.session]);
  return <>{state.session ? <LoggedNavBar /> : <GuestNavBar />}</>;
}
