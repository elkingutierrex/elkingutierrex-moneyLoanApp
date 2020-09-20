import { Payment } from './payment';

export class Loan {
    value: number;
    swApproved: boolean;
    dateInsert?: number;
    payments?: Payment[];

}
