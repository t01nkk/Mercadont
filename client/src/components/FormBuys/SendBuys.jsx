import React, { useState, useEffect } from 'react'
import {  CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import { ListProductsBuys } from "../ListProductsBuys/ListProductsBuys.jsx"
import { useTranslation } from 'react-i18next';

export const SendBuys = () => {
    const { t } = useTranslation()
    const stripe = useStripe()
    const elements = useElements()

    let user = JSON.parse(localStorage.getItem("myUser"))
    let local = JSON.parse(localStorage.getItem(user));
    let priceTotal = JSON.parse(localStorage.getItem("myPrice"))
    const [redirect, setRedirect] = useState("")
    const [selectBuys, setSelectBuys] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectBuys === "card") {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)
            })

            if (!error) {
                const { id } = paymentMethod
                await axios.post(`${process.env.REACT_APP_DOMAIN}/buying/card`, {
                    id,
                    amount: priceTotal * 100,
                    local,
                    userId: user
                })
            }
            localStorage.removeItem(user)
        }
    }

    const handelClik = async (e) => {
        e.preventDefault()
        if (e.target.id === "card") setSelectBuys("card")
        if (e.target.id === "paypal") {
            setSelectBuys("paypal")
            const purchase = await axios.post(`${process.env.REACT_APP_DOMAIN}/buying/payPal/create-order`, {
                purchase_units: [
                    //   //^ Requerido. Es... Bueno, lo que está comprando.
                    {
                        amount: {
                            currency_code: "USD", //Requerido. El código de 3 letras de la moneda en la que se cobra el pago. SIEMPRE es 3 letras. Estándar ISO-4217.
                            value: "" + priceTotal, //Requerido. Precio total. Y es una string. Ojete al piojete.
                            //Se puede poner un objeto breakdown: {} para dar más info de todo el pago y bla bla, pero no es requerido.
                        },
                        description: "Compra PayPal", //No requerido. Max: 128 caracteres.
                    }
                ],
                user,
                local
            })
            setRedirect(purchase.data)
            localStorage.removeItem(user)
        }
    }

    const [products, setProducts] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        let local = JSON.parse(localStorage.getItem(user))
        let priceTotal = JSON.parse(localStorage.getItem("myPrice"))

        setProducts(local)
        setPrice(priceTotal)
    }, [])

    const mostra = () => {
        console.log(products, price);
    };

    return (<form onSubmit={handleSubmit}>
        <div>
            <h2>{t("sendBuys.productsList") }</h2>
            <div>
                {products && products.map((el, index) =>
                (<ListProductsBuys
                    key={el.name}
                    name={el.name}
                    price={el.price}
                    totalPrice={el.totalPrice}
                    image={el.image}
                    amount={el.amount}
                />))
                }
            </div>
        </div>
        <div>
            <p>{t("sendBuys.paymentMethod") }</p>
            <button id="card" onClick={e => handelClik(e)}>{t("sendBuys.card") }</button>
            <button id="paypal" onClick={e => handelClik(e)} type='submit'>{t("sendBuys.paypal") }</button>
        </div>
        {
            <div>
                {selectBuys === "card" ?
                    <>
                        <CardElement className='cardElement' />
                        <button type='submit'>{t("sendBuys.cardPay") }</button>
                    </>
                    : null}
            </div>
        }
        {selectBuys === "paypal" ?
            <button type='submit'>
                {redirect ?
                    <a href={redirect}>{t("sendBuys.paypalConfirm") }</a>
                    : <p>{t("sendBuys.paypalProcessing") }</p>
                }
            </button>
            : null}
    </form>
    )
}
