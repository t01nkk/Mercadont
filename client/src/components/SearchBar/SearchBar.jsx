import React from "react";
import "./SearchBar.css";
import icon from "../../media/search.png";
export default function SearchBar() {
  return (
    <div>
      {/* <form className="searchBar-container">
        <input type="search" className="search-box" placeholder="Looking for something?"/>
        <button type="submit" className="search-button">
          Search
        </button>
      </form> */}

      <form onsubmit="event.preventDefault();" role="search" className="searchBar-container">
        <input
          id="search"
          type="text"
          placeholder="Search..."
          autofocus
          required
        />
        <button type="submit">
          <img src={icon} alt="" />
        </button>
      </form>
    </div>
  );
}
