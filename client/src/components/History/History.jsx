import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom'
import { DateHistory } from './DateHistory';
import "./History.css"
import { DetailsBuysHistory } from './DetailsBuysHistory';

export const History = () => {
  const [history, setHistory] = useState([])
  const [detailsProduct, setDetailsProduct] = useState([])
  const [changeSection, setChangeSection] = useState(true)
  const [isReview, setIsReview] = useState(false)
  const [reviewText, setReviewText] = useState([])

  let myUser = JSON.parse(localStorage.getItem("myUser"));
  let { search } = useLocation()

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

  //AXIOS
  const sendReview = ()=>{
    console.log("myuser",myUser,"search",search.substring(1))
    console.log(reviewText)
      //id => por params
      //rating, text,userId,orderId => body
  }

  let updateDataText = (data)=>{
    if(!reviewText.length)setReviewText(reviewText.concat(data))
    else{
      let idFIndReview = reviewText.find(e=>data.id === e.id)
      if(idFIndReview){
        idFIndReview.text = data.text
      }
      else{setReviewText(reviewText.concat(data))}
    }
  }

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
                orderNumber={e.orderNumber}
                count={e.products}
                orderStatus={e.orderStatus}
                review={e.review}
                setIsReview={setIsReview}
                setChangeSection={setChangeSection}
                setDetailsProduct={setDetailsProduct}
              />
              ))
            }
          </div>
        </div>
        :
        <div>
          {detailsProduct.length && detailsProduct.map((e, i) =>
            <DetailsBuysHistory
              key={e.id}
              name={e.name}
              id={e.id}
              image={e.image}
              price={e.price}
              myUser={myUser}
              isReview={isReview}
              updateDataText={updateDataText}
            />
          )
          }
          {!isReview && 
            <div>
              <button onClick={()=>sendReview()}>Enviar review</button>
              <button>No hacer review</button>
            </div>
          }
        </div>
      }
      
    </div>
  )
}
