import FilledOrder from "./Models/FilledOrder.js"
import Order from "./Models/Order.js"
import Task from "./Models/Task.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {

  /** @type {Order[]} */
  orders = []

  /** @type {FilledOrder[] */
  filledOrders = []

  /** @type {Task[]} */
  tasks = []
}


// NOTE Magic, no touchy!
export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, order) {
    isValidProp(target, prop)
    target[prop] = order
    target.emit(prop, order)
    return true
  }
})
