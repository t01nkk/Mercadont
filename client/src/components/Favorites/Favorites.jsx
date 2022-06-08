import React, {useState,useEffect} from 'react'
import { useStore } from "../../context/store.js";
import { ArticleFavorites } from './ArticleFavorites';
import { getFavorites } from '../../redux/actions/actions';
import { handleDeleteFavorite } from '../Cart/actionsCart.js';
import { useTranslation } from 'react-i18next';
// import "./Favorite.css"


export const Favorites = () => {
  const { t } = useTranslation()  
  const [state, dispatch] = useStore();
    const [favorites, setFavorites] = useState([])

    let id = JSON.parse(localStorage.getItem("myUser"))
    useEffect(()=>{
      let loadFavorite = async ()=>{
        await getFavorites(dispatch,id)
      }
      loadFavorite()
      setFavorites(state.favorites)
    },[state.favorites.length])

    const removeFavorite = (id)=>{
      let newArrayFavorites = favorites.filter(e => e.id !== id)
      setFavorites(newArrayFavorites)
      handleDeleteFavorite(id)
    } 

  return (
    <div>
      <h3>{ t("favorites.favorites")}</h3>
      <div className='container container-all-favorites'>
              {favorites.length !==0 && favorites.map(e =>
                <ArticleFavorites 
                key={e.id}
                id={e.id}
                name={e.name}
                price={e.price}
                rating={e.rating}
                image={e.image}
                removeFavorite={removeFavorite}
                />
                )}
      </div>
  </div>
  )
}