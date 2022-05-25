import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const Cart = () => {

  let yourStorage = JSON.parse(localStorage.getItem("myCart"))
  const [storageCart, setStorageCart] = useState(yourStorage)
  const [count, setCount] = useState(1)
  const history = useHistory()
  const [permitLess, setPermitLess] = useState(false)
  const [permitMore, setPermitMore] = useState(true)


  //FUNCION PARA VER EL STORAGE, NO BORRAR
  const mostra = ()=>{
    let miStorage = window.localStorage;
    console.log(storageCart)
  }


  const deleteDatatoStorage = (name) =>{
    let newLocalStorage = yourStorage.filter(e => e.name !== name)
    // console.log(newLocalStorage)
    setStorageCart(newLocalStorage)
    localStorage.setItem("myCart", JSON.stringify(newLocalStorage))
    // setStorageCart(yourStorage)
  }

  //Funcion para ver detalle del producto por id
  const viewProduct = (id)=>{
    history.push(`/home/${id}`)
  }

  //Funcion para sumar un producto al carrito
  const oneMore = (stock, name)=>{
    console.log(storageCart)
    setCount(count+1)
    if(count >= 1) setPermitLess(true)
    if(count === stock -1) setPermitMore(false)
    changeAmount(count,name)
  }
  
  //Funcion para restar producto al carro
  const oneLess = (stock, name)=>{
    console.log(count)
    setCount(count-1)
    if(count <= 2) setPermitLess(false)
    if(count <= stock) setPermitMore(true)
  }
  
  
  let changeAmount = (num, name)=>{
    let articleStogare = yourStorage.find(e => e.name === name)
    articleStogare.amount = num
    setStorageCart(yourStorage)
    localStorage.setItem("myCart", JSON.stringify(yourStorage))
    console.log(articleStogare)
    
    // let index = yourStorage.filter(e => e.name === name)
  }


  //Funcion para limpiar carro
  const clearCart = ()=>{
    localStorage.clear()
    setStorageCart([])
  }
  return (
    <div>
      <button onClick={()=>mostra()}>mostra storage</button>
      <button onClick={()=>clearCart()}>Clear Cart</button>
      <section>
        <h2>Welcome your Cart</h2>
        <div>
            <h3>Tabla de datos</h3>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {storageCart && storageCart.length > 0
                        ?(storageCart.map(el=><tr key={el.id}>
                                                <td>
                                                    {/* <button onClick={()=>setDataToEdit(el)}>Editar</button> */}
                                                    {permitMore && <button onClick={()=>oneMore(el.stock, el.name)}>+</button>}
                                                    
                                                    {permitLess && <button onClick={()=>oneLess(el.stock, el.name)}>-</button>}
                                                    <span>{count}</span>
                                                 
                                                    <button onClick={()=>deleteDatatoStorage(el.name)}>Eliminar</button>
                                                    <button onClick={()=>viewProduct(el.id)}>Ver</button>
                                                  
                                                </td>
                                                <td><img src={el.image} alt={el.name}/></td>
                                                <td>{el.name}</td>
                                                <td>{el.price}</td>
                                              </tr>
                                              
                             ))
                        :<tr><td colSpan="3"> Sin datos</td></tr>  
                    }
                </tbody>
            </table>
        </div>
      </section>
    </div>
    
  )
}
