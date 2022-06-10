import React,{useState,useEffect} from 'react'
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

  const getHistory = async()=>{
    let arrayHistory = await axios(`http://localhost:3001/user/history/${myUser}`)
    setHistory(arrayHistory.data)
  }


  return (
      <div>
        {changeSection?
        <div>
          <p>a</p>
          <p>a</p>
          <p>a</p>
          <p>Acomoda el NAV WEON CONCHATUMARE</p>
          <div className='container-dateHistory'>
            {history.length > 0 && history.map(e=> (
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
          <p>a</p>
          <p>a</p>
          <p>a</p>
          <p>a</p>
          {detailsProduct.length && detailsProduct.map((e,index)=>
            <DetailsBuysHistory
            date={history[index].date}
            key={e.id}
            amount={history[index].amount}
            name={e.name}
            id={e.id}
            image={e.image}
            price={e.price}
            />
          )
          }
        </div>
        }
      </div>
  )
}
