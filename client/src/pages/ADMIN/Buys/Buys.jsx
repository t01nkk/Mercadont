import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ItemBuy } from './ItemBuy.jsx'
import { DetailsBuys } from './DetailsBuys.jsx'
import { useHistory, useLocation } from "react-router-dom";

export const Buys = () => {

    const [stateBuys, setStateBuys] = useState("pending")
    const [dataBuys, setDataBuys] = useState("")
    const [detailsProduct, setDetailsProduct] = useState([])
    const [changeSection, setChangeSection] = useState(true)
    const [quantity, setQuantity] = useState([])
    const [cant, setCant] = useState(0)
    const history = useHistory()
    let { search } = useLocation()

    //ESTADO DE LA COMPRA
    //"pending", "accepted", "rejected"
    useEffect(() => {
        getDataBuys()
    }, [stateBuys])


    let getDataBuys = async () => {
        try {
            let buys = await axios(`${process.env.REACT_APP_DOMAIN}/admin/filterOrders/${stateBuys}`)
            console.log(buys.data)
            setDataBuys(buys.data)
        } catch (error) {
            console.log(error)
        }
    }

    const back = ()=>{
        setChangeSection(true)
        history.push("/admin/Buys")
    }

    let changeStateBuys = async (changeState) => {
        try {
            console.log(dataBuys)
            console.log(dataBuys[0].orderNumber)
            let resp = await axios.put(`${process.env.REACT_APP_DOMAIN}/admin/setOrderStatus`, {
                orderStatus: changeState,
                orderId: search.substring(1)
            })
            if (resp) {
                history.push(`/admin/Buys`)
                window.location.reload()
            }
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {changeSection ?
                <div>
                    <div>
                        <button onClick={() => setStateBuys("pending")}>Pendientes</button>
                        <button onClick={() => setStateBuys("accepted")}>Aceptadas</button>
                        <button onClick={() => setStateBuys("rejected")}>Rechazadas</button>
                    </div>
                    <div>
                        {dataBuys.length > 0 && dataBuys.map(e => (
                            <ItemBuy
                                key={e.orderNumber}
                                orderId={e.orderNumber}
                                amount={e.amount}
                                date={e.date}
                                email={e.user.email}
                                count={e.products}
                                deliveryAddress={e.deliveryAddress}
                                setCant={setCant}
                                setChangeSection={setChangeSection}
                                setQuantity={setQuantity}
                                setDetailsProduct={setDetailsProduct}
                            />
                        ))}
                    </div>
                </div>
                :
                <div>
                    <div>
                         <button onClick={()=>back()}>Back</button>
                        {detailsProduct.length && detailsProduct.map((e,i) => (
                            <DetailsBuys
                                // amount={history[index].amount}
                                amountProduct={quantity[i]}
                                key={e.id}
                                name={e.name}
                                id={e.id}
                                image={e.image}
                                price={e.price}
                            />
                        ))}
                        <>{dataBuys[0].orderStatus === "pending" &&
                             <div>
                                <button onClick={() => { changeStateBuys("accepted") }}>Aceptar pedido</button>
                                <button onClick={() => { changeStateBuys("rejected") }}>Rechazaar pedido</button> 
                            </div>}
                        </>
                    </div>
                </div>

            }
        </div>
    )
}
