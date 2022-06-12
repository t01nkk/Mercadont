import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import "./QaSIndividual.css"

export const QaSIndividual = ({ id, idProduct, createdAt, name, userId, question, answer, image }) => {
  const [textArea, setTextArea] = useState("")
  const [changeQaS, setChangeQaS] = useState(false)
  const history = useHistory()

  const sendQaS = async () => {
    console.log(textArea)
    try {
      if (!textArea) { alert("por favor complete el campo") }
      let sendAnswerAdmin = await axios.put(`${process.env.REACT_APP_DOMAIN}/admin/${id}/answer`, {
        answer: textArea,
        idProduct
      })
      if (sendAnswerAdmin) {
        window.location.reload()
  }
    setTextArea(e.target.value)
  }

  const viewProduct = () => {
    history.push(`/admin/edit/${idProduct}`)
  }

  return (
    <div className="product">
      <div className="productText">
        <p> <b>Product: </b>{name}</p>
        <p><b>Question Date: </b>{createdAt.slice(0,10)}</p>
        <p><b>Question: </b>{question}</p>
        {answer ? <p><b>Answer: </b>{answer}</p> : <p>Aun no respondida</p>}
      </div>
      <div className="productButtons">
        <button className="button" onClick={() => viewProduct()}>View Product</button>

        {/* <p>Answer: {answer}</p> */}

        {changeQaS ? <div className="answerButtons">
          <textarea name="" id="" cols="auto" rows="auto" value={textArea} required onChange={handleChange}></textarea>
          <button className="button" onClick={() => setChangeQaS(false)}>X</button>
          <button onClick={() => sendQaS()}>Send answer</button>
        </div> :
          answer ? <button className="button" onClick={() => setChangeQaS(true)}>Editar</button> :
            <button className="button" onClick={() => setChangeQaS(true)}>Contestar pregunta</button>
        }
      </div>
      <img className="productImage" src={image} alt="Not Found" />
    </div>
  )
}
