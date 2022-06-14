import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import "./History.css"
import axios from 'axios'

export const DateHistory = ({ amount, date, count, setChangeSection, setDetailsProduct, orderStatus, orderNumber, setIsReview, review, setIsOrder }) => {

    const history = useHistory()
    //pm_1LAFPdL7xpNkb3eJ9QXGOVtC
    date = date.slice(0, 10)
    const [cant, setcant] = useState(0)
    const [idProduct, setIdProduct] = useState([])
    let total = 0
    useEffect(() => {
        sumarCount()
    }, [count.length])

    const sumarCount = async () => {
        if (count.length) {
            let newArray = []
            count.forEach(e => {
                total += e.productQuantity
                newArray.push(e.product)
            });
            setIdProduct(newArray)
        }
        setcant(total)
    }

    const getDetailsHistory = async () => {
        try {
            const foundProducts = await axios.post(`${process.env.REACT_APP_DOMAIN}/user/product/history`,
                {
                    order: idProduct
                })
            setIsReview(review)
            setIsOrder(orderStatus)
            history.push(`/history?${orderNumber}`)
            await setDetailsProduct(foundProducts.data)
            await setChangeSection(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container-data-history' onClick={getDetailsHistory}>
            <p>Date of Purchase: <span>{date}</span></p>
            <div>
                <p>Quantity of Product: <span>{cant !== 0 && cant}</span></p>
                <p>Total: <span>{amount}</span></p>
                {orderStatus === "accepted" && review == false && <button onClick={getDetailsHistory}>Dejar Reviews</button>}
            </div>
            <br />
        </div>
    )
}
