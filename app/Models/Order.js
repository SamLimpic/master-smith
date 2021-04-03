import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/GenerateId"

export default class Order {
    constructor(material, weapon, client,) {
        this.material = material
        this.weapon = weapon
        this.client = client
        this.price = 0
        this.completed = 0
        this.total = 4
        this.id = generateId()
    }

    get OrderTemplate() {

        return /*html*/`
        <div class="col-5 bg-light p-3 m-3">
            <h4 class="text-center mb-0"><u>${this.material} ${this.weapon} for ${this.client}</u></h4>
            <p class="text-center my-0">Progress: ${this.completed}/${this.total}</p>
            <div class="row">
                <div class="input-group px-3">
                    <div class="col-7">
                    <img id="${this.id}" {class="my-2 img-fluid" src="//placehold.it/300x300" alt="">
                        <h5 class="text-center my-3"><u>Total Cost:</u> ${this.price} Gold</h5>
                    </div>
                    <div class="col-5 d-flex flex-column mt-2">

                        <div id="tasks"></div>
                            ${this.Tasks}
                            
                        <div class="btn-group my-2">
                            <button type="button" class="btn btn-primary dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Special Order
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item bg-secondary my-1" href="#" onclick="app.tasksController.addTask('${this.id}', 'jewel')"><strong> Bejeweled
                                    </strong></a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item bg-info my-1" href="#" onclick="app.tasksController.addTask('${this.id}', 'enchant')"><strong> Enchanted
                                    </strong></a>
                                <a class="dropdown-item bg-warning my-1" href="#" onclick="app.tasksController.addTask('${this.id}', 'bless')"><strong> Blessed
                                    </strong></a>
                                <a class="dropdown-item bg-danger my-1" href="#" onclick="app.tasksController.addTask('${this.id}', 'curse')"><strong> Cursed
                                    </strong></a>
                            </div>
                        </div>
                        <button class="bg-success align-self-end mx-1 mt-2 pt-2" onclick="app.ordersController.fillOrder(${this.id})">
                            <h5>Fill Order!</h5>
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
