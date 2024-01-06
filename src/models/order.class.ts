export class Order {
    product: string;
    pieces: string;
    price: string;
    status: string;




    constructor(obj?: any) {
        this.product = obj ? obj.product : '';
        this.pieces = obj ? obj.pieces : '';
        this.price = obj ? obj.price : '';
        this.status = obj ? obj.status : '';
    }

    public toJson() {
        return {
            product: this.product,
            pieces: this.pieces,
            price: this.price,
            status: this.status,
        }
    }
}