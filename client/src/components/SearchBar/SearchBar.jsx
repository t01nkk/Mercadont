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

  function validate(value) {
    var expression = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    if (!expression.test(value)) {
      setError("you can use letters spaces and accents");
    } else if (value === "") {
      setError("");
    }
  }
  const handleChange = (e) => {
    setError("");
    const { name } = e.target;
    if (name === "search") {
      validate(input);
    }
    setInput(e.target.value);
  };
  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/product/search?name=${input}`
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
    <>
      {redirect ? <Redirect push to="/search" /> : null}
      <form role="search" className="d-flex" onSubmit={handleSearch}>
        <input
          id="search"
          name="search"
          value={input}
          className="form-control search-bar "
          type="search"
          placeholder="Search"
          aria-label="Search"
          required
          onChange={handleChange}
        />
      </form>
    </>
  );
}
