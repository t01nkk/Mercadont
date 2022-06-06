export const totalPrice = () => {
  let user = JSON.parse(localStorage.getItem("myUser"))
  let local = JSON.parse(localStorage.getItem(user));
  let total = 0
  if (local) {
    for (let i = 0; i < local.length; i++) {
      total += local[i].totalPrice
    }
    return total
  }
}

