import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCardSlide from "../ProductCardSlide/ProductCardSlide.jsx";
import { useStore } from "../../context/store.js";
import {
    fetchCategories,
    getFavorites,
    totalCount,
    fetchRating,
    fetchProducts,
} from "../../redux/actions/actions.js";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { Loader } from "../Loader/Loader.jsx"
import { handleDeleteFavorite, handleSaveFavorite } from "../Cart/actionsCart.js";
import { useHistory } from "react-router-dom";
import { alertInfo, alertSuccess, alertWarning } from '../../helpers/toast'
import { Autoplay, Navigation, Pagination } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import "../SlideMostSold/SlideMostSold.scss"

export default function Slide() {
    const { t, i18n } = useTranslation()
    const [user, setUser] = useState([]);
    const [sold, setSold] = useState([])
    const [state, dispatch] = useStore();
    const [cart, setCart] = useState([]);
    const [inCart, setInCart] = useState(false);
    const history = useHistory();
    let person = JSON.parse(localStorage.getItem("myUser"));
    
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const fetchSold = async () => {
        if(state.products.length){
            try {
                // console.log("state.products-FETCH:", state.products)
                // console.log("state.products.length-FETCH:", state.products.length)
                let recommended = [];
                let miStorage = JSON.parse(localStorage.getItem("myUser"));
                if(miStorage){
                    const recommendedProducts = await axios.get(
                        `${process.env.REACT_APP_DOMAIN}/product/recommendation/byHistory/${miStorage}`
                    );
                    recommended = recommendedProducts.data
                    // console.log("recommendedProducts.data:", recommendedProducts.data)
                }   
                if(recommended.length>12){
                    recommended = recommended.slice(0,12)
                }
                for(let i= 0 ; i < 12; i++){
                    let index = getRandomInt(0,state.products.length -1)

                    // console.log("index:", index)
                    if(!recommended.includes(state.products[index])){
                        
             /*            console.log("state.products[index]:", state.products[index]) */
                        recommended.push(state.products[index])
                    }
                }
                if(recommended.length>12){
                    recommended = recommended.slice(0,12)
                }
                // console.log("hola recommended",recommended)
                setSold(recommended);
            } catch (err) {
                return err;
            }
        }
    };

    const handleSaveCart = (name, price, image, id, stock) => {
        let quantity = 1;
        let totalPrice = price;
        // let price = accounting.formatMoney(price, "U$D ", 0)
        let products = { name, price, image, id, stock, quantity, totalPrice };
        let value = cart.find((e) => e.name === name);

        let person = JSON.parse(localStorage.getItem("myUser"));
        if (!person) {
            alertWarning(t("home.logInProducts"))
            setTimeout(() => {
                history.push("/logIn");
            }, 2000);
        }
        else if (value) {
            setInCart(false);
            alertInfo(t("home.altAlreadyInCart"));
        } else {
            setInCart(true);
            setCart((cart) => [...cart, products]);
            alertSuccess(t("home.altAddToCart"));
        }
    };

    useEffect(() => {
        
        let myUser = JSON.parse(localStorage.getItem("myUser"));
        let myCart = JSON.parse(localStorage.getItem(myUser));
        // fetchProducts(dispatch)
        // fetchCategories(dispatch);
        getFavorites(dispatch, person);
        setUser(myUser);
        if (myCart) {
            setCart(myCart);
        } else {
            setCart([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(user, JSON.stringify(cart));
        totalCount(dispatch)
    }, [cart]);

    useEffect(() => {
        fetchSold();
    }, [state.products]);

    // const mostra = () => {
    //   let miStorage = JSON.parse(localStorage.getItem("myUser"));
    //   console.log(miStorage);
    // };
    //console.log("Hola sold",sold)
    return (
        <div className="div-slide">

            <Swiper

                spaceBetween={0}
                loop={true}
                modules={[Navigation, Pagination]}
                navigation={true}

                breakpoints={{
                    500: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },

                    640: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                }}
                pagination={{
                    clickable: true
                }}
                className="mySwiper"
            >

                <section className="section-products ">
                    {/* <button onClick={() => mostra()}>mostra storage</button> */}

                    {sold && state.favorites
                        ? React.Children.toArray(
                            sold.map((product) => {
                                if (product.status === "active") {
                                    return (
                                        <SwiperSlide >
                                            <ProductCardSlide
                                                id={product.id}
                                                name={product.name}
                                                stock={product.stock}
                                                price={product.price}
                                                image={product.image}
                                                handleSaveCart={handleSaveCart}
                                                handleSaveFavorite={handleSaveFavorite}
                                                handleDeleteFavorite={handleDeleteFavorite}
                                                isAdd={state.favorites.find((e) => e.id === product.id)}
                                                alertSuccess={alertSuccess}
                                            /></SwiperSlide>

                                    );
                                }
                                return null;
                            })
                        )
                        : <div className="container-loader"><Loader /></div>}
                </section></Swiper>

        </div>
    )
}