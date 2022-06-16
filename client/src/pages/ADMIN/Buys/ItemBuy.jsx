import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
export const ItemBuy = ({
  amount,
  date,
  count,
  setChangeSection,
  setDetailsProduct,
  orderId,
  deliveryAddress,
  email,
  setQuantity,
  setCant,
}) => {
  date = date.slice(0, 10);

  const [idProduct, setIdProduct] = useState([]);
  const history = useHistory();
  let total = 0;

  useEffect(() => {
    sumarCount();
  }, [count.length]);

  const sumarCount = async () => {
    if (count.length) {
      let newArray = [];
      let arrayQuantity = [];
      count.forEach((e) => {
        total += e.productQuantity;
        newArray.push(e.product);
        arrayQuantity.push(e.productQuantity);
      });

      setIdProduct(newArray);
      setQuantity(arrayQuantity);
    }
    setCant(total);
  };

  const getDetailsBuys = async () => {
    try {
      const foundProducts = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/user/product/history`,
        {
          order: idProduct,
        }
      );
      history.push(`/admin/Buys?${orderId}`);
      await setDetailsProduct(foundProducts.data);
      await setChangeSection(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li
      className="list-group-item flex-fill history-list-direction"
      onClick={getDetailsBuys}
    >
      <p className="purchase-labels">
        Date: <span>{date}</span>
      </p>
      <p className="purchase-labels">
        Email <span> {email}</span>
      </p>
      <p className="purchase-labels">
        Address: <span>{deliveryAddress}</span>{" "}
      </p>
      <div>
        <p className="purchase-labels">
          Total: U$D<span>{amount}</span>
        </p>
      </div>
      <br />
    </li>
  );
};
