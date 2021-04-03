import OrdersController from "./Controllers/OrdersController.js";
import TasksController from "./Controllers/TasksController.js";

class App {
  ordersController = new OrdersController();
  tasksController = new TasksController();
}

window["app"] = new App();
