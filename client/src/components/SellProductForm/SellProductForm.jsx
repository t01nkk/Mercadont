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
    image:
      "https://t2.uc.ltmcdn.com/es/posts/7/7/5/como_hacer_choripan_42577_orig.jpg",
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
      await axios.post("https://mercadon-t.herokuapp.com/product/create", {
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
    <div className="container-login">
      <div className="sellProductCard">
        {console.log(data.categories)}
        <h2>Post Product</h2>

        <form onSubmit={handleSubmit} className="sellProductForm">
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
          <select onChange={handleChangeCat} className="divInputUser">
            <option value="" hidden className="divInputUser">
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
            <div key={i} className="button-x-container">
              <p>{category}</p>
              <button
                onClick={(event) => handleDeleteCat(category, event)}
                className="button-delete-category"
              >
                x
              </button>
            </div>
          ))}
          <div className="divInputUser">
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
          <div className="btn-login">
            <input type="submit" value="Send" className="input-submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
