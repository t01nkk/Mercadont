import React, { useState, useEffect } from 'react'
import "./History.css"
import axios from 'axios'

export const DateHistory = ({ amount, date, count, setChangeSection, setDetailsProduct }) => {
    // console.log(count)
    const [cant, setcant] = useState(0)
    const [idProduct, setIdProduct] = useState([])
    let total = 0
    useEffect(() => {
        sumarCount()
        // console.log(count)
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
                console.log(foundProducts)
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
            </div>
            <br />
        </div>
    )
}
