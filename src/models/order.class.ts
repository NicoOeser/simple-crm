export class Order {
    product: string;
    customer: string;
    company: string;
    pieces: string;
    price: string;
    status: string;




    constructor(obj?: any) {
        this.product = obj ? obj.product : '';
        this.customer = obj ? obj.customer : '';
        this.company = obj ? obj.company : '';
        this.pieces = obj ? obj.pieces : '';
        this.price = obj ? obj.price : '';
        this.status = obj ? obj.status : '';
    }

    public toJson() {
        return {
            product: this.product,
            customer: this.customer,
            company: this.company,
            pieces: this.pieces,
            price: this.price,
            status: this.status,
        }
    }
}