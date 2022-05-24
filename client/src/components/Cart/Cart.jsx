import React, { useState,useEffect } from 'react'

export const Cart = () => {

  let yourStorage = JSON.parse(localStorage.getItem("myCart"))
  const [storageCart, setStorageCart] = useState(yourStorage)

  //FUNCION PARA VER EL STORAGE, NO BORRAR
  const mostra = ()=>{
    let miStorage = window.localStorage;
  }


  const deleteDatatoStorage = (name) =>{
    let newLocalStorage = yourStorage.filter(e => e.name !== name)
    // console.log(newLocalStorage)
    setStorageCart(newLocalStorage)
    localStorage.setItem("myCart", JSON.stringify(newLocalStorage))
    // setStorageCart(yourStorage)
  }

  // useEffect(()=>{
  //   setStorageCart(yourStorage)
  // },[yourStorage])


  return (
    <div>
      <button onClick={()=>mostra()}>mostra storage</button>
      <section>
        <h2>Welcome your Cart</h2>
        <div>
            <h3>Tabla de datos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Constalacion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {storageCart && storageCart.length > 0
                        ?(storageCart.map(el=><tr key={el.name}>
                                                <td>{el.name}</td>
                                                <td>{el.price}</td>
                                                <td>
                                                    {/* <button onClick={()=>setDataToEdit(el)}>Editar</button> */}
                                                    <button onClick={()=>deleteDatatoStorage(el.name)}>Eliminar</button>
                                                </td>
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
