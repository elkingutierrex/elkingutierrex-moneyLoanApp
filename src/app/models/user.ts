import { Loan } from './loan';
import { Payment } from './payment';

export class User {
    $key: string;
    documentId:string;
    name: string;
    email: string;

    swApproved?: boolean;
    dateInsert?: number;
    dateUpdate?: number;
    loans?:Loan[]
    payments?: Payment[];

    constructor(){
        this.swApproved = Math.random() < 0.5
        this.loans = []
        this.payments = []
        this.dateInsert = new Date().getTime()
        this.dateUpdate = this.dateInsert
    }
}
