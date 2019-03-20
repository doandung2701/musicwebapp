import Axios from "axios";
import { API_BASE_URL } from "../constants";

var axios =Axios.create({
    baseURL: API_BASE_URL+"songs/"
})

