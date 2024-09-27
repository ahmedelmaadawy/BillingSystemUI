import { Itemdetails } from "./itemdetails";

export interface IInvoiceDetails {
    billDate:Date,
    billsTotal:number,
    clientName:string,
    discountPercentage: number,
    discountValue:number, 
    employeeName: string,
    id:number,
    net:number,
    paidUp:number,
    items:Itemdetails[]
}
