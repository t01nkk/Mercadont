import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStore } from "../../context/store.js";
import { fetchCategories } from "../../redux/actions/actions.js";
import { MdDeleteForever } from "react-icons/md";
import "../SellProductForm/SellProductForm.css";
import "./CategoryCard.css";
export default function EditProduct() {
  const [state, dispatch] = useStore();
  let { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
  });
  const [error, setError] = useState('');

  function validate(value) {
    const { name } = product;
      if (!/^\d+\S/.test(value) && Number(value) ) {
          setError('name category');
          setProduct({ [name]: "" })
      } else {
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
      await axios.put(`http://localhost:3001/categories/${id}`, {
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
    const {  name } = e.target;
    if (name === 'name') {
      validate(product.name)    }

  setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/categories/${id}`);
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
