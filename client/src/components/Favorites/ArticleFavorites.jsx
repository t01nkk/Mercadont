import React from 'react'
import { useHistory } from 'react-router-dom'
import "./Favorite.css"
export const ArticleFavorites = ({id,name,price,rating,image,removeFavorite}) => {
    const history = useHistory()

    const viewProduct = (id) => {
        history.push(`/home/${id}`);
      };
      const articleStyle = {
        height: "18rem"
      }
      const divPStyle = {
        height: "11rem"
      }
  return (  
    <div className="row container-div-favorite">
      <div className="col-sm-7">
        <div className="card-block">
          <h4 className='card-title'>{name}</h4>
          <p>{price}.</p>
          <p>{rating}</p>
          <div>
          <button className="btn btn-primary btn-sm" onClick={()=> viewProduct(id)}>
            View Product
          </button>
          <button className="btn btn-primary btn-sm" onClick={()=> removeFavorite(id)}>
            Remove Favorite
          </button>
          </div>
        </div>
      </div>

      <div className="col-sm-5 container-img-favorite">
        <img className="d-block w-100 img-favorite" src={image} alt=""/>
      </div>
  </div>

  )
}
