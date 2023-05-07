import { AUTH_ERROR, LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, 
    LOGOUT_SUCCESS, USER_LOADED, USER_LOADING, TOKEN_REFRESH_SUCCESS, 
    TOKEN_REFRESH_FAIL, TOKEN_REFRESH_LOADING, ERROR_VALUE_CLEAR, 
    USER_PASSWORD_CHANGE_LOADING, USER_PASSWORD_CHANGE_SUCCESS, USER_PASSWORD_CHANGE_FAIL, AUTH_ERROR_NON_TROUVE, EMAIL_USER_GET_LOADING, EMAIL_USER_GET_SUCCESS, EMAIL_USER_GET_FAILED, CLEAR_STAPPERS_VALUE_CONNEXION } from "../../types/userTypes"
// import jwtDecode from "jwt-decode"

const initialState = {
    token_access: localStorage.getItem('token_access'),
    token_refresh: localStorage.getItem('token_refresh'),
    user: {},
    isAuthenticated: null,
    isLoading: false,
    error:null,
    isLoadingChanged:false,
    errorPassword:null,
    isLoadingConnexion:false,
    isErrorPassword:false,
    isLoginError:false,
    loginError:null,
    isSetPasswordSucces:false,
    isLoadingRefresh:false,
    isLoadingGetEmail: false,
    isSuccessGetEmail: false,
    isErrorGetEmail: false,
    errorGetEmail: "",
    messageGetEmail: "",
}

// eslint-disable-next-line
export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: false,
                isLoadingConnexion:false,
                error:null,
                isSetPasswordSucces:false,
                isLoadingRefresh:false,
        }
        case USER_PASSWORD_CHANGE_LOADING:
            return {
                ...state,
                isLoadingChanged: true,
                errorPassword: null,
                isErrorPassword:false,
                isSetPasswordSucces:false
        }
        case USER_PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                isLoadingChanged: false,
                isErrorPassword:false,
                errorPassword:null,
                isSetPasswordSucces:true
        }
        case USER_PASSWORD_CHANGE_FAIL:
            return {
                ...state,
                isLoadingChanged: false,
                errorPassword: action.payload,
                isErrorPassword:true,
                isSetPasswordSucces:false
        }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                error:null,
                isSetPasswordSucces:false,
                isLoginError:false,
                loginError:null,
                isLoadingRefresh:false,
        }
        
        case LOGIN_LOADING:
            return {
                ...state,
                isLoadingConnexion: true,
                isLoginError:false,
                loginError:null
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token_access', action.payload.access)
            localStorage.setItem('token_refresh', action.payload.refresh)
            return {
                ...state,
                token_access: localStorage.getItem('token_access'),
                token_refresh: localStorage.getItem('token_refresh'),
                isAuthenticated: true,
                isLoadingConnexion:false,
                isLoginError:false,
                loginError:null, 
            }

        case LOGIN_FAIL:
            localStorage.removeItem('token_access')
            localStorage.removeItem('token_refresh')
            return {
                ...state,
                user: {},
                isAuthenticated: null,
                isLoading: false,
                error:null,
                isLoadingChanged:false,
                errorPassword:null,
                isLoadingConnexion:false,
                isErrorPassword:false,
                isSetPasswordSucces:false,
                isLoginError:true,
                loginError:(typeof action.payload === 'undefined' ? "Le serveur est injoignable !!! Verifiez votre connexion internet" : action.payload ),
                isLoadingRefresh:false,
      
        }

        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case TOKEN_REFRESH_FAIL:
            localStorage.removeItem('token_access')
            localStorage.removeItem('token_refresh')
            return {
                ...state,
                token_access: null,
                token_refresh: null,
                user: {},
                isAuthenticated: null,
                isLoading: false,
                error:null,
                isLoadingChanged:false,
                errorPassword:null,
                isLoadingConnexion:false,
                isErrorPassword:false,
                isLoginError:false,
                loginError:null,
                isSetPasswordSucces:false,
                isLoadingRefresh:false,
                isLoadingGetEmail: false,
                isSuccessGetEmail: false,
                isErrorGetEmail: false,
                errorGetEmail: "",
                messageGetEmail: "",

            }
        
        case AUTH_ERROR_NON_TROUVE:
            localStorage.removeItem('token_access')
            localStorage.removeItem('token_refresh')
            return {
                ...state,
                user: {},
                isAuthenticated: null,
                isLoading: false,
                error:null,
                isLoadingChanged:false,
                errorPassword:null,
                isLoadingConnexion:false,
                isErrorPassword:false,
                isLoginError:false,
                loginError:null,
                isSetPasswordSucces:false,
                isLoadingRefresh:false,
                isLoadingGetEmail: false,
                isSuccessGetEmail: false,
                isErrorGetEmail: false,
                errorGetEmail: "",
                messageGetEmail: "",
            }
        
        
        case TOKEN_REFRESH_LOADING:
            return {
                ...state,
                isLoadingRefresh: true          
            }
        case TOKEN_REFRESH_SUCCESS:
            localStorage.removeItem('token_access')
            localStorage.removeItem('token_refresh')
            localStorage.setItem('token_access', action.payload['access'])
            localStorage.setItem('token_refresh', action.payload['refresh'])
            return {
                ...state,
                token_access: localStorage.getItem('token_access'),
                token_refresh: localStorage.getItem('token_refresh'),
                isAuthenticated: true,
                isLoading: false, 
                isLoadingRefresh:false,       
            }
       
        
        case EMAIL_USER_GET_LOADING:
            return {
                ...state,
                isLoadingGetEmail:true,
                isSuccessGetEmail:false,
                isErrorGetEmail: false,
                errorGetEmail: "",
                messageGetEmail: ""
            }
        case EMAIL_USER_GET_SUCCESS:
            return {
                ...state,
                isLoadingGetEmail:false,
                isSuccessGetEmail:true,
                isErrorGetEmail: false,
                errorGetEmail: "",
                messageGetEmail: "Vous avez reçu une demande de réinitialisation du mot de passe de votre compte dans votre boîte email. Consultez pour terminer l'operation !"
            }
        case EMAIL_USER_GET_FAILED:
            return {
                ...state,
                isLoadingGetEmail:false,
                isSuccessGetEmail:false,
                isErrorGetEmail: true,
                errorGetEmail: action.payload,
                messageGetEmail: "",
            }


        case ERROR_VALUE_CLEAR:
            return {
                ...state,
                error: null,
                isErrorPassword:false,
                isLoginError:false,
                loginError:null,
                isSetPasswordSucces:false
            }

        case CLEAR_STAPPERS_VALUE_CONNEXION:
            return {
                ...state,
                isLoadingGetEmail:false,
                isSuccessGetEmail:false,
                isErrorGetEmail: false,
                errorGetEmail: "",
                messageGetEmail: "",
            }

        default:
            return state
    }
}


