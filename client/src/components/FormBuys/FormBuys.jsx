import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { SendBuys } from "./SendBuys";
import { useHistory } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51L4snIL7xpNkb3eJQBt4bqqFp210ibYX3h2VfPQsqSTsB25cXbxu3cJrdcAeBZziNyR932LN0ykEkIpLbptfwNz800e0a2VxjL"
);

export const FormBuys = () => {
  const history = useHistory();
  const handleKick = async () => {
    const check = await JSON.parse(localStorage?.getItem("myUser"));
    if (check === null) {
      history.push("/login");
    }
  };
  useEffect(() => {
    handleKick();
  }, []);
  return (
    <Elements stripe={stripePromise}>
      <SendBuys />
    </Elements>
  );
};
