import React, { useEffect } from 'react';
import { useStore } from '../../../context/store';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FilterCategories from '../../FilterCategories/FilterCategories';
import { getFavorites } from '../../../redux/actions/actions.js';
import SearchBar from '../../SearchBar/SearchBar';
import './responsiveNavBar.scss';
import { useAuth } from '../../../context/authContext';
import logo from '../../../media/logonavbar.png';
import { totalCount } from '../../../redux/actions/actions.js';
import { alertInfo } from '../../../helpers/toast';

export default function LoggedNavBar() {
    const { t, i18n } = useTranslation();
    const [state, dispatch] = useStore();
    // const [language, setLanguage] = useState("es");
    let myUser = JSON.parse(localStorage.getItem('myUser'));
    let myCart = JSON.parse(localStorage.getItem(myUser));
    const { logout } = useAuth();
    const navigate = useNavigate();
    const logoutSesion = async () => {
        // let user = JSON.parse(localStorage.getItem("myUser"))
        const answer = window.confirm(t('loggedNavBar.confirmLogOut'));
        if (answer) {
            await logout;
            localStorage.removeItem('myUser');
            alertInfo(t('loggedNavBar.loggedOut'));
            navigate('/');
        }
    };
    const handleLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    useEffect(() => {
        let myUser = JSON.parse(localStorage.getItem('myUser'));
        if (myUser) {
            getFavorites(dispatch, myUser);
        }
    }, [state.favorites.length]);

    useEffect(() => {
        if (myCart) {
            totalCount(dispatch);
        }
    }, [dispatch, state.countCart]);

    return (
        <div className="navbar-space">
            <nav
                className="navbar navbar-expand-sm navbar-light  fixed-top"
                style={{ backgroundColor: 'black' }}
            >
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src={logo} alt="" height="80" />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse "
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav  justify-content-center ">
                            <li className="nav-item white-text-nav">
                                <Link to="/">{t('loggedNavBar.home')}</Link>
                            </li>
                            <li className="nav-item dropdown  white-text-nav">
                                <Link
                                    to=""
                                    className="dropdown-toggle"
                                    id="dropdownMenuClickableInside"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    {t('loggedNavBar.categories')}
                                </Link>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <FilterCategories />
                                </ul>
                            </li>
                            <li className="nav-item dropdown white-text-nav">
                                <Link
                                    to=""
                                    className="dropdown-toggle "
                                    id="dropdownMenuClickableInside"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                    aria-expanded="false"
                                >
                                    {t('loggedNavBar.profile')}
                                </Link>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li className="dropdown-item category-list-item">
                                        <Link to="/accountDetails">
                                            {t('loggedNavBar.accountDetails')}
                                        </Link>
                                    </li>
                                    <li className="dropdown-item category-list-item">
                                        <Link to="/favorites">
                                            {t('loggedNavBar.favorites')}
                                        </Link>
                                    </li>
                                    <li className="dropdown-item category-list-item">
                                        <Link to="/history">
                                            {t('loggedNavBar.history')}
                                        </Link>
                                    </li>
                                    <li className="dropdown-item category-list-item log-out">
                                        <a onClick={logoutSesion}>
                                            {t('loggedNavBar.logOut')}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item white-text-nav ">
                                <Link className="" to="/cart">
                                    {t('guestNavBar.cart')}
                                    {state.countCart ? (
                                        <span className="cart-count">
                                            {state.countCart}
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <SearchBar />
                </div>
            </nav>
        </div>
    );
}
