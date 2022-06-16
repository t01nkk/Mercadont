import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ProductCart } from "../ProductCart/ProductCart";
import { totalPrice } from "./actionsCart";
import { totalCount } from "../../redux/actions/actions";
import accounting from "accounting";
import { useTranslation } from "react-i18next";
import "./Cart.scss";
import { useStore } from "../../context/store.js";
import { alertInfo, alertSuccess, alertWarning } from "../../helpers/toast";
import axios from "axios";

export const Cart = () => {
  const { t } = useTranslation();
  var user = JSON.parse(localStorage?.getItem("myUser"));
  let local = JSON.parse(localStorage.getItem(user));
  let yourStorage = JSON.parse(localStorage?.getItem(user));
  const [storageCart, setStorageCart] = useState(yourStorage);
  const history = useHistory();
  const [priceTotal, setPriceTotal] = useState(0);
  const [state, dispatch] = useStore();

  const handleKick = async () => {
    const check = await JSON.parse(localStorage?.getItem("myUser"));
    if (check === null) {
      history.push("/login");
    }
  };
  useEffect(() => {
    handleKick();
  }, []);

  useEffect(() => {
    setPriceTotal(totalPrice());
  }, []);

  let { search } = useLocation();
  useEffect(() => {
    if (search == "?buy=false") {
      alertInfo(t("cart.cancelPurchaseSuccess"));
    }
    if (search == "?buy=noStock") {
      totalCount(dispatch);
      history.push("/");
    }
    if (search == "?buy=true") {
      localStorage.removeItem(user);
      alertSuccess(t("cart.successfulPurchase"));
      totalCount(dispatch);
      setStorageCart([]);
    }
  }, [search]);

  const deleteDatatoStorage = (name) => {
    let newLocalStorage = yourStorage?.filter((e) => e.name !== name);
    setStorageCart(newLocalStorage);
    localStorage.setItem(user, JSON.stringify(newLocalStorage));
    setPriceTotal(totalPrice());
    totalCount(dispatch);
    alertInfo(t("cart.removeFromCart"));
    // totalPrice()
  };

  //Funcion para ver detalle del producto por id
  const viewProduct = (id) => {
    history.push(`/home/${id}`);
  };

  // FUNCION PARA VER EL STORAGE, NO BORRAR
  const mostra = () => {
    let miStorage = window.localStorage;
  };

  //Funcion para limpiar carro
  const clearCart = (e) => {
    const answer = window.confirm(t("cart.confirmClearCart"));
    if (answer) {
      setStorageCart([]);
      setPriceTotal(totalPrice());
      localStorage?.removeItem(user);
      totalCount(dispatch);
      alertInfo(t("cart.removeEverythingFromCart"));
      setTimeout(() => {
        history.push("/home");
      }, 2000);
    }
  };

  const makePurchase = async () => {
    try {
      const userDetails = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/user/details/${user}`
      );
      const country = userDetails.data.country;
      const province = userDetails.data.province;
      const city = userDetails.data.city;
      const street = userDetails.data.street;
      const postalCode = userDetails.data.postalCode;

      // if( country === "" || province === "" || city === "" || street === "" || postalCode=== "" ){
      //   alertWarning(t("cart.addressDetailsMissing"))
      //   setTimeout(() => {
      //     history.push("/accountDetails")
      //   }, 1000);
      //   return
      // }

      localStorage?.setItem("myPrice", JSON.stringify(priceTotal));
      history.push("/buysProducts");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="cart-container">
      <h2 className="cart-container-title">{t("cart.welcome")}</h2>
      <article className="cart-cards">
        {storageCart && storageCart?.length > 0 ? (
          React.Children.toArray(
            storageCart.map((el, index) => (
              <ProductCart
                name={el.name}
                stock={el.stock}
                price={el.price}
                id={el.id}
                image={el.image}
                pos={index}
                viewProduct={viewProduct}
                deleteDatatoStorage={deleteDatatoStorage}
                totalPrice={totalPrice}
                setPriceTotal={setPriceTotal}
              />
            ))
          )
        ) : (
          <h3>{t("cart.emptyCart")}</h3>
        )}
      </article>
      <div className="cart-chechout-section">
        {storageCart && storageCart.length > 0 ? (
          <p className="total-price-cart">
            {t("cart.totalPrice")}
            {`${accounting.formatMoney(priceTotal, "U$D ", 2)}`}
          </p>
        ) : null}
        {storageCart && storageCart?.length !== 0 ? (
          <>
            <button
              onClick={makePurchase}
              disabled={storageCart === null}
              className="cart-buy-button"
            >
              <span className="button__text">{t("cart.buy")}</span>
              <svg
                className="button__svg"
                role="presentational"
                viewBox="0 0 600 600"
              >
                <defs>
                  <clipPath id="myClip">
                    <rect x="0" y="0" width="100%" height="50%" />
                  </clipPath>
                </defs>
                <g clipPath="url(#myClip)">
                  <g id="money">
                    <path
                      d="M441.9,116.54h-162c-4.66,0-8.49,4.34-8.62,9.83l.85,278.17,178.37,2V126.37C450.38,120.89,446.56,116.52,441.9,116.54Z"
                      fill="#57c478"
                      stroke="#000000"
                      strokeMiterlimit="10"
                      strokeWidth="8"
                    />
                    <path
                      d="M424.73,165.49c-10-2.53-17.38-12-17.68-24H316.44c-.09,11.58-7,21.53-16.62,23.94-3.24.92-5.54,4.29-5.62,8.21V376.54H430.1V173.71C430.15,169.83,427.93,166.43,424.73,165.49Z"
                      fill="#699e64"
                      stroke="#000000"
                      strokeMiterlimit="10"
                      strokeWidth="8"
                    />
                  </g>
                  <g id="creditcard">
                    <path
                      d="M372.12,181.59H210.9c-4.64,0-8.45,4.34-8.58,9.83l.85,278.17,177.49,2V191.42C380.55,185.94,376.75,181.57,372.12,181.59Z"
                      fill="#a76fe2"
                      stroke="#000000"
                      strokeMiterlimit="10"
                      strokeWidth="8"
                    />
                    <path
                      d="M347.55,261.85H332.22c-3.73,0-6.76-3.58-6.76-8v-35.2c0-4.42,3-8,6.76-8h15.33c3.73,0,6.76,3.58,6.76,8v35.2C354.31,258.27,351.28,261.85,347.55,261.85Z"
                      fill="#ffdc67"
                    />
                    <path
                      d="M249.73,183.76h28.85v274.8H249.73Z"
                      fill="#000000"
                    />
                  </g>
                </g>
                <g id="wallet">
                  <path
                    d="M478,288.23h-337A28.93,28.93,0,0,0,112,317.14V546.2a29,29,0,0,0,28.94,28.95H478a29,29,0,0,0,28.95-28.94h0v-229A29,29,0,0,0,478,288.23Z"
                    fill=" #634739"
                    stroke="#000000"
                    strokeMiterlimit="10"
                    strokeWidth="10"
                  />
                  <path
                    d="M512.83,382.71H416.71a28.93,28.93,0,0,0-28.95,28.94h0V467.8a29,29,0,0,0,28.95,28.95h96.12a19.31,19.31,0,0,0,19.3-19.3V402a19.3,19.3,0,0,0-19.3-19.3Z"
                    fill=" #634739"
                    stroke="#000000"
                    strokeMiterlimit="10"
                    strokeWidth="8"
                  />
                  <path
                    d="M451.46,435.79v7.88a14.48,14.48,0,1,1-29,0v-7.9a14.48,14.48,0,0,1,29,0Z"
                    fill="#9f7159"
                    stroke="#000000"
                    strokeMiterlimit="10"
                    strokeWidth="9"
                  />
                  <path
                    d="M148.16,343.22a6,6,0,0,0-6,6v92a6,6,0,0,0,12,0v-92A6,6,0,0,0,148.16,343.22Z"
                    fill="#000000"
                  />
                </g>
              </svg>
            </button>
            <button onClick={makePurchase} className="buy-btn-responsive">
              {t("cart.buy")}
            </button>
          </>
        ) : null}
        {storageCart?.length >= 1 ? (
          <button
            className="button-danger"
            onClick={() => clearCart()}
            disabled={storageCart?.length < 1}
          >
            {t("cart.emptyTheCart")}
          </button>
        ) : null}
      </div>
    </section>
  );
};
