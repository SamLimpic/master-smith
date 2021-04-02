import { ProxyState } from "../AppState.js";
import { ordersService } from "../Services/OrdersService.js";


//Private
function _draw() {
  let orders = ProxyState.orders
  let orderTemplate = ''
  orders.forEach(order => orderTemplate += order.OrderTemplate)
  document.getElementById("orders").innerHTML = /*html*/`
  
  `
}

//Public
export default class OrdersController {
  constructor() {
    ProxyState.on("orders", _draw)
    _draw()
  }

  addOrder() {
    ordersService.addOrder()
  }

}
