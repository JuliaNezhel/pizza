import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA5MDQ1OTMwfQ.CLkYUDXO6y-RmiBjMPU07xc2Vrlj-t-ddN1lvWBkbro";

const instanse = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const pizzasAPI = {
  fethPizzas() {
    return instanse.get(`pizzas`);
  },
  delitePizza(id: string) {
    return instanse.delete(`pizzas/${id}`);
  },
  addPizza(odj: AddPizzaArg) {
    return instanse.post(`pizzas`, odj);
  },
  updatePizza(id: string, odj: AddPizzaArg) {
    return instanse.put(`pizzas/${id}`, odj);
  },
  authToken(data: AuthArg){
    return axios.post("http://localhost:5000/api/login", data)
  }
};

export type AddPizzaArg = { name: string; description: string };

export type AuthArg = {
  username: string;
  password: string;
};
