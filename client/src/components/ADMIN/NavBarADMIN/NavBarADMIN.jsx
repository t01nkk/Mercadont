import React, { useEffect } from "react";
import logo from "../../../media/header_logo.png";

import LoggedAdmin from "./LoggedAdmin/LoggedAdmin";
import UnloggedAdmin from "./UnloggedAdmin/UnloggedAdmin";
import { useStore } from "../../../context/store";
import {
  checkSessionADMIN,
  fetchCategories,
} from "../../../redux/actions/actions";

export default function NavBarADMIN() {

  const [state, dispatch] = useStore();
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);
  useEffect(() => {
    checkSessionADMIN(dispatch);
  }, [state.sessionAdmin]);
  return (
    <div>
      <header className="header">
        <div className="header-logo">
          <img src={logo} alt="" />
        </div>
        {state.sessionAdmin ? <LoggedAdmin /> : <UnloggedAdmin />}
      </header>
    </div>
  );
}
