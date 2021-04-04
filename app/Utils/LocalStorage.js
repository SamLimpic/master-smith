import { ProxyState } from "../AppState.js";
import Task from "../Models/Task.js";
import Order from "../Models/Order.js";


export function saveState() {
    localStorage.setItem('master-smith', JSON.stringify({
        orders: ProxyState.orders,
        tasks: ProxyState.tasks
    }))
}

export function saveCheck(id) {
    let taskId = ProxyState.tasks.find(task => task.id == id)
    let checkTask = document.getElementById(taskId.id)
    // @ts-ignore
    localStorage.setItem(taskId.id, checkTask.checked)
}

export function loadState() {
    let data = JSON.parse(localStorage.getItem('master-smith'))
    if (data) {
        ProxyState.orders = data.orders.map(order => new Order(order.client, order.weapon, order.material, order.price, order.completed, order.total, order.id));
        ProxyState.tasks = data.tasks.map(task => new Task(task.name, task.orderId, task.orderId, task.id));
    }
}

export function loadChecked() {
    ProxyState.tasks.forEach(task => {
        // @ts-ignore
        let checkTask = JSON.parse(localStorage.getItem(`${task.boxId}`).checked)
        // @ts-ignore
        document.getElementById(`${task.boxId}`).checked = checkTask
    })
}