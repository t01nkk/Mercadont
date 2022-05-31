import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// import { FormBuys } from '../FormBuys/FormBuys'
import { ProductCart } from '../ProductCart/ProductCart'
import { totalPrice } from './actionsCart'



export const Cart = () => {
  let yourStorage = JSON.parse(localStorage.getItem("myCart"));
  const [storageCart, setStorageCart] = useState(yourStorage);
  const history = useHistory();
  const [priceTotal, setPriceTotal] = useState(0);

  // let yourStorage = JSON.parse(localStorage.getItem("myCart"))
  // const [storageCart, setStorageCart] = useState(yourStorage)
  // const history = useHistory()
  // const [priceTotal, setPriceTotal] = useState(0)


  useEffect(() => {
    setPriceTotal(totalPrice())
    // totalPrice()
  }, [])

  const deleteDatatoStorage = (name) => {
    let newLocalStorage = yourStorage.filter(e => e.name !== name)
    setStorageCart(newLocalStorage)
    console.log(newLocalStorage)
    localStorage.setItem("myCart", JSON.stringify(newLocalStorage))
    setPriceTotal(totalPrice())
    // totalPrice()
  }

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
  const clearCart = () => {
    localStorage.removeItem("myCart");
    setStorageCart([]);
  };



  const makePurchase = () => {
    // let local = JSON.parse(localStorage.getItem("myCart"))
    // console.log(local, priceTotal)
    localStorage.setItem("myPrice", JSON.stringify(priceTotal))
    history.push("/buysProducts")
  }


  return (
    <div>
      {/* <button onClick={() => clearCart()}>Clear Cart</button>
      <button onClick={() => mostra()}>mostra storage</button> */}
      <section>
        <h2>Welcome your Cart</h2>
        <p>Total price:{priceTotal}</p>
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
              />
            ))
          ) : (
            <h3>Sin datos</h3>
          )}
        </div>
        <button onClick={makePurchase}>Buy</button>
      </section>

      {/* <FormBuys priceTotal={priceTotal}/> */}
      <br />
    </div>
  );
};
