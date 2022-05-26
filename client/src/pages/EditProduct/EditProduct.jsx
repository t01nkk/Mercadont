import React, { useEffect, useState } from "react";
import { useForm } from "../../helpers/useForm.js";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function EditProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categories: [""],
  });

  let { id } = useParams();

  const fetchProductById = async () => {
    const fetchedProduct = await axios.get(
      `http://localhost:3001/product/${id}`
    );

    setProduct(fetchedProduct.data);
  };
  useEffect(() => {
    fetchProductById();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, stock, image, categories } = product;
    try {
      await axios.put(`http://localhost:3001/product/${id}`, {
        name,
        description,
        price,
        stock,
        image,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/product/${id}`);
      alert("product deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
        />
        <select name="status" onChange={handleChange}>
          Status:
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {/* {product.categories.map((category) => (
          <input
            type="text"
            name={category.name}
            value={[category.name]}
            onChange={handleChange}
          />
        ))} */}
        <textarea
          name="description"
          cols="30"
          rows="10"
          value={product.description}
          onChange={handleChange}
        >
          {product.description}
        </textarea>
        <input type="submit" name="Update info" />
      </form>
      <img src={`${product.image}`} alt="" />
      <button onClick={handleDelete}>Delete product</button>
    </div>
  );
}
