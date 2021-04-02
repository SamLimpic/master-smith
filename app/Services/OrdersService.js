import { ProxyState } from "../AppState.js";
import Order from "../Models/Order.js";

class OrdersService {
  addOrder() {
    ProxyState.orders = [...ProxyState.orders, new Order({ title: Math.random() })]
  }
}

export const ordersService = new OrdersService();

