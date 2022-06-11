import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { QaSIndividual } from './QaSIndividual'

export const QaS = () => {
    const [stateQas, setStateQas] = useState(false)
    const [dataQaS, setDataQaS] = useState("")

    useEffect(()=>{
        getStateQaS()
    },[stateQas])

    let getStateQaS = async ()=>{
        try {
            let qas = await axios(`${process.env.REACT_APP_DOMAIN}/admin/all/${stateQas}`)
            setDataQaS(qas.data)
            console.log(qas)
            
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div>
        <div>
            <button onClick={()=>setStateQas(true)}>todas</button>
            <button onClick={()=>setStateQas(false)}>pendientes</button>
        </div>
        <div>
           {dataQaS.length && dataQaS.map(e=>
                <QaSIndividual
                    key={e.createdAt + Math.random()}
                    createdAt={e.createdAt}
                    name={e.products[0].name}
                    userId={e.users[0].id}
                    question={e.question}
                    answer={e.answer}
                />
            )}
        </div>
    </div>
  )
}
