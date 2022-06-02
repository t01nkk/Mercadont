import React, { useEffect } from "react";
import { fetchProducts } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store.js";
import ProductCardAdmin from "../../../components/ADMIN/ProductCardADMIN/ProductCardAdmin";

export default function HomeAdmin() {
  const [state, dispatch] = useStore();
  useEffect(() => {
    fetchProducts(dispatch);
  }, []);
  return (
    <div className="section-products">
      {state.products &&
        React.Children.toArray(
          state.products.map((product) => {
            return (
              <ProductCardAdmin
                id={product.id}
                name={product.name}
                stock={product.stock}
                price={product.price}
                image={product.image}
              />
            );
          })
        )}
    </div>
  );
}
