export class User {
    firstName: string;
    lastName: string;
    phoneNo: number;
    company: string;
    street: string;
    houseNo: string;
    zipCode: number;
    city: string;
    email: string


    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.phoneNo = obj ? obj.phoneNo : '';
        this.company = obj ? obj.company : '';
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
            phoneNo: this.phoneNo,
            company: this.company,
            street: this.street,
            houseNo: this.houseNo,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email
        }
    }
}