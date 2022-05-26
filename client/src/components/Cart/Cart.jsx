import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ProductCart } from '../ProductCart/ProductCart'


export const Cart = () => {

  let yourStorage = JSON.parse(localStorage.getItem("myCart"))
  const [storageCart, setStorageCart] = useState(yourStorage)
  const history = useHistory()
  const [priceTotal, setPriceTotal] = useState(0)



  const deleteDatatoStorage = (name) =>{
    let newLocalStorage = yourStorage.filter(e => e.name !== name)
    setStorageCart(newLocalStorage)
    console.log(newLocalStorage)
    localStorage.setItem("myCart", JSON.stringify(newLocalStorage))
  }

  //Funcion para ver detalle del producto por id
  const viewProduct = (id)=>{
    history.push(`/home/${id}`)
  }

    // FUNCION PARA VER EL STORAGE, NO BORRAR
  const mostra = ()=>{
    let miStorage = window.localStorage;
    console.log(yourStorage)
  }

  //Funcion para limpiar carro
  const clearCart = ()=>{
    localStorage.clear()
    setStorageCart([])
  }

  let totalPrice = ()=>{
    let local = JSON.parse(localStorage.getItem("myCart"))
    let total = 0
    for(let i = 0; i< local.length; i++){
      total += local[i].totalPrice
    }
    setPriceTotal(total)
  }

  return (
    <div>
      
      <button onClick={()=>clearCart()}>Clear Cart</button>
      <button onClick={()=>mostra()}>mostra storage</button>  
      <section>

        <h2>Welcome your Cart</h2>
        <p>{priceTotal}</p>
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
                          totalPrice={totalPrice}
                        />)):
                        <h3>Sin datos</h3>
                        }
           
        </div>
      </section>
    </div>
    
  )
}
