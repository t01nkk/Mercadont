import React, { useEffect, useState } from "react";
import "./SellProductForm.css";
import axios from "axios";
import { fetchCategories } from "../../redux/actions/actions";
import { useStore } from "../../context/store";
// import Multiselect from "multiselect-react-dropdown";

export default function SellProductForm() {
  const [state, dispatch] = useStore();
  const [selected, setSelected] = useState([]);

  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    image: "https://www.clarin.com/img/2019/02/18/Kc0iayYpn_340x340__1.jpg",
    status: "inactive",
    stock: "",
    categories: [],
  });
  const handleDeleteCat = (name, event) => {
    event.preventDefault();
    const filterCat = data.categories.filter((cat) => cat !== name);
    setData({ ...data, categories: filterCat });
  };
  const handleChangeCat = (e) => {
    const { value } = e.target;
    setData({ ...data, categories: [...data.categories, value] });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, image, status, stock, categories } = data;
    try {
      await axios.post("http://localhost:3001/product/", {
        name: name,
        price: parseInt(price),
        description: description,
        image: image,
        status: status,
        stock: parseInt(stock),
        categories: categories,
      });

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
      {console.log(data.categories)}
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
        <select onChange={handleChangeCat}>
          <option value="" hidden>
            Categories
          </option>
          {state.categories?.length &&
            state.categories.sort((a, b) => a.name.localeCompare(b.name)) &&
            state.categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
        {data.categories?.map((category, i) => (
          <div key={i}>
            <p>{category}</p>
            <button onClick={(event) => handleDeleteCat(category, event)}>
              x
            </button>
          </div>
        ))}
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
