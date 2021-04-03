import { ProxyState } from "../AppState.js";
import Task from "../Models/Task.js";
import Order from "../Models/Order.js";


export function saveState() {
    localStorage.setItem('master-smith', JSON.stringify({
        orders: ProxyState.orders,
        tasks: ProxyState.tasks
    }))
}

export function loadState() {
    let data = JSON.parse(localStorage.getItem('master-smith'))
    if (data) {
        ProxyState.orders = data.orders.map(order => new Order(order.name, order.size, order.id));
        ProxyState.tasks = data.tasks.map(ing => new Task(ing.name, ing.orderId, ing.id));
    }
}