import { ProxyState } from "../AppState.js";
import { tasksService } from "../Services/TasksService.js";


//Private


//Public
export default class TasksController {
  constructor() { }

  addTask(id, str) {
    tasksService.addTask(id, str)
  }

  boxCheck(id, orderId, str) {
    tasksService.boxCheck(id, orderId, str)
  }

  deleteTask(id, orderId, str) {
    tasksService.deleteTask(id, orderId, str)
  }
}
