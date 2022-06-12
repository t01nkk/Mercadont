import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { ItemBuy } from './ItemBuy.jsx'
import { DetailsBuys } from './DetailsBuys.jsx'

export const Buys = () => {

    const [stateBuys, setStateBuys] = useState("pending")
    const [dataBuys, setDataBuys] = useState("")
    const [detailsProduct, setDetailsProduct] = useState([])
    const [changeSection, setChangeSection] = useState(true)

//ESTADO DE LA COMPRA
//"pending", "accepted", "rejected"
    useEffect(()=>{
        getDataBuys()
    }, [stateBuys])


    let getDataBuys = async()=>{
        try {
            let buys = await axios(`${process.env.REACT_APP_DOMAIN}/admin/filterOrders/${stateBuys}`)
            console.log(buys)
            setDataBuys(buys.data)
        } catch (error) {
            console.log(error)
        }
    }

    let changeStateBuys = async (changeState)=>{
        try {
            let resp = await axios.put(`${process.env.REACT_APP_DOMAIN}/admin/setOrderStatus`,{
                orderStatus:changeState,
                orderId:dataBuys.orderNumber
            })
            // if(resp){
            //     window.location.reload()
            // }
        } catch (error) {
            console.log(console.log(error))
        }
    }

  return (
    <div>
        {changeSection ?
        <div>
            <div>
                <button onClick={()=>setStateBuys("pending")}>Pendientes</button>
                <button onClick={()=>setStateBuys("accepted")}>Aceptadas</button>
                <button onClick={()=>setStateBuys("rejected")}>Rechazadas</button>
            </div>
            <div>
                {dataBuys.length > 0 && dataBuys.map(e=> (
                    <ItemBuy
                    key={e.orderNumber}
                    amount={e.amount}
                    date={e.date}
                    count={e.products}
                    setChangeSection={setChangeSection}
                    setDetailsProduct={setDetailsProduct}
                    />
                ))}
            </div>
        </div>
            :
            <div>
                <div>
                    {detailsProduct.length && detailsProduct.map(e=>(
                        <DetailsBuys
                            // amount={history[index].amount}
                            key={e.id}
                            name={e.name}
                            id={e.id}
                            image={e.image}
                            price={e.price}
                        />
                    ))}
                    <>
                        <button onClick={()=>{changeStateBuys("accepted")}}>Aceptar pedido</button>
                        <button onClick={()=>{changeStateBuys("rejected")}}>Rechazaar pedido</button>
                    </>
                </div>
            </div>

    }
    </div>
  )
}
