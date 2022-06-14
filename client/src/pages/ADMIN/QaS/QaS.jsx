import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { QaSIndividual } from './QaSIndividual'

export const QaS = () => {
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
            <h2>Preguntas</h2>
            <div>
                <button onClick={() => setStateQas(false)} disabled={!stateQas}> View pendientes</button>
                <button onClick={() => setStateQas(true)} disabled={stateQas}> View Contestadas</button>
            </div>
            <div className="cardContainer">
                {dataQaS?.length ?
                    React.Children.toArray(dataQaS.map(e =>
                        <QaSIndividual
                            id={e.id}
                            image={e.products[0].image}
                            createdAt={e.createdAt}
                            name={e.products[0].name}
                            idProduct={e.products[0].id}
                            userId={e.users[0].id}
                            question={e.question}
                            answer={e.answer}
                        />
                    )
                    ) : <h5>No hay consultas pendientes</h5>
                }
            </div>
        </div>
    )
}
