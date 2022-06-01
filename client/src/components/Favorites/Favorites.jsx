import React, {useState,useEffect} from 'react'
import axios from "axios";

export const Favorites = () => {

    const [favorites, setFavorites] = useState([])

    let id = JSON.parse(localStorage.getItem("myUser"))
    useEffect(()=>{
        const getFavorites = async ()=>{
            const giveMeFavorites = await axios(`http://localhost:3001/user/favorite/${id}`)
            try {
                // console.log(addfavorites)
                setFavorites(giveMeFavorites.data)
            } catch (error) {
                console.log(error)
            } 
        }
        
        getFavorites()
    },[])
  return (
    <div>
        <p>favorite</p>
        {favorites.length && favorites.map(e => console.log(e))}
    </div>
  )
}