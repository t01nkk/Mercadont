import React, { useEffect } from 'react';
import logo from '../../../media/header_logo.png';

import LoggedAdmin from './LoggedAdmin/LoggedAdmin';
import UnloggedAdmin from './UnloggedAdmin/UnloggedAdmin';
import { useStore } from '../../../context/store';
import { fetchCategories } from '../../../redux/actions/actions';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_SESSION } from '../../../redux/actions/actionTypes';

export default function NavBarADMIN() {
    const [state, dispatch] = useStore();
    const navigate = useNavigate();
    const checkSessionADMIN = async (dispatch) => {
        let loggedAdmin = false; //
        let loggedAdminInfo = JSON.parse(localStorage.getItem('myAdmin'));
        if (loggedAdminInfo !== null) {
            if (loggedAdminInfo?.data.isAdmin) {
                loggedAdmin = true; //
                await dispatch({
                    type: ADMIN_SESSION,
                    payload: {
                        admin: loggedAdminInfo,
                        sessionAdmin: loggedAdmin,
                    },
                });
            }
        } else {
            await dispatch({
                type: ADMIN_SESSION,
                payload: {
                    sessionAdmin: loggedAdmin,
                },
            });
            navigate('/admin/login');
        }
    };
    useEffect(() => {
        fetchCategories(dispatch);
    }, []);
    useEffect(() => {
        checkSessionADMIN(dispatch);
    }, [state.sessionAdmin]);
    return <> {state.sessionAdmin ? <LoggedAdmin /> : <UnloggedAdmin />}</>;
}
