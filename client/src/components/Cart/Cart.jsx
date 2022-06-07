import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
// import { FormBuys } from '../FormBuys/FormBuys'
import { ProductCart } from "../ProductCart/ProductCart";
import { totalPrice } from "./actionsCart";
import accounting from "accounting";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "../Favorites/Favorite.css"

export const Cart = () => {
  const { t } = useTranslation()
  let user = JSON.parse(localStorage?.getItem("myUser"));
  let yourStorage = JSON.parse(localStorage?.getItem(user));
  const [storageCart, setStorageCart] = useState(yourStorage);
  const history = useHistory();
  const [priceTotal, setPriceTotal] = useState(0);


  useEffect(() => {
    setPriceTotal(totalPrice());
  }, []);

  const alertProductRemovedFromCart = (msg) => {
    toast.info(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    })
  }

  const alertEmptiedCart = (msg) => {
    toast.info(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    })
  }

  const deleteDatatoStorage = (name) => {
    let newLocalStorage = yourStorage?.filter((e) => e.name !== name);
    setStorageCart(newLocalStorage);
    localStorage.setItem(user, JSON.stringify(newLocalStorage));
    setPriceTotal(totalPrice());
    alertProductRemovedFromCart(t("cart.removeFromCart"))
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
    const answer = window.confirm(t("cart.confirmClearCart"))
    if (answer) {
      setStorageCart([]);
      setPriceTotal(totalPrice())
      localStorage?.removeItem(user);
      alertEmptiedCart(t("cart.removeEverythingFromCart"))
      setTimeout(() => {
        history.push('/home')
      }, 4000);
    }
  };

  const makePurchase = () => {
    localStorage?.setItem("myPrice", JSON.stringify(priceTotal));
    history.push("/buysProducts");
  };

  return (
    <div>{ }
      <button onClick={() => clearCart()} disabled={storageCart?.length < 1}>{t("cart.emptyTheCart")}</button>
      <section>
        <h2>{t("cart.welcome")}</h2>
        <div className='container container-product-cart'>
          {storageCart && storageCart?.length > 0 ? (
            React.Children.toArray(storageCart.map((el, index) => (
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
            )))
          )
            : <h3>{t("cart.emptyCart")}</h3>
          }
        </div>
        {storageCart && storageCart.length > 0 ?
          <p>
            {t("cart.totalPrice")}
            {`${accounting.formatMoney(priceTotal, "U$D ", 2)}`}
          </p>
          : null
        }
        {
          storageCart && storageCart?.length !== 0 ? <button onClick={makePurchase} disabled={storageCart === null}>{t("cart.buy")}</button>
            : null
        }
      </section>

      {/* <FormBuys priceTotal={priceTotal}/> */}
      <br />
      <ToastContainer />
    </div>
  );
};
