import React,{useState,useEffect} from 'react'
import axios from "axios"

export const History = () => {
    const [history, setHistory] = useState([])
  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    if (myUser) {
      getHistory()
    }
  }, []);

  const getHistory = async()=>{
    let arrayHistory = await axios(`http://localhost:3001/user/history/:${myUser}`)
    setHistory(arrayHistory)
    console.log(arrayHistory)
  }

  return (
      <div>
        {history.length && <div>History</div>}
      </div>
  )
}
