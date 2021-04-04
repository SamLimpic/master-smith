import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/GenerateId.js"
import { saveCheck } from "../Utils/LocalStorage.js"

export default class Task {
    constructor(name, stage, orderId, id = generateId()) {
        this.name = name
        this.stage = stage
        this.orderId = orderId
        this.id = id
        this.checked = ''
    }

    get TaskTemplate() {
        let checkTask = ''
        // @ts-ignore
        if (JSON.parse(localStorage.getItem(this.id))) {
            checkTask = 'checked'
        } else {
            checkTask = '!checked'
        }

        return `
            <div class=" input-group-prepend">
                <i class="fas fa-times text-danger align-self-center" onclick="app.tasksController.removeTask('${this.id}')"></i>
                <div class="input-group-text bg-transparent" style="border: none">
                    <input id="${this.id}" type="checkbox" aria-label="Task Checkbox" value="1" onclick="app.tasksController.boxCheck('${this.id}', '${this.orderId}', '${this.stage}')" ${checkTask}>
                </div>
                <a><small><strong>${this.name}</strong></small></a>
            </div>
        `
    }
}
