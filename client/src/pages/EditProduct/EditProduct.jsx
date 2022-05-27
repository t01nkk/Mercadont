import React, { useEffect, useState } from "react";
import { useForm } from "../../helpers/useForm.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStore } from "../../context/store.js";
import { fetchCategories } from "../../redux/actions/actions.js";
import CheckboxCategories from "./CheckboxCategoriesEdit/CheckboxCategoriesEdit.jsx";

export default function EditProduct() {
  const [state, dispatch] = useStore();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categories: [""],
    status: "",
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
    fetchCategories(dispatch);
  }, []);
  const getName = (value) => {
    console.log(value, "soy value");
    setProduct({
      ...product,
      categories: product.categories.concat(value),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, stock, image, categories, status } =
      product;
    try {
      // const res = await axios.put(`http://localhost:3001/product/${id}`, {
      //   name,
      //   description,
      //   price,
      //   stock,
      //   image,
      //   status,
      //   categories,
      // });
      console.log(product);
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
        <select name="status" onChange={handleChange} value={product.status}>
          Status:
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {state.categories &&
          state.categories.map((category) => (
            <CheckboxCategories
              name={category.name}
              id={category.id}
              key={category.id}
              getName={getName}
              filter={product.categories}
            />
          ))}
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
