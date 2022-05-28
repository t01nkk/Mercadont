import React, { useEffect, useState } from "react";
import "./ProductCart.css";
export const ProductCart = ({
  name,
  stock,
  price,
  id,
  image,
  deleteDatatoStorage,
  viewProduct,
  pos,
  totalPrice,
}) => {
  let yourStorage = JSON.parse(localStorage.getItem("myCart"));
  const [storageCart, setStorageCart] = useState(yourStorage);
  const [permitLess, setPermitLess] = useState(false);
  const [permitMore, setPermitMore] = useState(true);
  const [count, setCount] = useState(storageCart[pos].amount);

  useEffect(() => {
    totalPrice();
  }, [count]);

  const oneMore = (stock, name, price) => {
    setCount(count + 1);
    if (count + 1 > 1) setPermitLess(true);
    if (count + 1 === stock) setPermitMore(false);
    changeAmount(count, name, 1, price);
  };

  //Funcion para restar producto al carro
  const oneLess = (stock, name,price)=>{
      console.log(count)
      setCount(count-1)
      if(count -1 < 2) setPermitLess(false)
      if(count -1 < stock) setPermitMore(true)
      changeAmount(count,name, -1, price)
    }
  
  
  let changeAmount = (num, name, SoR ,price)=>{
    let articleStogare = yourStorage.find(e => e.name === name)
    articleStogare.amount = num + (SoR)
    articleStogare.totalPrice = Math.round(price * (count + SoR))
    setStorageCart(yourStorage)
    localStorage.setItem("myCart", JSON.stringify(yourStorage))
  }

  //FUNCION PARA VER EL STORAGE, NO BORRAR

  const mostra = () => {
    let miStorage = window.localStorage;
    console.log(yourStorage);
  };

  return (
    <article>
      <button onClick={() => mostra()}>mostra storage</button>
      <div>
        {/* <button onClick={()=>setDataToEdit(el)}>Editar</button> */}
        {/* {permitMore && <button onClick={()=>oneMore(stock, name, pos)}>+</button>}*/}
        {/* <p>{price * count}</p> */}
        {count !== stock ? (
          <button onClick={() => oneMore(stock, name, price)}>+</button>
        ) : (
          console.log("hola")
        )}
        {/* {<button onClick={()=>oneMore(stock, name, price)}>+</button>}                         */}

        {/* {permitLess && <button onClick={()=>oneLess(stock, name)}>-</button>} */}
        {count !== 1 ? (
          <button onClick={() => oneLess(stock, name, price)}>-</button>
        ) : (
          console.log("chau")
        )}
        <span>{storageCart[pos].amount}</span>
        <p>{price * count}</p>

        <button onClick={() => deleteDatatoStorage(name)}>Eliminar</button>
        <button onClick={() => viewProduct(id)}>Ver</button>
        <picture>
          <img src={image} alt={name} className={"DOWNSIZE"} />
        </picture>
        <p>{name}</p>
        <p>{price}</p>
      </div>
    </article>
  );
};
