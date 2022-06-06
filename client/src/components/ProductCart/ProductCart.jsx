import React, { useState } from "react";
import "./ProductCart.css";
import { totalPrice } from "../Cart/actionsCart";
// import "../Favorites/Favorite.css"
import accounting from "accounting";
import "../Cart/Cart.css"
export const ProductCart = ({
  name,
  stock,
  price,
  id,
  image,
  deleteDatatoStorage,
  viewProduct,
  pos,
  setPriceTotal,
  // totalPrice
}) => {
  let user = JSON.parse(localStorage.getItem("myUser"));
  let yourStorage = JSON.parse(localStorage.getItem(user));
  const [storageCart, setStorageCart] = useState(yourStorage);
  const [permitLess, setPermitLess] = useState(false);
  const [permitMore, setPermitMore] = useState(true);
  const [count, setCount] = useState(storageCart[pos].quantity);

  const oneMore = (stock, name, price) => {
    setCount(count + 1);
    if (count + 1 > 1) setPermitLess(true);
    if (count + 1 === stock) setPermitMore(false);
    changeAmount(count, name, 1, price);
  };

  //Funcion para restar producto al carro
  const oneLess = (stock, name, price) => {
    setCount(count - 1);
    if (count - 1 < 2) setPermitLess(false);
    if (count - 1 < stock) setPermitMore(true);
    changeAmount(count, name, -1, price);
  };

  let changeAmount = (num, name, SoR, price) => {
    let articleStogare = yourStorage.find((e) => e.name === name);
    articleStogare.quantity = num + SoR;
    articleStogare.totalPrice = Math.round(price * (count + SoR));
    setStorageCart(yourStorage);
    localStorage.setItem(user, JSON.stringify(yourStorage));
    setPriceTotal(totalPrice());
  };


  return (
    <article className="article-product-cart">
       <div className="container-img">
        <div className="col-sm-5 containe-img-cart">
          <img src={image} alt={name} className="card-img-to d-block w-100" />
        </div>
      </div>
        <div className="details-product-cart">
          <p>{name}</p>
          <p> U$D {price}</p>
          <p>TOTAL: U$D {price * count}</p>
          <div>
            {count !== 1 ? (
              <button className="btn btn-primary btn-sm" onClick={() => oneLess(stock, name, price)}>-</button>
            ) : (
              console.log("chau")
              )}
            <span>{storageCart[pos].quantity}</span>
            {count !== stock ? (
                <button className="btn btn-primary btn-sm" onClick={() => oneMore(stock, name, price)}>+</button>
            ) : (
                console.log("hola")
            )}
          </div>
          
          <div>
            <button className="del-view-product-cart" onClick={() => deleteDatatoStorage(name)}>Eliminar</button>
            <button className="del-view-product-cart" onClick={() => viewProduct(id)}>Ver</button>
        </div>
          </div>

    </article>
  );
};
