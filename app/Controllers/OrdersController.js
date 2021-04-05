import { ProxyState } from "../AppState.js";
import { ordersService } from "../Services/OrdersService.js";
import { loadChecked, loadState } from "../Utils/LocalStorage.js";


//Private
function _draw() {
  let orders = ProxyState.orders
  let filled = ProxyState.filledOrders
  let orderTemplate = ''
  let filledTemplate = ''
  orders.forEach(order => orderTemplate += order.OrderTemplate)
  filled.forEach(filled => filledTemplate += filled.FilledTemplate)
  document.getElementById("orders").innerHTML = orderTemplate
  document.getElementById("filledOrders").innerHTML = filledTemplate
}

//Public
export default class OrdersController {
  constructor() {
    ProxyState.on("orders", _draw)
    ProxyState.on('tasks', _draw)
    loadState()
    _draw()
  }

  addOrder() {
    window.event.preventDefault()
    let form = window.event.target
    let newOrder = {
      client: form['client'].value,
      weapon: form['weapon'].value,
      material: form['material'].value,
      time: form['time'].value
    }
    ordersService.addOrder(newOrder)
    // @ts-ignore
    form.reset()
  }

  fillOrder(id) {
    ordersService.fillOrder(id)
  }

  deleteOrder(id) {
    ordersService.deleteOrder(id)
  }

  deliverOrder(id) {
    ordersService.deliverOrder(id)
  }

  showPending() {
    document.getElementById('pending').classList.remove('d-none')
    document.getElementById('place').classList.add('d-none')
    document.getElementById('place').classList.remove('d-flex')
    document.getElementById('filled').classList.add('d-none')
  }

  showPlace() {
    document.getElementById('pending').classList.add('d-none')
    document.getElementById('place').classList.remove('d-none')
    document.getElementById('place').classList.add('d-flex')
    document.getElementById('filled').classList.add('d-none')
  }

  showFilled() {
    document.getElementById('pending').classList.add('d-none')
    document.getElementById('place').classList.add('d-none')
    document.getElementById('place').classList.remove('d-flex')
    document.getElementById('filled').classList.remove('d-none')
  }

  backToStart() {
    document.getElementById('pending').classList.add('d-none')
    document.getElementById('place').classList.add('d-none')
    document.getElementById('place').classList.remove('d-flex')
    document.getElementById('filled').classList.add('d-none')
  }

}
