export const totalPrice = ()=>{
    let local = JSON.parse(localStorage.getItem("myCart"))
    let total = 0
    if(local){
      for(let i = 0; i< local.length; i++){
        total += local[i].totalPrice
    }
    return total
  }
  }

  