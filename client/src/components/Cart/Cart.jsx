import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
// import { FormBuys } from '../FormBuys/FormBuys'
import { ProductCart } from "../ProductCart/ProductCart";
import { totalPrice } from "./actionsCart";
import { totalCount } from "../../redux/actions/actions";
import accounting from "accounting";
import "../Favorites/Favorite.css"
import { useStore } from "../../context/store.js";

export const Cart = () => {
  let user = JSON.parse(localStorage?.getItem("myUser"));
  let local = JSON.parse(localStorage.getItem(user))
  let yourStorage = JSON.parse(localStorage?.getItem(user));
  const [storageCart, setStorageCart] = useState(yourStorage);
  const history = useHistory();
  const [priceTotal, setPriceTotal] = useState(0);
  const [state, dispatch] = useStore();

  useEffect(() => {
    setPriceTotal(totalPrice());
  }, []);

  const deleteDatatoStorage = (name) => {
    let newLocalStorage = yourStorage?.filter((e) => e.name !== name);
    setStorageCart(newLocalStorage);
    localStorage.setItem(user, JSON.stringify(newLocalStorage));
    setPriceTotal(totalPrice());
    totalCount(dispatch)
  };

  //Funcion para ver detalle del producto por id
  const viewProduct = (id) => {
    history.push(`/home/${id}`);
  };

  // FUNCION PARA VER EL STORAGE, NO BORRAR
  const mostra = () => {
    let miStorage = window.localStorage;
    // console.log(yourStorage);
  };

  //Funcion para limpiar carro
  const clearCart = (e) => {
    const answer = window.confirm("Are you sure you want to clear your cart?")
    if (answer) {
      setStorageCart([]);
      setPriceTotal(totalPrice())
      localStorage?.removeItem(user);
    }
  };

  const makePurchase = () => {
    // let local = JSON.parse(localStorage.getItem("myCart"))
    // console.log(local, priceTotal)
    localStorage?.setItem("myPrice", JSON.stringify(priceTotal));
    history.push("/buysProducts");
  };

  return (
    <div>
      <button onClick={() => clearCart()} disabled={storageCart?.length < 1}>Clear Cart</button>
      <section>
        <h2>Welcome to your Cart</h2>
        <div className='container container-product-cart'>
          {storageCart && storageCart?.length > 0 ? (
            storageCart.map((el, index) => (
              <ProductCart
                key={el.name}
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
            : <h3>Your Cart is Empty</h3>
          }
        </div>
        {storageCart && storageCart.length > 0 ?
          <p>
            Total price:
            {`${accounting.formatMoney(priceTotal, "U$D ", 2)}`}
          </p>
          : null
        }
        {
          storageCart && storageCart?.length !== 0 ? <button onClick={makePurchase} disabled={storageCart === null}>Buy</button>
            : null
        }
      </section>

      {/* <FormBuys priceTotal={priceTotal}/> */}
      <br />
    </div>
  );
};
