import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
export const ItemBuy = ({ amount, date, count, setChangeSection, setDetailsProduct, orderId }) => {
    date = date.slice(0, 10)
    const [cant, setCant] = useState(0)
    const [idProduct, setIdProduct] = useState([])
    const history = useHistory()
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
        setCant(total)
    }

    const getDetailsBuys = async () => {
        try {
            const foundProducts = await axios.post(`${process.env.REACT_APP_DOMAIN}/user/product/history`,
                {
                    order: idProduct
                })
            history.push(`/admin/Buys?${orderId}`)
            await setDetailsProduct(foundProducts.data)
            await setChangeSection(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container-data-history' onClick={getDetailsBuys}>
            <p>Date of Purchase: <span>{date}</span></p>
            <div>
                <p>Quantity of Product: <span>{cant !== 0 && cant}</span></p>
                <p>Total: <span>{amount}</span></p>
            </div>
            <br />
        </div>
    )

}
