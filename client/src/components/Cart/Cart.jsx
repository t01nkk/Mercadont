import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ProductCart } from "../ProductCart/ProductCart";
import { totalPrice } from "./actionsCart";
import { totalCount } from "../../redux/actions/actions";
import accounting from "accounting";
import { useTranslation } from "react-i18next";
import "./Cart.css";
import { useStore } from "../../context/store.js";
import { alertInfo, alertSuccess } from "../../helpers/toast";

export const Cart = () => {
  const { t } = useTranslation();
  let user = JSON.parse(localStorage?.getItem("myUser"));
  let local = JSON.parse(localStorage.getItem(user));
  let yourStorage = JSON.parse(localStorage?.getItem(user));
  const [storageCart, setStorageCart] = useState(yourStorage);
  const history = useHistory();
  const [priceTotal, setPriceTotal] = useState(0);
  const [state, dispatch] = useStore();

  useEffect(() => {
    setPriceTotal(totalPrice());
  }, []);

  let { search } = useLocation();
  useEffect(() => {
    if (search == "?buy=false") {
      alertInfo(t("cart.cancelPurchaseSuccess"));
    }
    if (search == "?buy=true") {
      localStorage.removeItem(user);
      alertSuccess(t("cart.successfullPurchase"));
      setStorageCart([]);
      totalCount(dispatch);
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
    // const answer = window.confirm("Are you sure you want to clear your cart?")
    // // if (answer) {
    // setStorageCart([]);
    // setPriceTotal(totalPrice());
    // localStorage?.removeItem(user);
    // }
    setStorageCart([]);
    setPriceTotal(totalPrice());
    localStorage?.removeItem(user);
    totalCount(dispatch);

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

  const makePurchase = () => {
    localStorage?.setItem("myPrice", JSON.stringify(priceTotal));
    history.push("/buysProducts");
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
          <h3>
            TEXTO CARRO VACIO
            {/* {t("cart.emptyCart")} */}
          </h3>
        )}
      </article>
      <div className="cart-chechout-section">
        {storageCart && storageCart.length > 0 ? (
          <p>
            TOTAL PRICE
            {/* {t("cart.totalPrice")} */}
            {`${accounting.formatMoney(priceTotal, "U$D ", 2)}`}
          </p>
        ) : null}
        {storageCart && storageCart?.length !== 0 ? (
          <button onClick={makePurchase} disabled={storageCart === null}>
            CHECHOUT
            {/* {t("cart.buy")} */}
          </button>
        ) : null}
        <button onClick={() => clearCart()} disabled={storageCart?.length < 1}>
          BOTON DE VACIAR
          {t("cart.emptyTheCart")}
        </button>
      </div>
      {/* <FormBuys priceTotal={priceTotal}/> */}
    </section>
  );
};
