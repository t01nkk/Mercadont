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
        setError('you can use letters spaces and accents');
    } else if (value === "") {
        setError('')
    }
}
  const handleChange = (e) => {
    setError('')   
    const {  name } = e.target;    
    if (name === "search") {
        validate(input)
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
    <div className="search-gral">
      {redirect ? <Redirect push to="/search" /> : null}
      <form
        role="search"
        className="searchBar-container"
        onSubmit={handleSearch}
      >
        <input
          id="search"
          type="text"
          name="search"
          value={input}
          placeholder="Search..."
          autoFocus
          required
          onChange={handleChange}
        />
       {/*  {!error ? null : alert(error)} */}
        <button type="submit" disabled={error} className="searchBar-container-button">
          <img src={icon} alt="" />
        </button>
      </form>
    </div>
  );
}
