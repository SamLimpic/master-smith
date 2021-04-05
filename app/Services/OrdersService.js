import { ProxyState } from "../AppState.js";
import FilledOrder from "../Models/FilledOrder.js";
import Order from "../Models/Order.js";
import Task from "../Models/Task.js";
import { saveState } from "../Utils/LocalStorage.js";

class OrdersService {
  deliverOrder(id) {
    ProxyState.filledOrders = ProxyState.filledOrders.filter(filled => filled.id != id)
    ProxyState.orders = ProxyState.orders
    saveState()
    // @ts-ignore
    document.getElementById("deliver").play()
  }

  fillOrder(id) {
    let fill = ProxyState.orders.find(order => order.id == id)
    ProxyState.filledOrders = [...ProxyState.filledOrders, new FilledOrder(fill.client, fill.weapon, fill.material, fill.price, fill.id, fill.imgId, fill.status)]
    ProxyState.orders = ProxyState.orders.filter(order => order.id != id)
    saveState()
    // @ts-ignore
    document.getElementById("menu-button").play()
  }

  addOrder(newOrder) {
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
    if (newOrder.time == 'bord-info') {
      price -= 5
    } else if (newOrder.time == 'bord-success') {
      price += 0
    } else if (newOrder.time == 'bord-secondary') {
      price += 5
    } else if (newOrder.time == 'bord-warning') {
      price += 25
    } else if (newOrder.time == 'bord-danger') {
      price += 50
    }
    ProxyState.orders = [...ProxyState.orders, new Order(newOrder.client, newOrder.weapon, newOrder.material, newOrder.time, price)]
    let newId = ProxyState.orders[ProxyState.orders.length - 1].id
    ProxyState.tasks = [...ProxyState.tasks,
    new Task('Smelt', 'smelt', newId),
    new Task('Shape', 'shape', newId),
    new Task('Assemble', 'assemble', newId),
    new Task('Polish', 'polish', newId)
    ]
    let firstTask = ProxyState.tasks.find(task => task.orderId == newId && task.stage == 'smelt')
    firstTask.disabled = ''
    ProxyState.tasks = ProxyState.tasks
    saveState()
    // @ts-ignore
    document.getElementById("checkbox").play()
  }

  deleteOrder(id) {
    let message = confirm("Are you sure?  These materials are expensive!");
    if (message == true) {
      ProxyState.orders = ProxyState.orders.filter(order => order.id != id)
      saveState()
      // @ts-ignore
      document.getElementById("delete").play()
    }
  }
}

export const ordersService = new OrdersService();