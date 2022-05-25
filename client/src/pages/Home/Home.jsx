import React, { useState,useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/store.js";
import { fetchProducts, postManyProducts } from "../../redux/actions/actions.js";
import "./Home.css";

export default function Home() {
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || []

  const [cart, setCart] = useState(initialCart)


  useEffect(()=>{
    localStorage.setItem("myCart", JSON.stringify(cart))
    // localStorage.clear()
  }, [cart])

  const handleSaveCart = (name, price,image, id, stock)=>{
    let products = {name, price,image, id, stock}
    console.log(products)
    // console.log(state)
    setCart((cart)=> [...cart, products])
  }
  //FUNCION PARA VER EL STORAGE, NO BORRAR
  // const mostra = ()=>{
  //   let miStorage = window.localStorage;
  //   console.log(miStorage.myCart)
  // }

  const [state, dispatch] = useStore();



  //USEEFFECT CARGA DE PRODUCTOS

  useEffect(() => {
    const carga = async ()=>{
      await postManyProducts(dispatch)
      await fetchProducts(dispatch);
    }
    carga()
  }, []);

  return (
    <section className="section-products">
      {/* <button onClick={()=>mostra()}>mostra storage</button>   */}
      {/* BOTTON PARA VER EL STORAGE NO BORRAR */}
      {state.products &&
        React.Children.toArray(state.products.map((product) => {
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
        }))
        
        }
    </section>
  );
}