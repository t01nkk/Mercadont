import React,{useEffect, useState} from 'react'

export const ProductCart = ({name,stock,price,id,image,deleteDatatoStorage,viewProduct,pos,setTotalPrice}) => {
  let yourStorage = JSON.parse(localStorage.getItem("myCart"))
  const [storageCart, setStorageCart] = useState(yourStorage)
  const [permitLess, setPermitLess] = useState(false)
  const [permitMore, setPermitMore] = useState(true)
  const [count, setCount] = useState(storageCart[pos].amount)

//Funcion para sumar un producto al carrito
// useEffect(()=>{
//     setTotalPrice(price)
// },[])


const oneMore = (stock, name,pos)=>{
    setCount(count+1)
    if(count + 1 > 1) setPermitLess(true)
    if(count + 1 === stock) setPermitMore(false)
    changeAmount(count,name, 1,pos)
  }
  
  //Funcion para restar producto al carro
  const oneLess = (stock, name)=>{
      console.log(count)
      setCount(count-1)
      if(count -1 < 2) setPermitLess(false)
      if(count -1 < stock) setPermitMore(true)
      changeAmount(count,name, -1)
    }
  
  
  let changeAmount = (num, name, SoR)=>{
    let articleStogare = yourStorage.find(e => e.name === name)
    // console.log(num, "soy el num")
    articleStogare.amount = num + (SoR)
    setStorageCart(yourStorage)
    localStorage.setItem("myCart", JSON.stringify(yourStorage))
    console.log(count * price, count , price)
    setTotalPrice(price * (count + SoR))
    // console.log(storageCart[pos].amount, "soy el amount")
    // setRenderCount(yourStorage)
  }

    //FUNCION PARA VER EL STORAGE, NO BORRAR
  const mostra = ()=>{
    let miStorage = window.localStorage;
    console.log(yourStorage)
  }



  return (
    <article>
        <button onClick={()=>mostra()}>mostra storage</button>
        <div>
        {/* <button onClick={()=>setDataToEdit(el)}>Editar</button> */}
        {/* {permitMore && <button onClick={()=>oneMore(stock, name, pos)}>+</button>}*/}
        {/* <p>{price * count}</p> */}
        {count!==stock?<button onClick={()=>oneMore(stock, name, pos)}>+</button>:console.log("hola")}                        
        
        {/* {permitLess && <button onClick={()=>oneLess(stock, name)}>-</button>} */}
        {count !==1?<button onClick={()=>oneLess(stock, name)}>-</button>:console.log("chau")}
        <span>{storageCart[pos].amount}</span>

        <button onClick={()=>deleteDatatoStorage(name)}>Eliminar</button>
        <button onClick={()=>viewProduct(id)}>Ver</button>
            <picture>
                <img src={image} alt={name}/>
            </picture>
            <p>{name}</p>
            <p>{price}</p>
        </div>
    </article>
  )
}
