export class User {
    firstName: string;
    lastName: string;
    birthDate: number;
    street: string;
    houseNo: string;
    zipCode: number;
    city: string;
    email: string


    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.houseNo = obj ? obj.houseNo : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : "";
    }

    public toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            street: this.street,
            houseNo: this.houseNo,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email
        }
    }
}