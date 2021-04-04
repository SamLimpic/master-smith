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
    document.getElementById('place').classList.remove('d-flex')
    document.getElementById('pending').classList.remove('d-none')
    let price = 0
    if (newOrder.material == "Bronze") {
      price = 5
    } else if (newOrder.material == "Iron") {
      price = 10
    } else if (newOrder.material == "Steel") {
      price = 15
    }
    ProxyState.orders = [...ProxyState.orders, new Order(newOrder.client, newOrder.weapon, newOrder.material, price)]
    let newId = ProxyState.orders[ProxyState.orders.length - 1].id
    ProxyState.tasks = [...ProxyState.tasks,
    new Task('Smelt', 'smelt', newId),
    new Task('Shape', 'shape', newId),
    new Task('Assemble', 'assemble', newId),
    new Task('Polish', 'polish', newId)
    ]
    saveState()
  }
}

export const ordersService = new OrdersService();

