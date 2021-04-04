import { ProxyState } from "../AppState.js";
import Task from "../Models/Task.js";
import { saveCheck, saveState } from "../Utils/LocalStorage.js";

class TasksService {
  boxCheck(id, orderId, str) {
    saveCheck(id)
    let taskStage = ProxyState.tasks.find(task => task.stage == str)
    let parentOrder = ProxyState.orders.find(order => order.id == orderId)
    if (JSON.parse(localStorage.getItem(id)) == true) {
      parentOrder.completed++
      parentOrder.price += 5
      if (taskStage.stage == "enchant" || taskStage.stage == "bless" || taskStage.stage == "curse") {
        parentOrder.price += 20
      }
    } else {
      parentOrder.completed--
      parentOrder.price -= 5
      if (taskStage.stage == "enchant" || taskStage.stage == "bless" || taskStage.stage == "curse") {
        parentOrder.price -= 20
      }
    }
    ProxyState.orders = ProxyState.orders
    saveState()
  }

  addTask(id, str) {
    ProxyState.tasks = [...ProxyState.tasks, new Task(str, (str).toLowerCase(), id)]
    let parentOrder = ProxyState.orders.find(order => order.id == id)
    parentOrder.total++
    ProxyState.orders = ProxyState.orders
    saveState()
  }
}

export const tasksService = new TasksService();

