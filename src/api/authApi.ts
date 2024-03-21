import type { AuthArg } from './api';
import axios from "axios";


export const authAPI = {
  authToken(data: AuthArg) {
    return axios.post("http://localhost:5000/api/login", data);
  },
};