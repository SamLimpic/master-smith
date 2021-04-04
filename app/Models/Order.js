import { ProxyState } from "../AppState.js"
import { tasksService } from "../Services/TasksService.js"
import { generateId } from "../Utils/GenerateId.js"

export default class Order {
    constructor(client, weapon, material, price = 0, completed = 0, total = 4, id = generateId()) {
        this.client = client
        this.weapon = weapon
        this.material = material
        this.price = price
        this.completed = completed
        this.total = total
        this.id = id
    }

    get OrderTemplate() {
        return `
            <div class="col-3 p-3 m-2 bg-parchment">
                <h6 class="text-center mb-0">${this.material} ${this.weapon}<br><u>For ${this.client}</u></h6>
                <p class="text-center my-0">Progress: ${this.completed}/${this.total}</p>
                <div class="row align-items-center px-2">
                    <div class="col-md-6 input-group ">
                        <img class="my-2 img-fluid shadow bg-template" src="/assets/img/${this.material.toLowerCase()}-${this.weapon.toLowerCase()}.png" alt="">
                    </div>
                    <div class="col-md-6">
                        <div class="btn-group">
                            <button id="${this.id}" type="button" class="btn btn-primary dropdown-toggle shadow my-2"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <small>Add-Ons</small>
                            </button>
                            <div class="dropdown-menu">
                                <a id="enchant" class="dropdown-item bg-info" href="#" onclick="app.tasksController.addTask('${this.id}', 'Enchant')" ><small>Enchant</small></a>
                                <a id="bless" class="dropdown-item bg-warning" href="#" onclick="app.tasksController.addTask('${this.id}', 'Bless')" ><small>Bless</small></a>
                                <a id="curse" class="dropdown-item bg-danger" href="#" onclick="app.tasksController.addTask('${this.id}', 'Curse')" ><small>Curse</small></a>
                            </div>
                        </div>
                        <div id="tasks">
                            ${this.Tasks}
                        </div
                    </div>
                </div>
                <div class="row align-items-center my-3">
                    <div class="col-5">
                    <h6 class="text-center my-3">${this.price}<br>Gold</h6>
                    </div>
                    <div class="col-6">
                        <button class="bg-success align-self-end text-light card shadow w-100 mt-2 pt-2"
                            onclick="fillOrder('${this.id}')">
                            <h5>Fill Order</h5>
                        </button>
                    </div>
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
