import React, { useState, useEffect } from "react";
import { useStore } from "../../context/store.js";
import { ArticleFavorites } from './ArticleFavorites';
import { getFavorites } from '../../redux/actions/actions';
import { handleDeleteFavorite } from '../Cart/actionsCart.js';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
// import "./Favorite.css"

export const Favorites = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useStore();
  const [favorites, setFavorites] = useState([])
  const history = useHistory()    

  let id = JSON.parse(localStorage.getItem("myUser"));
  useEffect(() => {
    let loadFavorite = async () => {
      await getFavorites(dispatch, id);
    };
    loadFavorite();
    setFavorites(state.favorites);
  }, [state.favorites.length]);

  const removeFavorite = (id) => {
    let newArrayFavorites = favorites.filter((e) => e.id !== id);
    setFavorites(newArrayFavorites);
    handleDeleteFavorite(id);
  };

    const handleBack = async (e) =>{
      e.preventDefault();
      history.push("/home");
    }


  return (
    <div>
      <h3>{t("favorites.favorites")}</h3>
      <div className="container container-all-favorites">
        {favorites.length !== 0 &&
          favorites.map((e) => (
            <ArticleFavorites
              key={e.id}
              id={e.id}
              name={e.name}
              price={e.price}
              rating={e.rating}
              image={e.image}
              removeFavorite={removeFavorite}
            />
          ))}
      </div>
      <button onClick={(e) => handleBack(e)}>Go back to the main page</button>
  </div>
  )
}
