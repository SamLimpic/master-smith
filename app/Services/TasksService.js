import { ProxyState } from "../AppState.js";
import Task from "../Models/Task.js";

class TasksService {
  checkEnable(str) {
    let index = (ProxyState.tasks.findIndex(task => task.stage = str)) + 1
    let plusOne = ProxyState.tasks[index].stage
    document.getElementById(plusOne).disabled = false
  }
  addTask(id, str) {
    ProxyState.tasks = [...ProxyState.tasks, new Task((str).toUpperCase(), str, id)]
  }
}

export const tasksService = new TasksService();

