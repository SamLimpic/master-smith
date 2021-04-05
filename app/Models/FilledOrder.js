export default class FilledOrder {
    constructor(client, weapon, material, price, id, imgId, status) {
        this.client = client
        this.weapon = weapon
        this.material = material
        this.price = price
        this.id = id
        this.imgId = imgId
        this.status = status
    }

    get FilledTemplate() {
        return `
            <div class="col-3 p-3 m-2 bg-parchment text-center">
                <h6 class="text-center mb-0">${this.status} ${this.material} ${this.weapon}<br><u>For ${this.client}</u></h6>
                <div class="row justify-content-center px-2">
                    <div class="col-md-12">
                        <img class="my-2 img-fluid shadow bg-filled-template" src="./assets/img/${this.imgId}.png"
                            alt="">
                        <h6 class="text-center my-3">${this.price}<br>Gold</h6>
                        <button class="bg-success align-self-end text-light text-center card shadow ml-2 mt-2 pt-2"
                            onclick="app.ordersController.deliverOrder('${this.id}')">
                            <h5>Deliver</h5>
                        </button>
                    </div>
                </div>
            </div>
        `
    }
}
