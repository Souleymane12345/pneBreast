
import axios from "../axios"


import { 
        LOGIN_FAIL, 
        LOGIN_SUCCESS, 
        LOGOUT_SUCCESS,
        USER_LOADING,
        USER_LOADED,
        AUTH_ERROR,
        TOKEN_REFRESH_SUCCESS,
        TOKEN_REFRESH_FAIL,
        TOKEN_REFRESH_LOADING,
        ERROR_VALUE_CLEAR,
        USER_PASSWORD_CHANGE_LOADING,
        USER_PASSWORD_CHANGE_SUCCESS,
        USER_PASSWORD_CHANGE_FAIL,
        LOGIN_LOADING,
        EMAIL_USER_GET_LOADING,
        EMAIL_USER_GET_SUCCESS,
        EMAIL_USER_GET_FAILED,
        CLEAR_STAPPERS_VALUE_CONNEXION
    } from "../types/userTypes"


export const configHeaders = {
    headers:{
        'Content-Type': 'application/json'
    }
}

export const configHeadersToken = (token) => {
    return {
        headers:{
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token 
    }
    }
}

export const configHeadersFormDataToken = (token) => {
    return {
        headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}` 
    }
    }
}


export const login = (email, password) => (dispatch) => {
    const config = configHeaders
    const body = JSON.stringify({email, password})
    dispatch({type:LOGIN_LOADING})
    axios.post('/api/token/', body, config)
    .then(response => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    })
    .catch(error => {
        // console.log(error?.response?.data?.detail)
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
    })

}

//load le user connecté
export const loadUser = () => (dispatch, getState) => {
    
    //USER LOADING

    dispatch({type: USER_LOADING})

    if(getState().userdata.token_access !== null){
        const token = localStorage.getItem("token_access")
        // // const id_user = jwtDecode(token).user_id
        axios.get(`/api/utilisateur/utilisateurConnecte/`, configHeadersToken(token))
        .then(reponse => {
            // ToastSuccessGeneric().fire();

            dispatch({
                type: USER_LOADED,
                payload: reponse.data
            })
        })
        .catch(error => {
            // ToastGeneric(error[0] , 'error').fire();

            dispatch({
                type:AUTH_ERROR
            })
        })
    }
    
}

export const setError = () => (dispatch) => {
    dispatch({type: ERROR_VALUE_CLEAR})
}


export const logout = () => (dispatch) => {

    dispatch({
        type: LOGOUT_SUCCESS
    })
}

export const refreshToken = () => (dispatch, getState) => {
    if(getState().userdata.token_access !== null){
        dispatch({
            type:TOKEN_REFRESH_LOADING
        })
        // const token_refresh = localStorage.getItem("token_refresh")
        const token_access = localStorage.getItem('token_access')
        const token_refresh = localStorage.getItem('token_refresh')
        // console.log(getState().userdata.token_refresh)
        axios.post('/api/token/refresh/', 
                    JSON.stringify({"refresh": token_refresh}), 
                    configHeadersToken(token_access)
        ).then(response => {
            dispatch({
                type: TOKEN_REFRESH_SUCCESS,
                payload: response.data
            })
        })
        .catch(error => {
            

            dispatch({
                type: TOKEN_REFRESH_FAIL
            })
        })
    }
}

export const updatePassword = (body) => (dispatch, getState) => {
    
    //USER LOADING

    dispatch({type: USER_PASSWORD_CHANGE_LOADING})

    if(getState().userdata.token_access !== null){
        const token = localStorage.getItem("token_access")
        // // const id_user = jwtDecode(token).user_id
        axios.put(`/api/utilisateur/changer_mot_passe/`, body, configHeadersToken(token))
        .then(reponse => {
            dispatch({
                type: USER_PASSWORD_CHANGE_SUCCESS,
                payload: reponse.data
            })
        })
        .catch(error => {
            // console.log(error.response?.data?.old_password[0])
            dispatch({
                type: USER_PASSWORD_CHANGE_FAIL,
                payload: error?.response?.data?.old_password[0]
            })
        })
    }
    
}



export const getEmailPasswordForget = (body) => (dispatch) => {
    const config = configHeaders

    dispatch({type:EMAIL_USER_GET_LOADING})

    axios.post('', body, config)
    .then(response => {
        dispatch({
            type: EMAIL_USER_GET_SUCCESS,
            payload: response.data
        })
    })
    .catch(error => {
        // console.log(error?.response?.data?.detail)
        dispatch({
            type: EMAIL_USER_GET_FAILED,
            payload: error?.response?.data?.detail
        })
    })

}


export const clearStapperValues = () => (dispatch) => {
    dispatch({type: CLEAR_STAPPERS_VALUE_CONNEXION})
}
