import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStore } from "../../../context/store";
import { fetchCategories } from "../../../redux/actions/actions.js";
import { MdDeleteForever } from "react-icons/md";
import "./CategoryCard.css";
export default function EditProduct() {
  const [state, dispatch] = useStore();
  let { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
  });
  const [error, setError] = useState('');

  function validate(value) {
    var expression = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    if (!expression.test(value)) {
      setError("Name is nessesary");
    } else if (value === "") {
      setError('')
    }
  }


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
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setError('')
    const { name } = e.target;
    if (name === 'name') {
      validate(product.name)
    }

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

          type="text"
          name="name"
          placeholder={product.name}
          value={product.name}
          onChange={handleChange}

        />
        {!error ? null : <div className="error" >{error}</div>}
        <div className="btn-addCat">
          <input type="submit" name="Update info" disabled={error} className="input-submit" />
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
