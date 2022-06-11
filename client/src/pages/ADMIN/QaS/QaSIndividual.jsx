import axios from 'axios'
import React, { useState }from 'react'
import { useHistory } from 'react-router-dom'

export const QaSIndividual = ({id,idProduct,createdAt,name,userId,question,answer}) => {
  const [textArea, setTextArea] = useState("")
  const [changeQaS, setChangeQaS] = useState(false)
  const history = useHistory()

  const sendQaS = async()=>{
    console.log(textArea)
    try {
      await axios.put(`${process.env.REACT_APP_DOMAIN}/admin/${id}/answer`,{
        answer:textArea,
        idProduct
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e)=>{
    setTextArea(e.target.value)
  }

  const viewProduct = ()=>{
    history.push(`/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/admin/edit/${idProduct}`)
  }
  
  return (
    <div>
        <button onClick={()=>viewProduct()}>View Product</button>
        <div>
            <p>Product:{name}</p>
            <p>Question Date:{createdAt}</p>
        </div>
        <p>Question:{question}</p>
        {answer?<p>Answer: {answer}</p>: <p>Aun no respondida</p>}      
        {/* <p>Answer: {answer}</p> */}
        {answer?<button onClick={()=>setChangeQaS(true)}>Editar</button>:<button onClick={()=>setChangeQaS(true)}>Contestar pregunta</button>}
        
        {changeQaS?<div>
          <button onClick={()=>setChangeQaS(false)}>X</button>
          <textarea name="" id="" cols="20" rows="5" value={textArea} onChange={handleChange}></textarea>
        <button onClick={()=>sendQaS()}>Send answer</button>
        </div>:null}
        
        <br />
        <br />
        <br />
    </div>
  )
}
