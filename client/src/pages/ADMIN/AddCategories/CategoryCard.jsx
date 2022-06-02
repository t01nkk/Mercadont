import React from "react";
import { FaRegEdit } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "./CategoryCard.css"


export default function CategoryCard({
  name,  
  id,
  
}) {
  return (
    <div>
      
        <article > 
           <div className="cardsContainer" >
            <span>{name}</span>
            <Link to={`/editCategories/${id}`}>
              <div className="actions"><button className="button"><FaRegEdit/></button></div>
              </Link>
          </div>
        </article>    
    </div>
  );
}
