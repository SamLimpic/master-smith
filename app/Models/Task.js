import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/GenerateId"

export default class Task {
    constructor(name, stage, orderId = null) {
        this.name = name
        this.stage = stage
        this.orderId = orderId
        this.id = generateId()
    }

    get TaskTemplate() {

        return `
            <div class=" input-group-prepend">
                <i class="fas fa-times text-danger align-self-center" onclick="app.tasksController.removeTask('${this.id}')"></i>
                <div class="input-group-text bg-transparent" style="border: none">
                    <input id="${this.stage}" type="checkbox" aria-label="Task Checkbox" onclick="app.tasksController.checkEnable('${this.stage}')">
                </div>
                <a><small><strong>${this.name}</strong></small></a>
            </div>

        `
    }
}
