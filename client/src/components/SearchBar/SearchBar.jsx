import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import icon from "../../media/search.png";
import axios from "axios";
import { SEARCH_PRODUCT } from "../../redux/actions/actionTypes";
import { Redirect } from "react-router-dom";
import { useStore } from "../../context/store";
export default function SearchBar() {
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useStore();
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(
        `http://localhost:3001/product/search?name=${input}`
      );
      dispatch({
        type: SEARCH_PRODUCT,
        payload: res.data,
      });
      setInput("");
      setRedirect(true);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    setRedirect(false);
  }, []);
  return (
    <div>
      {redirect ? <Redirect push to="/search" /> : null}
      <form
        role="search"
        className="searchBar-container"
        onSubmit={handleSearch}
      >
        <input
          id="search"
          type="text"
          value={input}
          placeholder="Search..."
          autoFocus
          required
          onChange={handleChange}
        />
        <button type="submit">
          <img src={icon} alt="" />
        </button>
      </form>
    </div>
  );
}
