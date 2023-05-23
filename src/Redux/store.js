import {
  applyMiddleware,
  legacy_createStore as createStore,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'
import { composeWithDevTools } from "redux-devtools-extension";

//--------------------------------------------------------------------------//
//                        Redux persist Import Start                        //
//--------------------------------------------------------------------------//

import storage from 'redux-persist/lib/storage'
import {
   persistReducer,
   persistStore
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
} from 'redux-persist'

import { config } from '../Constants'
//--------------------------------------------------------------------------//
//                          Redux persist Import End                        //
//--------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------//
//------------------------            IMPORT REDUCERS START          -----------------------------//
//------------------------------------------------------------------------------------------------//

//################################################################################################//
//######################################## connexion #############################################//
//################################################################################################//

import initstate from "./reducers/connexion/userReducers";
import initstateimagerie from "./reducers/imagerie";


//################################################################################################//
//######################################## connexion #############################################//
//################################################################################################//

const rootReducer = combineReducers({

  //#############################################//
  //################# connexion #################//
  //#############################################//

  userdata: initstate,
  imgeriedata: initstateimagerie,

  //#############################################//
  //################# connexion #############

})


//------------------------------------------------------------------------------------------------//
//####################### ROOT REDUCERS REDUX GLOBALE STATE (STORE) END ##########################//
//------------------------------------------------------------------------------------------------//


//--------------------------------------------------------------------------//
//                        Redux persist Import Start                        //
//--------------------------------------------------------------------------//

const persistConfig = {
  key:"root",
  storage: storage,
  whitelist: ['userdata','imgeriedata']
}

const persistReducers = persistReducer(persistConfig, rootReducer)

// "build": "cross-env NODE_ENV=production react-scripts build",

//desactiver logger en production
let middlewareTools = []
if(config.virtual.ENV === "prod"){
  middlewareTools = [...middlewareTools, thunk]
}else if(config.virtual.ENV === "dev") {
  middlewareTools = [...middlewareTools, thunk, logger]
}

const middleware = composeWithDevTools(applyMiddleware(...middlewareTools));


//eslint-disable-next-line
export default () => {

  let store = createStore(persistReducers, middleware)

  let persistor = persistStore(store)
  
  return {store, persistor}
}
//--------------------------------------------------------------------------//
//                          Redux persist Import End                        //
//--------------------------------------------------------------------------//