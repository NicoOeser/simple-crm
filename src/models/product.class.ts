export class Product {
    productName: string;
    productPrice: string;


    constructor(obj?: any) {
        this.productName = obj ? obj.productName : '';
        this.productPrice = obj ? obj.productPrice : '';
    }

    public toJson() {
        return {
            productName: this.productName,
            productPrice: this.productPrice,
        }
    }
}