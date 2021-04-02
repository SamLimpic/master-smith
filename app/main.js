import OrdersController from "./Controllers/OrdersController.js";

class App {
  ordersController = new OrdersController();
}

window["app"] = new App();
