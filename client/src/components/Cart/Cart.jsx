import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ProductCart } from '../ProductCart/ProductCart'


export const Cart = () => {
  //Funcion para sumar un producto al carrito
  // const oneMore = (stock, name)=>{
  //   setCount(count+1)
  //   if(count >= 1) setPermitLess(true)
  //   if(count === stock -1) setPermitMore(false)
  //   changeAmount(count,name, 1)
  // }
  
  //Funcion para restar producto al carro
  // const oneLess = (stock, name)=>{
  //   console.log(count)
  //   setCount(count-1)
  //   if(count <= 2) setPermitLess(false)
  //   if(count <= stock) setPermitMore(true)
  //   changeAmount(count,name, -1)
  // }
  
  
  // let changeAmount = (num, name, SoR)=>{
  //   let articleStogare = yourStorage.find(e => e.name === name)
  //   console.log(num, "soy el num")
  //   articleStogare.amount = num + (SoR)
  //   setStorageCart(yourStorage)
  //   localStorage.setItem("myCart", JSON.stringify(yourStorage))
  //   setRenderCount(yourStorage)
  // }

  const [totalPrice, setTotalPrice] = useState(1)

  let yourStorage = JSON.parse(localStorage.getItem("myCart"))
  const [storageCart, setStorageCart] = useState(yourStorage)
  // const [count, setCount] = useState(1)
  const history = useHistory()
  // const [permitLess, setPermitLess] = useState(false)
  // const [permitMore, setPermitMore] = useState(true)

  const [renderCount, setRenderCount] = useState(0)



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


  //Funcion para limpiar carro
  const clearCart = ()=>{
    localStorage.clear()
    setStorageCart([])
    // console.log(totalPrice)
  }
  return (
    <div>
      
      <button onClick={()=>clearCart()}>Clear Cart</button>
      <section>

        <h2>Welcome your Cart</h2>
        <p>{totalPrice}</p>
        <div>
          
            <h3>Tabla de datos</h3>
            {storageCart && storageCart.length > 0
                        ?(storageCart.map((el, index)=> <ProductCart
                          key={el.name}
                          name={el.name}
                          stock={el.stock}
                          price={el.price}
                          id={el.id}
                          image={el.image}
                          pos={index}
                          viewProduct={viewProduct}
                          deleteDatatoStorage={deleteDatatoStorage}
                          setTotalPrice={setTotalPrice}
                        />)):
                        <h3>Sin datos</h3>
                        }
           
        </div>
      </section>
    </div>
    
  )
}


// {/* <table>
// <tbody>
//     {storageCart && storageCart.length > 0
//         ?(storageCart.map(el=><tr key={el.id}>
//                                 <td>
//                                     {/* <button onClick={()=>setDataToEdit(el)}>Editar</button> */}
//                                     {permitMore && <button onClick={()=>oneMore(el.stock, el.name)}>+</button>}
                                    
//                                     {permitLess && <button onClick={()=>oneLess(el.stock, el.name)}>-</button>}
//                                     <span>{renderCount}</span>
                                 
//                                     <button onClick={()=>deleteDatatoStorage(el.name)}>Eliminar</button>
//                                     <button onClick={()=>viewProduct(el.id)}>Ver</button>
                                  
//                                 </td>
//                                 <td><img src={el.image} alt={el.name}/></td>
//                                 <td>{el.name}</td>
//                                 <td>{el.price}</td>
//                               </tr>
                              
//              ))
//         :<tr><td colSpan="3"> Sin datos</td></tr>  
//     }
// </tbody>
// </table> */}