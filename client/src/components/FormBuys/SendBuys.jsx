import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import { useHistory } from 'react-router-dom'
import { totalPrice } from '../Cart/actionsCart'
import { ListProductsBuys } from "../ListProductsBuys/ListProductsBuys.jsx"
import { PruebaListProduct } from '../ListProductsBuys/PruebaListProduct'
import { useTranslation } from 'react-i18next';
import accounting from 'accounting'
import {alertInfo, alertWarning} from '../../helpers/toast'
import { Loader } from "../Loader/Loader.jsx"
import "./SendBuys.css"

export const SendBuys = () => {
    const { t } = useTranslation()
    const stripe = useStripe()
    const elements = useElements()
    const [address, setAdress] = useState({
        country:"",
        province:"",
        city:"",
        street:"",
        postalCode:""
    })

    let user = JSON.parse(localStorage.getItem("myUser"))
    let local = JSON.parse(localStorage.getItem(user));
    let priceTotal = JSON.parse(localStorage.getItem("myPrice"))
    const [redirect, setRedirect] = useState("")
    const [selectBuys, setSelectBuys] = useState("")
    const [amountTotal, setAmounTotal] = useState("")
    const [loadingBuys, setLoadingBuys] = useState(false)
    const history = useHistory()


    useEffect(() => {
        setAmounTotal(totalPrice())
    }, [])

    const handleAdress = (e)=>{
        setAdress({
            ...address,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let el = elements.getElement(CardElement)
        console.log(el)
        if (selectBuys === "card") {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement) 
            })
            alertInfo(t("sendBuys.processingCard"))
            setLoadingBuys(true)
            if (!error) {
                const { id } = paymentMethod
                try {
                    await axios.post(`${process.env.REACT_APP_DOMAIN}/buying/card`, {
                        id,
                        amount: Math.round(priceTotal * 100),
                        local,
                        userId: user,
                        address
                    })
                } catch (error) {
                    if(error.message === 'insuficientStock'){
                        alertWarning(t("sendBuys.insuficientQuantity"))
                        setLoadingBuys(false)
                        localStorage.removeItem(user)
                        return history.push("/cart?buy=false")
                    }else{
                        alertWarning(t("sendBuys.error"))
                        setLoadingBuys(false)
                        localStorage.removeItem(user)
                        console.log(error)
                        return history.push("/cart?buy=false")
                        
                    }
                }
            }else{
                alertWarning(t("sendBuys.cardProblem"))
                setLoadingBuys(false)
                localStorage.removeItem(user)
                return history.push("/cart?buy=false")
            }
            // loadingBuys()
            if (paymentMethod) {
                setLoadingBuys(false)
                localStorage.removeItem(user)
                history.push("/cart?buy=true")
            }
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
                local,
                address
            })
            setRedirect(purchase.data)
            // localStorage.removeItem(user)
        }
    }

    const handleBack = async (e) => {
        e.preventDefault();
        history.push("/cart");
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
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-buys">
                <div>
                    <h2>{t("sendBuys.productsList")}</h2>
                    <div>
                        {React.Children.toArray(products && products.map((el) =>
                        (<ListProductsBuys
                            name={el.name}
                            price={el.price}
                            totalPrice={el.totalPrice}
                            image={el.image}
                            amount={el.quantity}
                        />)))
                        }
                    </div>
                </div>
                <div>
                    {amountTotal && <p>{t("sendBuys.totalprice")}{`${accounting.formatMoney(amountTotal, "U$D ", 0)}`}</p>}
                    <p>{t("sendBuys.paymentMethod")}</p>
                    <button id="card" onClick={e => handelClik(e)}>{t("sendBuys.card")}</button>
                    <button id="paypal" onClick={e => handelClik(e)} type='submit'>{t("sendBuys.paypal")}</button>
                </div>
                <form>
                    <input type="text" name='country' value={address.country} onChange={handleAdress}/>
                    <input type="text" name='province' value={address.province} onChange={handleAdress}/>
                    <input type="text" name='city' value={address.city} onChange={handleAdress}/>
                    <input type="text" name='street' value={address.street} onChange={handleAdress}/>
                    <input type="text" name='postalCode' value={address.postalCode} onChange={handleAdress}/>
                </form>
                {
                    <div>
                        {selectBuys === "card" ?
                            <>
                                <CardElement className='cardElement' />
                                <button type='submit'>{t("sendBuys.cardPay")}</button>
                                {loadingBuys && <div className='buys-loader'><Loader/></div>}
                                <PruebaListProduct/>
                            </>
                            : null}
                    </div>
                }
                {selectBuys === "paypal" ?
                    <button type='submit'>
                        {redirect ?
                            <a href={redirect}>{t("sendBuys.paypalConfirm")}</a>
                            : <p>{t("sendBuys.paypalProcessing")}</p>
                        }
                    </button>
                    : null}
            </form>
            <button onClick={(e) => handleBack(e)}>{t("navigation.returnToCart")}</button>
        </div>

    )
}
