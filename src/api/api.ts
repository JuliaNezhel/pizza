import axios from "axios";

const token = localStorage.getItem('token');

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA5MDQ1OTMwfQ.CLkYUDXO6y-RmiBjMPU07xc2Vrlj-t-ddN1lvWBkbro";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const pizzasAPI = {
  fetchPizzas() {
    return instance.get(`pizzas`);
  },
  deletePizza(id: string) {
    return instance.delete(`pizzas/${id}`);
  },
  addPizza(odj: AddPizzaArg) {
    return instance.post(`pizzas`, odj);
  },
  updatePizza(id: string, odj: AddPizzaArg) {
    return instance.put(`pizzas/${id}`, odj);
  },
  authToken(data: AuthArg) {
    return axios.post("http://localhost:5000/api/login", data);
  },
};

export type AddPizzaArg = { name: string; description: string };

export type AuthArg = {
  username: string;
  password: string;
};
