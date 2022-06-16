import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import "./CategoryCard.scss";
import axios from "axios"
import { useTranslation } from "react-i18next"
import { alertInfo } from "../../../helpers/toast"

export default function CategoryCard({ name, id }) {
const {t} = useTranslation() 
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_DOMAIN}/categories/${id}`);
      alertInfo(t("adminAddCategories.delete"));
      setTimeout(()=>{
        window.location.reload()
      },2000)
    } catch (err) {
      console.log(err);
    }
  };
  return (
      <article className="actions">
            <div>
              <button className="btn-delete-category" onClick={handleDelete}>
              <MdDeleteForever size={30} />
              </button>
            </div>
          <span>{name}</span>
      </article>
  );
}
