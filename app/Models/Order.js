import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/GenerateId.js"

export default class Order {
    constructor(client, weapon, material) {
        this.client = client
        this.weapon = weapon
        this.material = material
        this.client = client
        this.price = 0
        this.completed = 0
        this.total = 4
        this.id = generateId()
    }

    get OrderTemplate() {

        return `
            <div class="col-md-3 p-3 my-2 bg-parchment">
                <h6 class="text-center mb-0"><u>${this.material} ${this.weapon} for ${this.client}</u></h6>
                <p class="text-center my-0">Progress: ${this.completed}/${this.total}</p>
                <div class="row align-items-center px-2">
                    <div class="col-md-6 input-group ">
                        <img class="my-2 img-fluid shadow" src="/assets/img/template.png" alt="">
                    </div>
                    <div class="col-md-6">
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary dropdown-toggle shadow my-2"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled>
                                <small>Add-Ons</small>
                            </button>
                            <div class="dropdown-menu">
                                <a id="enchant" class="dropdown-item bg-info" href="#" onclick="app.tasksController.addTask('${this.id}, "enchant"')" ><small>Enchant</small></a>
                                <a id="bless" class="dropdown-item bg-warning" href="#" onclick="app.tasksController.addTask('${this.id}, "bless"')" ><small>Bless</small></a>
                                <a id="curse" class="dropdown-item bg-danger" href="#" onclick="app.tasksController.addTask('${this.id}, "curse"')" ><small>Curse</small></a>
                            </div>
                        </div>
                        <div id="tasks">
                            ${this.Tasks}
                        </div
                    </div>
                </div>
                <div class="row align-items-center m-3">
                    <div class="col-4">
                        <h6 class="text-center my-3">${this.price} Gold</h6>
                    </div>
                    <div class="col-8">
                        <button class="bg-success align-self-end text-light card shadow w-100 mt-2 pt-2"
                            onclick="fillOrder('${this.id}')">
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
