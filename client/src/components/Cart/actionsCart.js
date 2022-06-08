import axios from "axios";

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

export const handleDeleteFavorite = async (id) => {
  let person = JSON.parse(localStorage.getItem("myUser"));
  try {
    await axios.delete(
      `${process.env.REACT_APP_DOMAIN}/user/removeFavorite`,
      {
        data: {
          idUser: person,
          idProduct: id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};