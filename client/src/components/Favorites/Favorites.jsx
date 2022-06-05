import React, {useState,useEffect} from 'react'
import { useStore } from "../../context/store.js";
import { ArticleFavorites } from './ArticleFavorites';
import { getFavorites } from '../../redux/actions/actions';
// import "./Favorite.css"

export const Favorites = () => {
    const [state, dispatch] = useStore();
    const [favorites, setFavorites] = useState([])

    let id = JSON.parse(localStorage.getItem("myUser"))
    useEffect(()=>{
        getFavorites(dispatch,id)
    },[])
  return (
    <div>
        <h3>favorite</h3>
      <div className='container container-all-favorites'>

        {/* <div className='card float-left'> */}
          {/* <div className='row'> */}
              {state.favorites.length && state.favorites.map(e =>
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