import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ name, id }) {
  return (
    <div>
      <article>
        <div className="cardsContainer">
          <span>{name}</span>
          <Link
            to={`/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/editCategories/${id}`}
          >
            <div className="actions">
              <button className="button">
                <FaRegEdit />
              </button>
            </div>
          </Link>
        </div>
      </article>
    </div>
  );
}
