import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStore } from "../../../context/store.js";
import { fetchCategories } from "../../../redux/actions/actions.js";


export default function EditProduct() {
  const [state, dispatch] = useStore();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categories: [],
    status: "",
  });
  const handleDeleteCat = (name, event) => {
    event.preventDefault();
    const filterCat = product.categories.filter((cat) => cat !== name);
    setProduct({ ...product, categories: filterCat });
  };
  const handleChangeCat = (e) => {
    const { value } = e.target;
    if (!product.categories.includes(value)) {
      setProduct({
        ...product,
        categories: [...product.categories, value],
      });
    }
  };
  let { id } = useParams();

  const fetchProductById = async () => {
    let fetchedProduct = await axios.get(`${process.env.REACT_APP_DOMAIN}/product/${id}`);
    const destructuringCats = [];
    const { categories } = fetchedProduct.data;
    for (const cats of categories) {
      const { name } = cats;
      destructuringCats.push(name);
    }
    console.log(destructuringCats, "soy el array");
    fetchedProduct.data.categories = destructuringCats;
    setProduct(fetchedProduct.data);
    console.log(fetchedProduct.data.categories, "soy el fetch");
  };

  useEffect(() => {
    fetchProductById();
    fetchCategories(dispatch);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, stock, image, categories, status } =
      product;
    try {
      const res = await axios.put(`${process.env.REACT_APP_DOMAIN}/product/update/${id}`, {
        name,
        description,
        price,
        stock,
        image,
        status,
        categories,
      });
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
      await axios.delete(`${process.env.REACT_APP_DOMAIN}/product/delete/${id}`);
      alert("product deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {console.log(product.categories.length)}

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
        <select onChange={handleChangeCat}>
          <option value="" hidden>
            Categories
          </option>
          {state.categories?.length &&
            state.categories.sort((a, b) => a.name.localeCompare(b.name)) &&
            state.categories.map((category) => (
              <option key={category.id} value={category.name || category}>
                {category.name}
              </option>
            ))}
        </select>
        {product.categories.length &&
          product.categories?.map((category, i) => (
            <div key={i}>
              <p>{category.name || category}</p>
              <button onClick={(event) => handleDeleteCat(category, event)}>
                x
              </button>
            </div>
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
