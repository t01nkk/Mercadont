import React from 'react'
import { useHistory } from 'react-router-dom'
import "./Favorite.css"
import { useTranslation } from 'react-i18next'
export const ArticleFavorites = ({id,name,price,rating,image,removeFavorite}) => {
  
    const { t } = useTranslation()
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
  <div>
    <div className="row container-div-favorite">
      <div className="col-sm-7">
        <div className="card-block">
          <h4 className='card-title'>{name}</h4>
          <p>{t("articleFavorites.price")}{price}$USD</p>
          <p>{t("articleFavorites.rating")}{rating}</p>
          <button className="btn btn-primary btn-sm" onClick={()=> viewProduct(id)}>
            {t("articleFavorites.productDetails")}
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
