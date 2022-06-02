import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchCategories } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store";
import "./CategoryCard.css";

export default function CreateCategory() {
  const [state, dispatch] = useStore();

  const [data, setData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = data;
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/categories/`, {
        name: name,
      });
      alert("Created category");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);
  return (
    <div className="loginCard">
      <h2>Post Category</h2>

      <form onSubmit={handleSubmit}>
        <div className="divInputUser">
          <input
            type="text"
            name="name"
            placeholder="Category Name ..."
            onChange={handleChange}
            required
            value={data.name}
          />
        </div>

        <div className="btn-createUser">
          <input type="submit" value="Create" className="input-submit" />
        </div>
      </form>
    </div>
  );
}
