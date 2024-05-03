import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useAuth } from "../../context/authContext";
import { alertSuccess, alertWarning } from '../../helpers/toast';
import './CreateUserForm.scss';
export default function LogInForm() {
    const navigate = useNavigate();

    const { t } = useTranslation();
    // const handleChange = (e) => {
    //   setData({ ...data, [e.target.name]: e.target.value });
    // };

    // const { signup } = useAuth();
    const [error, setError] = useState();

    const handleSubmitt = async (values) => {
        try {
            // const userCredentials = await signup(values.email, values.password);
            await axios.post(`${process.env.REACT_APP_DOMAIN}/auth/register`, {
                name: values.name,
                email: values.email,
                password: values.password,
            });
            alertSuccess(t('createUserTest.accountCreated'));
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            if (err.code === 'auth/internal-error')
                setError(t('createUserTest.errors_mail_invalid'));
            if (err.code === 'auth/email-already-in-use') {
                alertWarning(`${t('createUserTest.errors_mail_taken')}`);

                setError(t('createUserTest.errors_mail_taken'));
            }
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = `${t('createUserTest.errors_mail')}`;
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = `${t(
                            'createUserTest.errors_mail_invalid'
                        )}`;
                    }
                    if (!values.password) {
                        errors.password = `${t(
                            'createUserTest.errors_password'
                        )}`;
                    } else if (
                        !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(
                            values.password
                        )
                    ) {
                        errors.password = `${t(
                            'createUserTest.errors_password_invalid'
                        )}`;
                    }
                    if (values.password !== values.password2) {
                        errors.password = `${t(
                            'createUserTest.errors_password_match'
                        )}`;
                    }
                    return errors;
                }}
                onSubmit={(values, { setErrors }) => {
                    return handleSubmitt(values).catch(() => {
                        setErrors('email', 'This email is not valid');
                    });
                }}
            >
                {({
                    errors,
                    handleSubmit,
                    handleChange,
                    isSubmitting,
                    touched,
                }) => (
                    <div className="loginCard">
                        <p className="login-welcome">
                            {t('createUserTest.createAccount')}
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="form-createUser"
                        >
                            <div className="divInputUser">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={t('createUserTest.name')}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="divInputUser">
                                <input
                                    type="text"
                                    required
                                    placeholder={t('createUserTest.email')}
                                    name="email"
                                    onChange={handleChange}
                                />

                                {touched.email && errors.email ? (
                                    <p className="error-style">
                                        {errors.email}
                                    </p>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="divInputUser">
                                <input
                                    type="password"
                                    required
                                    placeholder={t('createUserTest.password')}
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="divInputUser">
                                <input
                                    type="password"
                                    required
                                    placeholder={t(
                                        'createUserTest.confirmPassword'
                                    )}
                                    name="password2"
                                    onChange={handleChange}
                                />

                                {touched.password && errors.password ? (
                                    <p className="error-style">
                                        {errors.password}
                                    </p>
                                ) : (
                                    ''
                                )}
                            </div>

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="input-submit-create"
                            >
                                {t('createUserTest.createAccount')}
                            </button>
                        </form>
                    </div>
                )}
            </Formik>
        </>
    );
}
