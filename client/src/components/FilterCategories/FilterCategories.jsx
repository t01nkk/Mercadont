import React, { useEffect, useState } from "react";
import { useStore } from "../../context/store";
import { Redirect } from "react-router-dom";
import { CATEGORIES_PRODUCT } from "../../redux/actions/actionTypes";
import { fetchProducts } from "../../redux/actions/actions.js";
import axios from "axios";

export default function FilerCategories() {
    const [state, dispatch] = useStore();
    const [redirect, setRedirect] = useState(false);
    const [filter, setFilter] = useState({
        categories: [],
    });
console.log(filter)
    const handleSearch = async (e) => {
        e.preventDefault()
        const{categories}=filter
        try {
            console.log("Hola entre ")
            const res = await axios.post(
                `http://localhost:3001/product/filter`,{categories}
            );
            console.log("Hola",res.data)
            dispatch({
                type: CATEGORIES_PRODUCT,
                payload: res.data,
            });
            setRedirect(true);
        } catch (err) {
            alert(err);
        }
    };
    useEffect(() => {
        setRedirect(false);
    }, []);

    function handleSelect(e) {
        setFilter({
            ...filter,
            categories: deleted(filter.categories, e.target.value),
        });
    }

    function deleted(array, sel) {
        if (array.includes(sel)) {
            const array1 = array.filter((num) => num !== sel);
            return array1;
        } else {
            const array2 = array.concat(sel);
            return array2;
        }
        
    }
    return (
        <div>
            {redirect ? <Redirect push to="/categories" /> : null}

            <form
                onSubmit={(e) => {
                    handleSearch(e);
                }}
            >
                <div className="form-checkbox-container">

                    <div className="from-checkbox-grid">
                        {state.categories.map((categories) => (
                            <div className="from-checkbox">
                                <div className="from-checkbox-input">
                                    <input
                                        value={categories.name}
                                        type="checkbox"
                                        onChange={(e) => {
                                            handleSelect(e);
                                        }}
                                    />
                                    {categories.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                   
                >
                    buscar
                </button>
            </form>


        </div>
    );
}
