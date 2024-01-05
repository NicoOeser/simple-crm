export class Task {
    title: string;
    date: Date;
    customer: string;
    status: string;
    type: string;



    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.date = obj ? obj.date : '';
        this.customer = obj ? obj.customer : '';
        this.status = obj ? obj.status : '';
        this.type = obj ? obj.type : '';
    }

    public toJson() {
        return {
            title: this.title,
            date: this.date,
            customer: this.customer,
            status: this.status,
            type: this.type,
        }
    }
}