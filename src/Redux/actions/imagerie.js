import axios from "../axios"

import { 
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_LOADING,
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_SUCCESS,
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_FAILED,

    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_FAILED,
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_LOADING,
    RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_SUCCESS,
  
    RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_FAILED,
    RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_LOADING,
    RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_SUCCESS,
} from "../types/imagerie"

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
export const postResultatDemandeExamen = (images) => (dispatch) => {
    if (localStorage.getItem("token_access") !== null) {
      const token = localStorage.getItem("token_access");
      dispatch({
        type: RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_LOADING,
      });
  
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });

      console.log('formData:',formData)
  
      axios
        .post(`/api/imagerie/resultatsimageries/post/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_SUCCESS,
              payload: response.data,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_FAILED,
          });
        });
    }
  };


export const getsResultatsDemandesExamens = () => (dispatch) => {
  if (localStorage.getItem("token_access") !== null) {
    const token = localStorage.getItem("token_access");
    dispatch({
      type: RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_LOADING,
    });
    // // const id_user = jwtDecode(token).user_id
    axios
      .get(
        `/api/imagerie/resultatsimageries`,
        configHeadersToken(token)
      )
      .then((reponse) => {
        dispatch({
          type: RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_SUCCESS,
          payload: reponse.data,
        });
      })
      .catch((error) => {
        
        dispatch({
          type: RESULTATS_DEMANDES_EXAMENS_RADIOLOGIES_GETS_FAILED,
        });
      });
  }
};

export const getResultatDemandeExamen = (id) => (dispatch) => {
  if (localStorage.getItem("token_access") !== null) {
    const token = localStorage.getItem("token_access");
    console.log('token id id:',id)
    dispatch({
      type: RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_LOADING,
    });
    // // const id_user = jwtDecode(token).user_id
    axios
      .get(
        
        `/api/imagerie/resultatsimageries/${id}/`,
        configHeadersToken(token)
      )
      .then((reponse) => {
        dispatch({
          type: RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_SUCCESS,
          payload: reponse.data,
        });
      })
      .catch((error) => {
        
        dispatch({
          type: RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_GET_FAILED,
        });
      });
  }
};
  

/** 
export const postResultatDemandeExamen = (body) => (dispatch) => {
    console.log('body body body: ',...body)
    if (localStorage.getItem("token_access") !== null) {
      const token = localStorage.getItem("token_access");
      dispatch({
        type: RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_LOADING,
      });
      // // const id_user = jwtDecode(token).user_id
      axios
        .post(
          `/api/imagerie/resultatsimageries/`,
          body,
          configHeadersToken(token)
        )
        .then((reponse) => {
          if (reponse.status === 200) {
            dispatch({
              type: RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_SUCCESS,
              payload: reponse.data,
            });
          }
        })
        .catch((error) => {
          
          dispatch({
            type: RESULTAT_DEMANDE_EXAMEN_RADIOLOGIE_POST_FAILED,
          });
        });
    }
  };
*/