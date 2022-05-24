import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/store.js";
import { fetchProducts } from "../../redux/actions/actions.js";
import "./Home.css";

export default function Home() {
  const [state, dispatch] = useStore();

  // useEffect(() => {
  //   fetchProducts(dispatch);
  // }, []);
  console.log(state.products);
  return (
    <section className="section-products">
      {state.products &&
        state.products.map((product) => {
          return (
            <ProductCard
              name={product.title}
              key={product.id}
              price={product.price}
              image={product.image}
            />
          );
        })}
    </section>
  );
}
