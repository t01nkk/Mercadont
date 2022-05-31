import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/store";
import { Redirect } from "react-router-dom";

export default function Categories() {
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || [];
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useStore();
  const [cart, setCart] = useState(initialCart);  
  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  const handleRedirect = () => {
    if (!state.products.length) {
      setRedirect(true);
    }
  };
  const handleSaveCart = (name, price, image, id, stock) => {
    let products = { name, price, image, id, stock };
    console.log(products);

    setCart((cart) => [...cart, products]);
  };
  useEffect(() => {
    handleRedirect();
  }, []);
  return (
    <div>
      {redirect ? <Redirect push to="/home" /> : null}
      <div className="cardsContainer"> {
        React.Children.toArray(
          state.products.map((product) => {
            return (
              <ProductCard
                id={product.id}
                name={product.name}
                stock={product.stock}
                price={product.price}
                image={product.image}
                handleSaveCart={handleSaveCart}
              />
            );
          })
        )}</div>
     
    </div>
  );
}