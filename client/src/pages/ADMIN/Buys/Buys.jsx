import axios from "axios";
import React, { useState, useEffect } from "react";
import { ItemBuy } from "./ItemBuy.jsx";
import { DetailsBuys } from "./DetailsBuys.jsx";
import { useHistory, useLocation } from "react-router-dom";
import "./buys.scss";
import { alertSuccess } from '../../../helpers/toast'
import { useTranslation } from 'react-i18next'
export const Buys = () => {
  const { t } = useTranslation()
  const [stateBuys, setStateBuys] = useState("pending");
  const [dataBuys, setDataBuys] = useState("");
  const [detailsProduct, setDetailsProduct] = useState([]);
  const [changeSection, setChangeSection] = useState(true);
  const [quantity, setQuantity] = useState([]);
  const [cant, setCant] = useState(0);
  const history = useHistory();
  let { search } = useLocation();

  //ESTADO DE LA COMPRA
  //"pending", "accepted", "rejected"
  useEffect(() => {
    getDataBuys();
  }, [stateBuys]);

  let getDataBuys = async () => {
    try {
      let buys = await axios(`${process.env.REACT_APP_DOMAIN}/admin/filterOrders/${stateBuys}`)
      setDataBuys(buys.data)
    } catch (error) {
      console.log(error)
    }
  }
  const back = () => {
    setChangeSection(true);
    history.push("/admin/Buys");
  };

  let changeStateBuys = async (changeState) => {
    try {
      let resp = await axios.put(`${process.env.REACT_APP_DOMAIN}/admin/setOrderStatus`, {
        orderStatus: changeState,
        orderId: search.substring(1)
      })
      if (resp) {
        history.push(`/admin/Buys`)
        alertSuccess(t("adminBuys.confirmPurchase"))
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {changeSection ? (
        <div className="buys-container">
          <div className="buys-btn-container">
            <button
              className="buys-btn-status"
              onClick={() => setStateBuys("pending")}
            >
              {t("adminBuys.pending")}
            </button>
            <button
              className="buys-btn-status"
              onClick={() => setStateBuys("accepted")}
            >
              {t("adminBuys.accepted")}
            </button>
            <button
              className="buys-btn-status"
              onClick={() => setStateBuys("rejected")}
            >
              {t("adminBuys.rejected")}
            </button>
          </div>
          <div className="orders-list-container">
            {dataBuys.length > 0 &&
              dataBuys.map((e) => (
                <ul className="list-group container-fluid long-list">
                  <ItemBuy
                    key={e.orderNumber}
                    orderId={e.orderNumber}
                    amount={e.amount}
                    date={e.date}
                    email={e.user.email}
                    count={e.products}
                    deliveryAddress={e.deliveryAddress}
                    setCant={setCant}
                    setChangeSection={setChangeSection}
                    setQuantity={setQuantity}
                    setDetailsProduct={setDetailsProduct}
                  />
                </ul>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={() => back()}>{t("navigation.return")}</button>
            {detailsProduct.length &&
              detailsProduct.map((e, i) => (
                <DetailsBuys
                  // amount={history[index].amount}
                  amountProduct={quantity[i]}
                  key={e.id}
                  name={e.name}
                  id={e.id}
                  image={e.image}
                  price={e.price}
                />
              ))}
            <>
              {dataBuys[0].orderStatus === "pending" && (
                <div>
                  <button
                    onClick={() => {
                      changeStateBuys("accepted");
                    }}
                  >
                    {t("adminBuys.acceptPurchase")}
                  </button>
                  <button
                    onClick={() => {
                      changeStateBuys("rejected");
                    }}
                  >
                    {t("adminBuys.rejectPurchase")}
                  </button>
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
}
