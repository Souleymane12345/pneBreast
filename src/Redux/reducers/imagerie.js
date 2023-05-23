import {
    DEMANDE_EXAMEN_RADIOLOGIE_GET_FAILED,
    DEMANDE_EXAMEN_RADIOLOGIE_GET_LOADING,
    DEMANDE_EXAMEN_RADIOLOGIE_GET_SUCCESS,
  
    DEMANDES_EXAMENS_RADIOLOGIE_GETS_FAILED,
    DEMANDES_EXAMENS_RADIOLOGIE_GETS_LOADING,
    DEMANDES_EXAMENS_RADIOLOGIE_GETS_SUCCESS,
  
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_FAILED,
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_LOADING,
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_SUCCESS,
  
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_FAILED,
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_LOADING,
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_SUCCESS,
  
    RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_FAILED,
    RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_LOADING,
    RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_SUCCESS,
  
    RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_RESET,
    RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_RESET_AFTER,
  
  } from "../types/imagerie";
  
  
  import { AUTH_ERROR, LOGOUT_SUCCESS, TOKEN_REFRESH_FAIL } from "../types/userTypes";
  
  
  const initialState = {
    demandesExamens:[],
    isLoadingDemandesExamens: false,
    isSuccesDemandesExamens: false,
  
    demandeExamen:[],
    isLoadingDemandeExamen: false,
    isSuccesDemandeExamen: false,
  
    resultatPostDemandeExamen:{},
    isLoadingPostResultatDemandeExamen: false,
    isSuccesPostResultatDemandeExamen: false,
  
    resultatsDemandesExamens:[],
    isLoadingResultatsDemandesExamens: false,
    isSuccesResultatsDemandesExamens: false,
  
    resultatDemandeExamen:{},
    isLoadingResultatDemandeExamen: false,
    isSuccesResultatDemandeExamen: false,
  
    isError: false,
    error: "",
  };
  
  //eslint-disable-next-line
  export default function (state = initialState, action) {
    switch (action.type) {
      case DEMANDES_EXAMENS_RADIOLOGIE_GETS_LOADING:
        return {
          ...state,
          isLoadingDemandesExamens: true,
          isSuccesDemandesExamens: false,
          isError: false,
          error: "",
        };
      case DEMANDES_EXAMENS_RADIOLOGIE_GETS_SUCCESS:
        return {
          ...state,
          isLoadingDemandesExamens: false,
          demandesExamens: action.payload,
          isSuccesDemandesExamens: true,
          isError: false,
        };
      case DEMANDES_EXAMENS_RADIOLOGIE_GETS_FAILED:
        return {
          ...state,
          isLoadingDemandesExamens: false,
          demandesExamens: [],
          error: action.payload,
          isSuccesDemandesExamens: false,
          isError: true,
        };
  
      
      case DEMANDE_EXAMEN_RADIOLOGIE_GET_LOADING:
        return {
          ...state,
          isLoadingDemandeExamen: true,
          isSuccesDemandeExamen: false,
          isError: false,
          error: "",
        };
      case DEMANDE_EXAMEN_RADIOLOGIE_GET_SUCCESS:
        return {
          ...state,
          isLoadingDemandeExamen: false,
          demandeExamen: action.payload,
          isSuccesDemandeExamen: true,
          isError: false,
        };
      case DEMANDE_EXAMEN_RADIOLOGIE_GET_FAILED:
        return {
          ...state,
          isLoadingDemandeExamen: false,
          demandeExamen: {},
          error: action.payload,
          isSuccesDemandeExamen: false,
          isError: true,
        };
      
      
      case RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_LOADING:
        return {
          ...state,
          isLoadingResultatsDemandesExamens: true,
          isSuccesResultatsDemandesExamens: false,
          isError: false,
          error: "",
        };
      case RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_SUCCESS:
        return {
          ...state,
          isLoadingResultatsDemandesExamens: false,
          resultatsDemandesExamens: action.payload,
          isSuccesResultatsDemandesExamens: true,
          isError: false,
        };
      case RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_FAILED:
        return {
          ...state,
          isLoadingResultatsDemandesExamens: false,
          error: action.payload,
          isSuccesResultatsDemandesExamens: false,
          isError: true,
        };
  
      
      case RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_LOADING:
        return {
          ...state,
          isLoadingResultatDemandeExamen: true,
          isSuccesResultatDemandeExamen: false,
          isError: false,
          error: "",
        };
      case RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_SUCCESS:
        return {
          ...state,
          isLoadingResultatDemandeExamen: false,
          resultatDemandeExamen: action.payload,
          isSuccesResultatDemandeExamen: true,
          isError: false,
        };
      case RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_FAILED:
        return {
          ...state,
          isLoadingResultatDemandeExamen: false,
          resultatDemandeExamen: {},
          error: action.payload,
          isSuccesResultatDemandeExamen: false,
          isError: true,
        };
  
      
        case RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_LOADING:
          return {
            ...state,
            isLoadingPostResultatDemandeExamen: true,
            isSuccesPostResultatDemandeExamen: false,
            isError: false,
            error: "",
          };
        case RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_SUCCESS:
          return {
            ...state,
            isLoadingPostResultatDemandeExamen: false,
            resultatPostDemandeExamen: action.payload,
            isSuccesPostResultatDemandeExamen: true,
            isError: false,
          };
        case RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_FAILED:
          return {
            ...state,
            isLoadingPostResultatDemandeExamen: false,
            resultatDemandeExamen: {},
            error: action.payload,
            isSuccesPostResultatDemandeExamen: false,
            isError: true,
          };
  
        case RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_RESET_AFTER:
          return {
            isSuccesDemandeExamen: false,
            isSuccesResultatDemandeExamen: false,
          }
  
        case RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_RESET:
          return {
            ...state,
            isLoadingDemandesExamens: false,
            isSuccesDemandesExamens: false,
  
            isLoadingDemandeExamen: false,
            isSuccesDemandeExamen: false,
  
            isLoadingPostResultatDemandeExamen: false,
            isSuccesPostResultatDemandeExamen: false,
  
            isLoadingResultatsDemandesExamens: false,
            isSuccesResultatsDemandesExamens: false,
  
            isLoadingResultatDemandeExamen: false,
            isSuccesResultatDemandeExamen: false,
    
            isError: false,
            error: "",
          };
  
  
      case AUTH_ERROR:
      case LOGOUT_SUCCESS:
      case TOKEN_REFRESH_FAIL:
        localStorage.removeItem("token_access");
        localStorage.removeItem("token_refresh");
        return {
          ...state,
          demandesExamens:[],
          isLoadingDemandesExamens: false,
          isSuccesDemandesExamens: false,
  
          demandeExamen:[],
          isLoadingDemandeExamen: false,
          isSuccesDemandeExamen: false,
  
          resultatPostDemandeExamen:{},
          isLoadingPostResultatDemandeExamen: false,
          isSuccesPostResultatDemandeExamen: false,
  
          resultatsDemandesExamens:[],
          isLoadingResultatsDemandesExamens: false,
          isSuccesResultatsDemandesExamens: false,
  
          resultatDemandeExamen:{},
          isLoadingResultatDemandeExamen: false,
          isSuccesResultatDemandeExamen: false,
  
          isError: false,
          error: "",
        };
  
      default:
        return state;
    }
  }
  