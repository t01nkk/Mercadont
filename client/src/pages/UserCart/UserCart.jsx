import { t } from "i18next";
import React from "react";
import { useHistory } from "react-router-dom";
import { Cart } from "../../components/Cart/Cart";

export default function UserCart() {
  const history = useHistory();

  const handleBack = async (e) => {
    e.preventDefault();
    history.push("/home");
  };

  return (
    <>
      <Cart />
    </>
  );
}
