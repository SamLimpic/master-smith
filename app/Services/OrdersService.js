import { ProxyState } from "../AppState.js";
import Order from "../Models/Order.js";
import Task from "../Models/Task.js";
import { saveState } from "../Utils/LocalStorage.js";

class OrdersService {
  deleteOrder(id) {
    throw new Error("Method not implemented.");
  }
  fillOrder(id) {
    throw new Error("Method not implemented.");
  }
  addOrder(newOrder) {
    document.getElementById('greeting').classList.add('d-none')
    document.getElementById('place').classList.add('d-none')
    document.getElementById('pending').classList.remove('d-none')
    ProxyState.orders = [...ProxyState.orders, new Order(newOrder.client, newOrder.weapon, newOrder.material)]
    let newId = ProxyState.orders[ProxyState.orders.length - 1].id
    ProxyState.tasks.push(
      new Task('Smelt', 'smelt', newId),
      new Task('Shape', 'shape', newId),
      new Task('Assemble', 'assemble', newId),
      new Task('Polish', 'polish', newId)
    )
    document.getElementById('smelt').disabled = false
    ProxyState.orders = ProxyState.orders
    saveState()
  }
}

export const ordersService = new OrdersService();

