import React, { useState, useEffect } from 'react'
import axios from "axios";

export const Favorites = () => {

    const [favorites, setFavorites] = useState([])

    let id = JSON.parse(localStorage.getItem("myUser"))
    useEffect(() => {
        const getFavorites = async () => {
            const giveMeFavorites = await axios(`${process.env.REACT_APP_DOMAIN}/user/favorite/${id}`)
            try {
                // console.log(addfavorites)
                setFavorites(giveMeFavorites.data)
            } catch (error) {
                console.log(error)
            }
        }

        getFavorites()
    }, [])
    return (
        <div>
            <p>favorite</p>
            {favorites.length && favorites.map(e => console.log(e))}
        </div>
    )
}