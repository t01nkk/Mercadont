import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetailsInfo from "../../components/ProductDetailsInfo/ProductDetailsInfo";
import axios from "axios";
export default function ProductDetails() {
  // let { id } = useParams();
  const [product, setProduct] = useState(null);
  // const fetchProductById = async () => {
  //   const fetchedProduct = await axios.get(`http://localhost:3001/home/${id}`);
  //   setProduct(fetchedProduct.data[0]);
  // };
  const fetchCampera = () => {
    const camperuzki = {
      id: 1,
      title: "BASIC BOMBER JACKET",
      price: 109.95,
      description:
        "Jacket with ribbed collar. Long sleeves. Welt pockets at hip. Interior pocket. Elastic hem. Front zip closure.",
      category: "men's clothing",
      image:
        "https://static.zara.net/photos///2022/V/0/2/p/4302/410/800/2/w/850/4302410800_6_1_1.jpg?ts=1643101938806",
      rating: { rate: 3.9, count: 120 },
    };
    setProduct(camperuzki);
  };
  useEffect(() => {
    fetchCampera();
  }, []);

  return (
    <div className="product-details-container">
      {console.log(product, "soy el use effect")}

      {product && (
        <ProductDetailsInfo
          key={product.id}
          name={product.title}
          image={product.image}
          category={product.category}
          rating={product.rating}
        />
      )}
    </div>
  );
}
