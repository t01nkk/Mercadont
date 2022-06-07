import React, {useState,useEffect} from 'react'
import { useStore } from "../../context/store.js";
import { ArticleFavorites } from './ArticleFavorites';
import { getFavorites } from '../../redux/actions/actions';
import { useTranslation } from 'react-i18next';
// import "./Favorite.css"


export const Favorites = () => {
  const { t } = useTranslation()  
  const [state, dispatch] = useStore();
    const [favorites, setFavorites] = useState([])

    let id = JSON.parse(localStorage.getItem("myUser"))
    useEffect(()=>{
        getFavorites(dispatch,id)
    },[])
  return (


    <div>
      <h3>{ t("favorites.favorites")}</h3>
      <div className='container container-all-favorites'>

        {/* <div className='card float-left'> */}
          {/* <div className='row'> */}
              {state.favorites.length !==0 && state.favorites.map(e =>
                <ArticleFavorites 
                key={e.id}
                id={e.id}
                name={e.name}
                price={e.price}
                rating={e.rating}
                image={e.image}
                />
                )}
            {/* </div> */}
         {/* </div> */}
      </div>
  </div>
  )
}