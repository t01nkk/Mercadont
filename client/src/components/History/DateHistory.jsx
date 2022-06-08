import React,{useState,useEffect} from 'react'

export const DateHistory = ({amount,date,count}) => {
    // console.log(count)
    const [cant, setcant] = useState(0)
    let total = 0
    useEffect(() => {   
        sumarCount()
        // console.log(count)
    }, [count.length])
    
    const sumarCount = async ()=>{
        if(count.length){
            // let canti =+ await count.map((a) => (a.productQuantity))
            total = total + await count.map((a, b) => parseInt(a.productQuantity)
            // a.productQuantity + b.productQuantity, 0
            );
            console.log(total)
        }
    }

  return (
    <div>
        <p>{amount}</p>
        <p>{date}</p>
        <p>{cant !== 0 && cant}</p>
        <br/>
    </div>
  )
}
