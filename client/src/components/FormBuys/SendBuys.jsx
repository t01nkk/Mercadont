import React, {useState, useEffect} from 'react'
import {Elements, CardElement,useStripe,useElements} from "@stripe/react-stripe-js"
import axios from "axios"
import { totalPrice } from '../Cart/actionsCart'
import { ListProductsBuys } from "../ListProductsBuys/ListProductsBuys.jsx"


export const SendBuys = ()=>{
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        let local = JSON.parse(localStorage.getItem("myCart"))
        let priceTotal = JSON.parse(localStorage.getItem("myPrice"))
        // console.log(local, priceTotal)
        console.log(local)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)
            })

        if(!error){
            // console.log(paymentMethod)
            const {id} = paymentMethod
            await axios.post("http://localhost:3001/product/buys",{
                id,
                amount: priceTotal * 100,
                local,
            }) 
            
        }
        localStorage.removeItem("myCart")
    }

    const [products, setProducts] = useState("")   
    const [price, setPrice] = useState("")   
    
    useEffect(()=>{
        let local = JSON.parse(localStorage.getItem("myCart"))
        let priceTotal = JSON.parse(localStorage.getItem("myPrice"))

        setProducts(local)
        setPrice(priceTotal)
    },[])

    const mostra = () => {
        console.log(products,price);
      };

    return (<form onSubmit={handleSubmit}>
      <div>
         <h2>Product list:</h2>
         <div>
         {products && products.map((el, index)=>
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
     <CardElement className='cardElement'/>
    <button onClick={() => mostra()}>mostra storage</button>
    <button>Compra</button>
    </form>
    )
}
