import axios from 'axios'
import React, { useState }from 'react'
import { useHistory } from 'react-router-dom'
import { alertInfo } from '../../../helpers/toast'
import { useTranslation } from 'react-i18next'
import { alertSuccess } from '../../../helpers/toast'
import "./QaSIndividual.css"

export const QaSIndividual = ({ id, idProduct, createdAt, name, userId, question, answer, image }) => {
  const [textArea, setTextArea] = useState("")
  const [changeQaS, setChangeQaS] = useState(false)
  const history = useHistory()

  const { t } = useTranslation()

  const sendQaS = async()=>{
    try {
      if(!textArea){alertInfo(t("adminQaS.fillThisSpace"))}
      let sendAnswerAdmin = await axios.put(`${process.env.REACT_APP_DOMAIN}/admin/${id}/answer`,{
        answer:textArea,
        idProduct
      })
      if (sendAnswerAdmin) {
        alertSuccess(t("adminQaS.answerAdded"))
        setTimeout(() => {
          window.location.reload()
        }, 2000);
        
        // Redirect("/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/QaS")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setTextArea(e.target.value)
  }

  const viewProduct = () => {
    history.push(`/admin/edit/${idProduct}`)
  }

  return (
    <div>
        <button onClick={()=>viewProduct()}>{t("adminQaS.view") }</button>
        <div>
            <p>{t("adminQaS.product") }{name}</p>
            <p>{t("adminQaS.questionDate") }{createdAt}</p>
        </div>
        <p>{t("adminQaS.question") }{question}</p>
      {answer ? <p>{t("adminQaS.answer")}{answer}</p>: <p>{t("adminQaS.lackingAnswer") }</p>}      
        {answer?<button onClick={()=>setChangeQaS(true)}>{t("adminQaS.edit") }</button>:<button onClick={()=>setChangeQaS(true)}>{t("adminQaS.answerQuestion") }</button>}
        
        {changeQaS?<div>
          <button onClick={()=>setChangeQaS(false)}>X</button>
          <textarea name="" id="" cols="20" rows="5" value={textArea} required onChange={handleChange}></textarea>
        <button onClick={()=>sendQaS()}>{t("adminQaS.submit") }</button>
        </div>:null}
        
        <br />
        <br />
        <br />
    </div>
  )
}
