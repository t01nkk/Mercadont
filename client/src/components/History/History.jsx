import React,{useState,useEffect} from 'react'
import axios from "axios"

export const History = () => {
    const [history, setHistory] = useState([])

    let myUser = JSON.parse(localStorage.getItem("myUser"));

  useEffect(() => {
    if (myUser) {
      getHistory()
    }
  }, []);

  const getHistory = async()=>{
    let arrayHistory = await axios(`http://localhost:3001/user/history/${myUser}`)
    //  let nuevoArray = arrayHistory.data.filter((val, i)=>{           
    //     if((arrayHistory.data.includes(val, i + 1))){
    //       if(val == val[i])             
    //        return val
    //       }
    //     })
    //     console.log(nuevoArray)

    // for(let i = 0; i < arrayHistory.data.length; i++){
    //   let arrayTemporal = arrayHistory.data[i].filter()
    // }
    
    // let groupHistory = arrayHistory.data.filter((e,index) => e)
    // setHistory(arrayHistory)
    // console.log(arrayHistory)
  }

  return (
      <div>
        {history.length && <div>History</div>}
      </div>
  )
}
