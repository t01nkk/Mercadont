import React, { useEffect, useState } from "react";
import "./SellProductForm.css";
import axios from "axios";
import { fetchCategories } from "../../redux/actions/actions";
import { useStore } from "../../context/store";
import CheckboxCategories from "./CheckboxCategories/CheckboxCategories";

export default function SellProductForm() {
  const [state, dispatch] = useStore();
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    image: "https://www.clarin.com/img/2019/02/18/Kc0iayYpn_340x340__1.jpg",
    status: "inactive",
    stock: "",
    categories: [],
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, image, status, stock, categories } = data;
    try {
      // await axios.post("http://localhost:3001/product/", {
      //   name: name,
      //   price: price,
      //   description: description,
      //   image: image,
      //   status: status,
      //   stock: stock,
      //   categories: categories,
      // });
      console.log(data);
      alert("se envio la peticion");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);
  return (
    <div className="loginCard">
      <h2>Post Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="divInputUser">
          <input
            type="text"
            name="name"
            placeholder="Product Name ..."
            onChange={handleChange}
            required
            value={data.name}
          />
        </div>
        <div className="divInputUser">
          {state.categories &&
            state.categories.map((category) => (
              <CheckboxCategories
                name={category.name}
                id={category.id}
                key={category.id}
                setData={setData}
                data={data}
              />
            ))}
        </div>
        <div className="divInputUser">
          <input
            type="number"
            name="price"
            placeholder="Price ..."
            onChange={handleChange}
            required
            value={data.price}
          />
        </div>
        <div className="divInputUser">
          <textarea
            cols="30"
            rows="15"
            type="textarea"
            name="description"
            placeholder="Product Description ..."
            onChange={handleChange}
            required
            value={data.description}
          ></textarea>
        </div>

        <div>
          <input
            type="text"
            name="image"
            placeholder="Image..."
            onChange={handleChange}
            value={data.image}
          />
        </div>
        <div className="divInputUser">
          <label>Product status:</label>
          <select name="status" value={data.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="divInputUser">
          <input
            type="number"
            name="stock"
            placeholder="Stock..."
            onChange={handleChange}
            value={data.stock}
          />
        </div>
        <div className="btn">
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
}
