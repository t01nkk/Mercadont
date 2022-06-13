import React, { useState, useEffect } from 'react'
import axios from "axios"
import { DateHistory } from './DateHistory';
import "./History.css"
import { DetailsBuysHistory } from './DetailsBuysHistory';

export const History = () => {
  const [history, setHistory] = useState([])
  const [detailsProduct, setDetailsProduct] = useState([])
  const [changeSection, setChangeSection] = useState(true)

  let myUser = JSON.parse(localStorage.getItem("myUser"));

  useEffect(() => {
    if (myUser) {
      getHistory()
    }
  }, [history.length]);

  const getHistory = async () => {
    let arrayHistory = await axios(`${process.env.REACT_APP_DOMAIN}/user/history/${myUser}`)
    console.log("arrayHistory:", arrayHistory.data)
    setHistory(arrayHistory.data)
  }
  //pm_1LA33sL7xpNkb3eJhcFHEHnp
  //pm_1LA33sL7xpNkb3eJhcFHEHnp

  return (
    <div>
      {changeSection ?
        <div>
          <div className='container-dateHistory'>
            {history.length > 0 && history.map(e => (
              <DateHistory
                key={e.orderNumber}
                amount={e.amount}
                date={e.date}
                count={e.products}
                setChangeSection={setChangeSection}
                setDetailsProduct={setDetailsProduct}
              />
            ))
            }
          </div>
        </div>
        :
        <div>
          {console.log(history)}
          {console.log(detailsProduct)}
          {detailsProduct.length && detailsProduct.map((e, i) =>
            <DetailsBuysHistory
              // date={history[index].date}
              key={e.id}
              // amount={history[index].amount}
              orderId={history[0]?.orderNumber}
              name={e.name}
              id={e.id}
              image={e.image}
              price={e.price}
              myUser={myUser}
            />
          )
          }
        </div>
      }
      
    </div>
  )
}
