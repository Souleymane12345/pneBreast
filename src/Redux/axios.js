import axios from "axios"
import { config } from '../Constants'
// import env from "react-dotenv"

var SERVER_URL = config.virtual.URL 

const instance = axios.create({
  baseURL: SERVER_URL 
})

instance.defaults.headers.post["Content-Type"] = "application/json"

export const baseURL = SERVER_URL

export const server_url = SERVER_URL

export default instance