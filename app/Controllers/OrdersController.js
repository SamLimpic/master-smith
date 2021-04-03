import { ProxyState } from "../AppState.js";
import { ordersService } from "../Services/OrdersService.js";
import { loadState } from "../Utils/LocalStorage.js";


//Private
function _draw() {
  let orders = ProxyState.orders
  let orderTemplate = ''
  let filledTemplate = ''
  orders.forEach(order => orderTemplate += order.OrderTemplate)
  document.getElementById("orders").innerHTML = orderTemplate

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
      material: form['material'].value
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

  showPending() {
    document.getElementById('greeting').classList.add('d-none')
    document.getElementById('pending').classList.remove('d-none')
    document.getElementById('place').classList.add('d-none')
    document.getElementById('filled').classList.add('d-none')
  }

  showPlace() {
    document.getElementById('greeting').classList.remove('d-none')
    document.getElementById('pending').classList.add('d-none')
    document.getElementById('place').classList.remove('d-none')
    document.getElementById('filled').classList.add('d-none')
  }

  showFilled() {
    document.getElementById('greeting').classList.remove('d-none')
    document.getElementById('pending').classList.add('d-none')
    document.getElementById('place').classList.add('d-none')
    document.getElementById('filled').classList.remove('d-none')
  }

  backToStart() {
    document.getElementById('greeting').classList.remove('d-none')
    document.getElementById('pending').classList.add('d-none')
    document.getElementById('place').classList.add('d-none')
    document.getElementById('filled').classList.add('d-none')
  }

}
