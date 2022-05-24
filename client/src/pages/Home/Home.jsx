import React, { useState,useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/store.js";
import { fetchProducts } from "../../redux/actions/actions.js";
import "./Home.css";

export default function Home() {

  const [state, dispatch] = useStore();
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || []
  const [cart, setCart] = useState(initialCart)


  const handleSaveCart = ()=>{
  
    alert("funco")
  }

  useEffect(() => {
    localStorage.setItem("myCart",JSON.stringify(cart))
  }, [cart])
  


  console.log(state.products);
  return (
    <section className="setion-products">
      {state.products &&
        state.products.map((product) => {
          return (

            <ProductCard
              name={product.name}
              key={product.id}
              price={product.price}
              image={product.image}
              rating={product.rating}
              handleSaveCart={handleSaveCart}
            />
          );
        })}
    </section>
  );
}
