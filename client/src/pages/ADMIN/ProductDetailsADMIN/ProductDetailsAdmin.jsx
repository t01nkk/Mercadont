import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductDetailsInfoAdmin from "../../../components/ADMIN/ProductDetailsInfoADMIN/ProductDetailsInfoAdmin";

export default function ProductDetails() {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const fetchProductById = async () => {
    const fetchedProduct = await axios.get(
      `${process.env.REACT_APP_DOMAIN}/product/${id}`
    );

    setProduct(fetchedProduct.data);
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  return (
    <div className="product-details-container">
      {product && (
        <ProductDetailsInfoAdmin
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          description={product.description}
          stock={product.stock}
          price={product.price}
          // rating={product.rating}
          categories={product.categories}
          // reviews={product.reviews}
          // qua={product.qua}
          status={product.status}
        />
      )}
    </div>
  );
}
