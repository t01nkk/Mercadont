import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStore } from "../../../context/store";
import { fetchCategories } from "../../../redux/actions/actions.js";
import { MdDeleteForever } from "react-icons/md";
import "./CategoryCard.css";
export default function EditProduct() {
  const [state, dispatch] = useStore();
  const [product, setProduct] = useState({
    name: "",
  });

  let { id } = useParams();

  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = product;
    try {
      await axios.put(`${process.env.REACT_APP_DOMAIN}/categories/${id}`, {
        name,
      });
      alert("category update successfully");
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
      await axios.delete(`${process.env.REACT_APP_DOMAIN}/categories/${id}`);
      alert("Category deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="divInputUser"
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <div className="btn-addCat">
          <input type="submit" name="Update info" className="input-submit" />
        </div>
      </form>
      <div className="actions">
        <button className="button" onClick={handleDelete}>
          <MdDeleteForever size={30} />
        </button>
      </div>
    </div>
  );
}