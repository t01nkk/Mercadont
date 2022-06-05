import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
// import { FormBuys } from '../FormBuys/FormBuys'
import { ProductCart } from "../ProductCart/ProductCart";
import { totalPrice } from "./actionsCart";
import accounting from "accounting";

export const Cart = () => {
  let user = JSON.parse(localStorage.getItem("myUser"));
  let yourStorage = JSON.parse(localStorage.getItem(user));
  const [storageCart, setStorageCart] = useState(yourStorage);
  const history = useHistory();
  const [priceTotal, setPriceTotal] = useState(0);

  // let yourStorage = JSON.parse(localStorage.getItem("myCart"))
  // const [storageCart, setStorageCart] = useState(yourStorage)
  // const history = useHistory()
  // const [priceTotal, setPriceTotal] = useState(0)

  useEffect(() => {
    setPriceTotal(totalPrice());
    // totalPrice()
  }, []);

  const deleteDatatoStorage = (name) => {
    let newLocalStorage = yourStorage.filter((e) => e.name !== name);
    setStorageCart(newLocalStorage);
    localStorage.setItem(user, JSON.stringify(newLocalStorage));
    setPriceTotal(totalPrice());
    // totalPrice()
  };

  //Funcion para ver detalle del producto por id
  const viewProduct = (id) => {
    history.push(`/home/${id}`);
  };

  // FUNCION PARA VER EL STORAGE, NO BORRAR
  const mostra = () => {
    let miStorage = window.localStorage;
    console.log(yourStorage);
  };

  //Funcion para limpiar carro
  const clearCart = (e) => {
    const answer = window.confirm("Are you sure you want to clear your cart?")
    if (answer) {
      setStorageCart([]);
      setPriceTotal(totalPrice())
      localStorage.removeItem(user);
    }
  };

  const makePurchase = () => {
    localStorage.setItem("myPrice", JSON.stringify(priceTotal));
    history.push("/buysProducts");
  };

  return (
    <div>{ }
      <button onClick={() => clearCart()} disabled={storageCart === null}>Clear Cart</button>
      <section>
        <h2>Welcome your Cart</h2>
        <div>
          {storageCart && storageCart.length > 0 ? (
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
          ) : <h3>Your Cart is Empty</h3>
          }
        </div>
        <p>
          Total price:
          {`${accounting.formatMoney(priceTotal, "U$D ", 2)}`}
        </p>
        {
          storageCart.length !== 0 && <button onClick={makePurchase} disabled={storageCart === null}>Buy</button>
        }
      </section>

      {/* <FormBuys priceTotal={priceTotal}/> */}
      <br />
    </div>
  );
};
