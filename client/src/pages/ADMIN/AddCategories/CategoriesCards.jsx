import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard.jsx";
import { useStore } from "../../../context/store.js";
import { fetchCategories } from "../../../redux/actions/actions.js";
import { MdOutlineAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";

export default function CategoriesCards() {
  const [state, dispatch] = useStore();

  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  return (
    <div className="cardsContainer">
      <div className="add-button-div">
        <Link to={`/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/createCategory`}>
          <button className="create add-button">
            <MdOutlineAddCircle size={32} />
          </button>
        </Link>
      </div>
      {state.categories &&
        React.Children.toArray(
          state.categories.map((product) => {
            return <CategoryCard id={product.id} name={product.name} />;
          })
        )}
    </div>
  );
}
