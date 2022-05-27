import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/store.js";
import { fetchCategories, fetchProducts } from "../../redux/actions/actions.js";
import "./Home.css";

export default function Home() {
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || [];
  const [cart, setCart] = useState(initialCart);
  const [state, dispatch] = useStore();

  const handleSaveCart = (name, price,image, id, stock)=>{
    let amount = 1
    let products = {name, price,image, id, stock, amount}
    // console.log(products)
    setCart((cart)=> [...cart, products])
  }
  //FUNCION PARA VER EL STORAGE, NO BORRAR
  // const mostra = ()=>{
  //   let miStorage = window.localStorage;
  //   console.log(miStorage.myCart)
  // }

  useEffect(() => {
    const carga = async () => {
      await fetchProducts(dispatch);
      // await postManyProducts(dispatch)
    };
    carga();
  }, []);


  return (
    <section className="section-products">
      {console.log(state.products)}
      {/* <button onClick={()=>mostra()}>mostra storage</button>   */}
      {/* BOTTON PARA VER EL STORAGE NO BORRAR */}
      {state.products &&
        React.Children.toArray(
          state.products.map((product) => {
            return (
              <ProductCard
                id={product.id}
                name={product.name}
                stock={product.stock}
                // key={product.id}
                price={product.price}
                image={product.image}
                handleSaveCart={handleSaveCart}
              />
            );
          })
        )}
    </section>
  );
}
