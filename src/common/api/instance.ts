import axios from "axios";

const token = localStorage.getItem('token');

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA5MDQ1OTMwfQ.CLkYUDXO6y-RmiBjMPU07xc2Vrlj-t-ddN1lvWBkbro";

export const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
