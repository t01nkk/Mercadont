import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { QaSIndividual } from './QaSIndividual'
import { useTranslation } from 'react-i18next'


export const QaS = () => {
    const { t } = useTranslation()

    const [stateQas, setStateQas] = useState(false)
    const [dataQaS, setDataQaS] = useState("")

    useEffect(() => {
        getStateQaS()
    }, [stateQas])

    let getStateQaS = async () => {
        try {
            let qas = await axios(`${process.env.REACT_APP_DOMAIN}/admin/all/${stateQas}`)
            setDataQaS(qas.data)

        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div>
          {stateQas ? <h2>{t("adminQaS.solvedQuestions") }</h2>:<h2>{t("adminQaS.pendingQuestions") }</h2>}
        <h2></h2>
        <div>
            <button onClick={()=>setStateQas(true)}>{t("adminQaS.answered") }</button>
            <button onClick={()=>setStateQas(false)}>{t("adminQaS.pending") }</button>
        </div>
        <div>
           {dataQaS?.length?
            React.Children.toArray(dataQaS.map(e=>
                <QaSIndividual
                    id={e.id}
                    createdAt={e.createdAt}
                    name={e.products[0].name}
                    idProduct={e.products[0].id}
                    userId={e.users[0].id}
                    question={e.question}
                    answer={e.answer}
                />
                )
             ):<h5>{t("adminQaS.noPending") }</h5>
            }
        </div>
    </div>
  )
}
