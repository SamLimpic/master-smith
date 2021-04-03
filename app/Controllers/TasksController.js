import { ProxyState } from "../AppState.js";
import { tasksService } from "../Services/TasksService.js";


//Private
function _draw() {
  let tasks = ProxyState.tasks
  let taskTemplate = ''
  tasks.forEach(task => taskTemplate += task.TaskTemplate)
  document.getElementById("tasks").innerHTML = taskTemplate
}

//Public
export default class TasksController {
  constructor() {
    ProxyState.on("tasks", _draw)
    _draw()
  }

  addTask() {
    tasksService.addTask()
  }

}
