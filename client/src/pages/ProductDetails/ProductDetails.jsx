import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailsInfo from "../../components/ProductDetailsInfo/ProductDetailsInfo";
import axios from "axios";
import "./ProductDetails.css";
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

  console.log(product);
  return (
    <div className="product-details-container">
      {product && (
        <ProductDetailsInfo
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
