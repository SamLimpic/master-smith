import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/GenerateId.js"

export default class Order {
    constructor(client, weapon, material, time, price = 0, completed = 0, total = 4, id = generateId(), disabled = 'disabled', imgId = 'template', status = '') {
        this.client = client
        this.weapon = weapon
        this.material = material
        this.time = time
        this.price = price
        this.completed = completed
        this.total = total
        this.id = id
        this.disabled = disabled
        this.imgId = imgId
        this.status = status
    }

    get OrderTemplate() {
        return `
            <div class="col-5 p-3 m-2 bg-parchment ${this.time}">
                <h6 class="text-center mb-0">${this.material} ${this.weapon}<br><u>For ${this.client}</u></h6>
                <p class="text-center my-0">Progress: ${this.completed}/${this.total}</p>
                <div class="row align-items-center px-2">
                    <div id="" class="col-md-6 input-group">
                        <img class="my-2 img-fluid shadow bg-template" src="./assets/img/${this.imgId}.png" alt="" onclick="app.ordersController.deleteOrder('${this.id}')">
                    </div>
                    <div class="col-md-6">
                        <div class="btn-group">
                            <button id="${this.id}" type="button" class="btn btn-primary dropdown-toggle shadow my-2"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ${this.disabled}>
                                <small>Add-Ons</small>
                            </button>
                            <div class="dropdown-menu">
                                <a id="enchanted" class="dropdown-item bg-info" href="#" onclick="app.tasksController.addTask('${this.id}', 'Enchanted')" ><small>Enchant</small></a>
                                <a id="blessed" class="dropdown-item bg-warning" href="#" onclick="app.tasksController.addTask('${this.id}', 'Blessed')" ><small>Bless</small></a>
                                <a id="cursed" class="dropdown-item bg-danger" href="#" onclick="app.tasksController.addTask('${this.id}', 'Cursed')" ><small>Curse</small></a>
                            </div>
                        </div>
                        <div id="tasks">
                            ${this.Tasks}
                        </div>
                    </div>
                </div>
                <div class="row align-items-center my-3">
                    <div class="col-5">
                    <h6 class="text-center my-3">${this.price}<br>Gold</h6>
                    </div>
                    <div class="col-6">
                        <button class="bg-success align-self-end text-light card shadow w-100 mt-2 pt-2"
                            onclick="app.ordersController.fillOrder('${this.id}')">
                            <h5>Fill Order</h5>
                        </button>
                    </div>
                </div>
            </div>

        `
    }

    get Tasks() {
        let tasks = ProxyState.tasks.filter(task => task.orderId === this.id)
        let template = ''
        tasks.forEach(task => template += task.TaskTemplate)
        return template
    }
}
