export class Task {
    title: string;
    dueDate: number;
    opportunitie: string;
    status: string;
    type: string;



    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.dueDate = obj ? obj.dueDate : '';
        this.opportunitie = obj ? obj.opportunitie : '';
        this.status = obj ? obj.status : '';
        this.type = obj ? obj.type : '';
    }

    public toJson() {
        return {
            title: this.title,
            dueDate: this.dueDate,
            opportunitie: this.opportunitie,
            status: this.status,
            type: this.type,
        }
    }
}