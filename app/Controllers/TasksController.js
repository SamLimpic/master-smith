import { ProxyState } from "../AppState.js";
import { tasksService } from "../Services/TasksService.js";


//Private


//Public
export default class TasksController {
  constructor() { }

  addTask(id, str) {
    tasksService.addTask(id, str)
  }

  checkEnable(str) {
    tasksService.checkEnable(str)
  }

}
