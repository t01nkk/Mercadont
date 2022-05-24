import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/store.js";
import { fetchProducts } from "../../redux/actions/actions.js";
import "./Home.css";

export default function Home() {
  const [state, dispatch] = useStore();
  console.log(state.products);
  return (
    <section className="setion-products">
      <h4>Pablo sos hermosamente idiota</h4>
      {state.products &&
        state.products.map((product) => {
          return (
            <ProductCard
              name={product.name}
              key={product.id}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          );

        })}
    </section>
  );

}
