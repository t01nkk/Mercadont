import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard.jsx";
import { useStore } from "../../../context/store.js";
import { fetchCategories } from "../../../redux/actions/actions.js";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";

export default function CategoriesCards() {
  const [state, dispatch] = useStore();

  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  return (
    <div className="cardsContainer">
      <div className="btn-createCategory">
        <Link to={`/admin/createCategory`}>
          <button className="input-submit-createCategoy">
            Crear Categorias
          </button>
        </Link>
      </div>
      <div className="container-categories-card">
        {state.categories &&
          React.Children.toArray(
            state.categories.map((product) => {
              return <CategoryCard id={product.id} name={product.name} />;
            })
          )}
      </div>
    </div>
  );
}
