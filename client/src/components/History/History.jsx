import React,{useState,useEffect} from 'react'
import axios from "axios"
import { DateHistory } from './DateHistory';

export const History = () => {
    const [history, setHistory] = useState([])

    let myUser = JSON.parse(localStorage.getItem("myUser"));

  useEffect(() => {
    if (myUser) {
      getHistory()
    }
  }, [history.length]);

  const getHistory = async()=>{
    let arrayHistory = await axios(`http://localhost:3001/user/history/${myUser}`)
    setHistory(arrayHistory.data)
    // console.log(history) 
  }

  return (
      <div>
        <p>a</p>
        <p>a</p>
        <p>a</p>
        <p>Acomoda el NAV WEON CONCHATUMARE</p>
        {history.length > 0 && history.map(e=> (
          <DateHistory
            key={e.orderNumber}
            amount={e.amount}
            date={e.date}
            count={e.products}
          />
        ))
        }
      </div>
  )
}
