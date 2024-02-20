import axios from "axios";
import {
  setUserOrders,
  setError,
  setLoading,
  setServerResponseMsg,
  setServerResponseStatus,
  userLogin,
  userLogout,
  stateReset,
  verificationEmail,
} from "../slices/user";

import { clearCart } from "../slices/cart";

export const login = (email, password) => async (dispatch) =>{
    dispatch(setLoading(true));
    try {
        const config = {headers: {'Content-Type': 'application/json'}};
        const {data} = await axios.post('api/users/login', {email, password}, config);

        dispatch(userLogin(data))
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch(
            setError(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : "An unexpected error occured please try again later."
            )
          );
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItem');
    dispatch(clearCart());
    dispatch(userLogout());
};

export const register = (name, email, password) => async (dispatch) =>{
    dispatch(setLoading(true));
    try {
        const config = {headers: {'Content-Type': 'application/json'}};
        const {data} = await axios.post('api/users/register', {name, email, password}, config);

        dispatch(userLogin(data))
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch(
            setError(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : "An unexpected error occured please try again later."
            )
          );
    }
};

export const verifyEmail = (token) => async (dispatch) => {
};

export const sendResendEmail = (email) => async (dispatch) =>{
    dispatch(setLoading(true));
    try {
        const config = {headers: {'Content-Type': 'application/json'}};

        const {data, status} = await axios.post(`/api/users/password-rest-request`, {email}, config)
		dispatch(setServerResponseMsg(data));
		dispatch(setServerResponseStatus(status));

    } catch (error) {
        dispatch(
            setError(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : "An unexpected error occured please try again later."
            )
          );
    }
}

export const resetPassword = (password, token) => async (dispatch) =>{
    dispatch(setLoading(true));
    try {
        const config = {headers:{Authorization: `Bearer ${token}`,'Content-Type': 'application/json'}};

        const {data, status} = await axios.post(`/api/users/password-reset`, {password}, config)
        dispatch(setServerResponseMsg(data, status))
        dispatch(setServerResponseStatus(status)); 

    } catch (error) {
        dispatch(
            setError(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : "An unexpected error occured please try again later."
            )
          );
    }
}

export const resetState = () => async (dispatch) =>{
    dispatch(stateReset());
}

export const googleLogin = (googleId, email, name, googleImage) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.post('/api/users/google-login', { googleId, email, name, googleImage }, config);
		dispatch(userLogin(data));
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'An expected error has occured. Please try again later.'
			)
		);
	}
};