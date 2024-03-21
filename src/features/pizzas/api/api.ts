import { instance } from "../../../common/api/instance";


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
};

export interface AddPizzaArg  { 
  name: string; 
  description: string };

export interface AuthArg  {
  username: string;
  password: string;
};
