import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { totalPrice } from '../Cart/actionsCart';
import { ListProductsBuys } from '../ListProductsBuys/ListProductsBuys.jsx';
import { PruebaListProduct } from '../ListProductsBuys/PruebaListProduct';
import { useTranslation } from 'react-i18next';
import accounting from 'accounting';
import { alertInfo, alertWarning } from '../../helpers/toast';
import { Loader } from '../Loader/Loader.jsx';
import './SendBuys.scss';

export const SendBuys = () => {
    const { t } = useTranslation();
    const stripe = useStripe();
    const elements = useElements();
    const [address, setAdress] = useState({
        country: '',
        province: '',
        city: '',
        street: '',
        postalCode: '',
    });

    let user = JSON.parse(localStorage.getItem('myUser'));
    let local = JSON.parse(localStorage.getItem(user));
    let priceTotal = JSON.parse(localStorage.getItem('myPrice'));
    const [redirect, setRedirect] = useState('');
    const [selectBuys, setSelectBuys] = useState('');
    const [selectShipping, setSelectShipping] = useState('');
    const [amountTotal, setAmounTotal] = useState('');
    const [loadingBuys, setLoadingBuys] = useState(false);
    const [error, setError] = useState({
        country: '',
        province: '',
        city: '',
        street: '',
        postalCode: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        setAmounTotal(totalPrice());
    }, []);

    const handleAdress = (e) => {
        setAdress({
            ...address,
            [e.target.name]: e.target.value,
        });
    };

    const blurAddress = (e) => {
        e.stopPropagation();
        handleAdress(e);
        validateForm(address);
    };

    const validateForm = () => {
        let error = {};
        if (!/^[A-Za-z\s]+$/.test(address.country) && address.country !== '')
            error.country = t('errors.error_addressFormLetters_validate');
        if (!/^[A-Za-z\s]+$/.test(address.province) && address.province !== '')
            error.province = t('errors.error_addressFormLetters_validate');
        if (!/^[A-Za-z\s]+$/.test(address.city) && address.city !== '')
            error.city = t('errors.error_addressFormLetters_validate');
        if (!/^[A-Za-z0-9\s]+$/.test(address.street) && address.street !== '')
            error.street = t('errors.error_addressFormAlphaNumbers_validate');
        if (
            !/^[A-Za-z0-9\s]+$/.test(address.postalCode) &&
            address.postalCode !== ''
        )
            error.postalCode = t(
                'errors.error_addressFormAlphaNumbers_validate'
            );

        setError(error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let el = elements.getElement(CardElement);
        if (selectBuys === 'card') {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });
            setLoadingBuys(true);
            if (!error) {
                alertInfo(t('sendBuys.processingCard'));
                const { id } = paymentMethod;
                // console.log("address:",address)
                try {
                    await axios.post(
                        `${process.env.REACT_APP_DOMAIN}/buying/card`,
                        {
                            id,
                            amount: Math.round(priceTotal * 100),
                            local,
                            userId: user,
                            address,
                        }
                    );
                } catch (error) {
                    if (error.message === 'insuficientStock') {
                        alertWarning(t('sendBuys.insuficientQuantity'));
                        setLoadingBuys(false);
                        localStorage.removeItem(user);
                        return navigate('/cart?buy=false');
                    } else {
                        alertWarning(t('sendBuys.error'));
                        setLoadingBuys(false);
                        localStorage.removeItem(user);
                        console.log(error);
                        return navigate('/cart?buy=false');
                    }
                }
            } else {
                alertWarning(t('sendBuys.cardProblem'));
                setLoadingBuys(false);
            }
            // loadingBuys()
            if (paymentMethod) {
                setLoadingBuys(false);
                localStorage.removeItem(user);
                navigate('/cart?buy=true');
            }
        }
    };

    const handleShipping = async (e) => {
        e.preventDefault();
        if (e.target.id === 'accountAddress') {
            try {
                const userAddress = await axios.get(
                    `${process.env.REACT_APP_DOMAIN}/user/details/${user}`
                );

                if (
                    userAddress.data.country === '' ||
                    userAddress.data.province === '' ||
                    userAddress.data.city === '' ||
                    userAddress.data.street === '' ||
                    userAddress.data.postalCode === ''
                ) {
                    alertWarning(t('sendBuys.addressNotComplete'));
                } else {
                    setSelectShipping('accountAddress');
                    setAdress({
                        country: userAddress.data.country,
                        province: userAddress.data.province,
                        city: userAddress.data.city,
                        street: userAddress.data.street,
                        postalCode: userAddress.data.postalCode,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (e.target.id === 'newAddress') {
            setSelectShipping('newAddress');
        }
    };

    const handelClik = async (e) => {
        e.preventDefault();
        if (e.target.id === 'card') setSelectBuys('card');
        if (e.target.id === 'paypal') {
            setSelectBuys('paypal');
            const purchase = await axios.post(
                `${process.env.REACT_APP_DOMAIN}/buying/payPal/create-order`,
                {
                    purchase_units: [
                        //   //^ Requerido. Es... Bueno, lo que está comprando.
                        {
                            amount: {
                                currency_code: 'USD', //Requerido. El código de 3 letras de la moneda en la que se cobra el pago. SIEMPRE es 3 letras. Estándar ISO-4217.
                                value: '' + priceTotal, //Requerido. Precio total. Y es una string. Ojete al piojete.
                                //Se puede poner un objeto breakdown: {} para dar más info de todo el pago y bla bla, pero no es requerido.
                            },
                            description: 'Compra PayPal', //No requerido. Max: 128 caracteres.
                        },
                    ],
                    user,
                    local,
                    address,
                }
            );
            setRedirect(purchase.data);
            // localStorage.removeItem(user)
        }
    };

    const handleBack = async (e) => {
        e.preventDefault();
        navigate('/cart');
    };
    const [products, setProducts] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        let local = JSON.parse(localStorage.getItem(user));
        let priceTotal = JSON.parse(localStorage.getItem('myPrice'));

        setProducts(local);
        setPrice(priceTotal);
    }, []);

    return (
        <div>
            <button
                className="navigation-return-cart"
                onClick={(e) => handleBack(e)}
            >
                {t('navigation.returnToCart')}
            </button>
            <form onSubmit={handleSubmit} className="form-buys">
                <div className="cart-container">
                    <h2 className="cart-container-title">
                        {t('sendBuys.productsList')}
                    </h2>
                    <div className="list-group container-fluid ">
                        {React.Children.toArray(
                            products &&
                                products.map((el) => (
                                    <ListProductsBuys
                                        name={el.name}
                                        price={el.price}
                                        totalPrice={el.totalPrice}
                                        image={el.image}
                                        amount={el.quantity}
                                    />
                                ))
                        )}
                    </div>
                    {amountTotal && (
                        <p className="total-price-cart-send">
                            {t('sendBuys.totalPrice')}
                            {`${accounting.formatMoney(
                                amountTotal,
                                'U$D ',
                                0
                            )}`}
                        </p>
                    )}
                </div>

                <div className="container-direction-form-button">
                    <div className="container-select-address">
                        <h4>{t('sendBuys.chooseAddress')}</h4>
                        <div>
                            <button
                                id="accountAddress"
                                onClick={(e) => handleShipping(e)}
                            >
                                {t('sendBuys.accountAddress')}
                            </button>
                            <button
                                id="newAddress"
                                onClick={(e) => handleShipping(e)}
                            >
                                {t('sendBuys.newAddress')}
                            </button>
                        </div>
                    </div>
                    <div className="form-direction-cart">
                        {selectShipping === 'newAddress' ? (
                            <>
                                <h3 className="cart-container-title-direction">
                                    {t('sendBuys.fillShippingAddress')}
                                </h3>
                                <div>
                                    <label htmlFor="country">
                                        {t('accountDetails.country')}
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={address.country}
                                        onChange={handleAdress}
                                        onBlur={blurAddress}
                                    />
                                    {error.country && (
                                        <p className="error-style">
                                            {error.country}
                                        </p>
                                    )}

                                    <label htmlFor="province">
                                        {t('accountDetails.province')}
                                    </label>
                                    <input
                                        type="text"
                                        name="province"
                                        value={address.province}
                                        onChange={handleAdress}
                                        onBlur={blurAddress}
                                    />
                                    {error.province && (
                                        <p className="error-style">
                                            {error.province}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="city">
                                        {t('accountDetails.city')}
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={address.city}
                                        onChange={handleAdress}
                                        onBlur={blurAddress}
                                    />
                                    {error.city && (
                                        <p className="error-style">
                                            {error.city}
                                        </p>
                                    )}

                                    <label htmlFor="street">
                                        {t('accountDetails.street')}
                                    </label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={address.street}
                                        onChange={handleAdress}
                                        onBlur={blurAddress}
                                    />
                                    {error.street && (
                                        <p className="error-style">
                                            {error.street}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="postalCode">
                                        {t('accountDetails.postalCode')}
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={address.postalCode}
                                        onChange={handleAdress}
                                        onBlur={blurAddress}
                                    />
                                    {error.postalCode && (
                                        <p className="error-style">
                                            {error.postalCode}
                                        </p>
                                    )}
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
                {selectShipping === 'newAddress' &&
                    address.country &&
                    address.province &&
                    address.city &&
                    address.street &&
                    address.postalCode &&
                    Object.keys(error).length === 0 && (
                        <div className="container-select-address">
                            <p>{t('sendBuys.paymentMethod')}</p>
                            <div>
                                <button
                                    id="card"
                                    onClick={(e) => handelClik(e)}
                                >
                                    {t('sendBuys.card')}
                                </button>
                                <button
                                    id="paypal"
                                    onClick={(e) => handelClik(e)}
                                    type="submit"
                                >
                                    {t('sendBuys.paypal')}
                                </button>
                            </div>
                        </div>
                    )}

                {selectShipping === 'accountAddress' && (
                    <div className="container-select-address">
                        <p>{t('sendBuys.paymentMethod')}</p>
                        <div>
                            <button id="card" onClick={(e) => handelClik(e)}>
                                {t('sendBuys.card')}
                            </button>
                            <button
                                id="paypal"
                                onClick={(e) => handelClik(e)}
                                type="submit"
                            >
                                {t('sendBuys.paypal')}
                            </button>
                        </div>
                    </div>
                )}

                {
                    <div>
                        {selectBuys === 'card' ? (
                            <>
                                {' '}
                                <p>Por favor ingrese los datos de su tarjeta</p>
                                <CardElement
                                    id="carElement"
                                    className="form-control"
                                />
                                <div className="container-select-address">
                                    <button
                                        className="make-buys-sendBuys"
                                        type="submit"
                                    >
                                        {t('sendBuys.cardPay')}
                                    </button>
                                </div>
                                {loadingBuys && (
                                    <div className="buys-loader">
                                        <Loader />
                                    </div>
                                )}
                                {/* <PruebaListProduct /> */}
                            </>
                        ) : null}
                    </div>
                }
                {selectBuys === 'paypal' ? (
                    <div className="container-select-address">
                        <button type="submit" className="paypal-shipping">
                            {redirect ? (
                                <a href={redirect}>
                                    {t('sendBuys.paypalConfirm')}
                                </a>
                            ) : (
                                <span>{t('sendBuys.paypalProcessing')}</span>
                            )}
                        </button>
                    </div>
                ) : null}
            </form>
        </div>
    );
};
