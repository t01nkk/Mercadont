import React, { useState,useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/store.js";
import { fetchProducts } from "../../redux/actions/actions.js";
import "./Home.css";

export default function Home() {
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || []

  const [cart, setCart] = useState(initialCart)

  useEffect(()=>{
    localStorage.setItem("myCart", JSON.stringify(cart))
    // localStorage.clear()
  }, [cart])

  const handleSaveCart = (name, price)=>{

    let products = {
      name,
      price
    }
    setCart((cart)=> [...cart, products])
  }
  //FUNCION PARA VER EL STORAGE, NO BORRAR
  // const mostra = ()=>{
  //   let miStorage = window.localStorage;
  //   console.log(miStorage.myCart)
  // }

  const [state, dispatch] = useStore();



  //USEEFFECT CARGA DE PRODUCTOS

  // useEffect(() => {
  //   fetchProducts(dispatch);
  // }, []);

  return (
    <section className="section-products">
      {/* <button onClick={()=>mostra()}>mostra storage</button>   */}
      {/* BOTTON PARA VER EL STORAGE NO BORRAR */}
      {state.products &&
        state.products.map((product) => {
          return (
            <ProductCard
              name={product.title}
              key={product.id}
              price={product.price}
              image={product.image}
              handleSaveCart={handleSaveCart}
            />
          );
        })}
    </section>
  );
}