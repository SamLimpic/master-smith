import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/GenerateId.js"
import { saveCheck } from "../Utils/LocalStorage.js"

export default class Task {
    constructor(name, stage, orderId, id = generateId(), checked = '', disabled = 'disabled', deleted = 'text-transparent') {
        this.name = name
        this.stage = stage
        this.orderId = orderId
        this.id = id
        this.checked = checked
        this.disabled = disabled
        this.deleted = deleted
    }

    get TaskTemplate() {
        // @ts-ignore
        if (JSON.parse(localStorage.getItem(this.id))) {
            this.checked = 'checked'
        } else {
            this.checked = ''
        }

        return `
            <div class=" input-group-prepend">
                <i class="fas fa-times align-self-center ${this.deleted}" onclick="app.tasksController.deleteTask('${this.id}', '${this.orderId}', '${this.stage}')"></i>
                <div class="input-group-text bg-transparent" style="border: none">
                    <input id="${this.id}" type="checkbox" aria-label="Task Checkbox" value="1" onclick="app.tasksController.boxCheck('${this.id}', '${this.orderId}', '${this.name}')" ${this.checked} ${this.disabled}>
                </div>
                <a><small><strong>${this.name}</strong></small></a>
            </div>
        `
    }
}
