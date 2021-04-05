import { ProxyState } from "../AppState.js";
import Task from "../Models/Task.js";
import { saveCheck, saveState } from "../Utils/LocalStorage.js";

class TasksService {

  boxCheck(id, orderId, str) {
    saveCheck(id)
    let parentOrder = ProxyState.orders.find(order => order.id == orderId)
    this.disableTask(orderId, str, parentOrder)
    this.changePrice(id, str, parentOrder)
    this.changeImg(id, str, parentOrder)
    ProxyState.orders = ProxyState.orders
    saveState()
    // @ts-ignore
    document.getElementById("checkbox").play()
  }

  addTask(id, str) {
    ProxyState.tasks = [...ProxyState.tasks, new Task(str, (str).toLowerCase(), id)]
    let newTask = ProxyState.tasks[ProxyState.tasks.length - 1]
    newTask.disabled = ''
    let parentOrder = ProxyState.orders.find(order => order.id == id)
    parentOrder.total++
    ProxyState.orders = ProxyState.orders
    saveState()
    // @ts-ignore
    document.getElementById("enchant").play()
  }

  deleteTask(id, orderId, str) {
    let message = confirm("Are you sure?  This is a delicate process!");
    if (message == true) {
      let parentOrder = ProxyState.orders.find(order => order.id == orderId)
      let taskArr = ProxyState.tasks.filter(task => task.orderId == orderId)
      let indexMinusOne = (taskArr.findIndex(task => task.stage == str)) - 1
      parentOrder.completed--
      parentOrder.total--
      parentOrder.price -= 5
      if (str == "enchanted" || str == "blessed" || str == "cursed") {
        parentOrder.price -= 20
      }
      if (taskArr[indexMinusOne]) {
        parentOrder.imgId = `${parentOrder.material.toLowerCase()}-${parentOrder.weapon.toLowerCase()}-${taskArr[indexMinusOne].stage.toLowerCase()}`
        taskArr[indexMinusOne].stage = ''
      } else {
        parentOrder.imgId = 'template'
      }

      ProxyState.tasks = ProxyState.tasks.filter(task => task.id != id)
      saveState()
      // @ts-ignore
      document.getElementById("delete").play()
    }
  }

  disableTask(orderId, str, parentOrder) {
    let taskArr = ProxyState.tasks.filter(task => task.orderId == orderId)
    let taskStage = taskArr.find(task => task.name == str)
    let indexPlusOne = (taskArr.findIndex(task => task.name == str)) + 1
    taskStage.disabled = 'disabled'
    taskStage.deleted = 'text-danger'
    if (taskArr[indexPlusOne]) {
      taskArr[indexPlusOne].disabled = ''
    } else {
      // @ts-ignore
      parentOrder.disabled = ''
    }
    if (str == 'Enchanted' || str == 'Blessed' || str == 'Cursed') {
      // @ts-ignore
      parentOrder.disabled = 'disabled'
    }
  }

  changePrice(id, str, parentOrder) {
    if (JSON.parse(localStorage.getItem(id)) == true) {
      parentOrder.completed++
      parentOrder.price += 5
      if (str == "Enchanted" || str == "Blessed" || str == "Cursed") {
        parentOrder.price += 20
        // @ts-ignore
        document.getElementById("enchant").play()
      }
      // @ts-ignore
      document.getElementById("checkbox").play()
    }
  }

  changeImg(id, str, parentOrder) {
    let taskStatus = ProxyState.tasks.find(task => task.id = id)
    if (JSON.parse(localStorage.getItem(id)) == true) {
      if (str == "Enchanted" || str == "Blessed" || str == "Cursed") {
        parentOrder.imgId = `${parentOrder.weapon.toLowerCase()}-${str.toLowerCase()}`
        parentOrder.status = str
      } else {
        parentOrder.imgId = `${parentOrder.material.toLowerCase()}-${parentOrder.weapon.toLowerCase()}-${str.toLowerCase()}`
      }
    }
  }
}

export const tasksService = new TasksService();

