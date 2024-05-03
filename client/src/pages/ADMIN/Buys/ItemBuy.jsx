import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

    const { t } = useTranslation();

    const [idProduct, setIdProduct] = useState([]);
    const navigate = useNavigate();
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
            navigate(`/admin/Buys?${orderId}`);
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
                {t('dateHistory.dateOfPurchase')}
                <span>{date}</span>
            </p>
            <p className="purchase-labels">
                {t('dateHistory.email')} <span> {email}</span>
            </p>
            <p className="purchase-labels">
                {t('dateHistory.email')} <span>{deliveryAddress}</span>{' '}
            </p>
            <div>
                <p className="purchase-labels">
                    {t('dateHistory.total')}: U$D<span>{amount}</span>
                </p>
            </div>
            <br />
        </li>
    );
};
