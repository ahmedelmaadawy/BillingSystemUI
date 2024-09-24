export interface IItemInvoice {
  itemId: number;
  InvoiceId: number;
  name: string;
  sellingPrice: number;
  quantity: number;
  total: number;
}

export interface IInvoice {
  billDate: Date;
  paidUp: number;
  net: number;
  discountValue?: number;
  discountPercentage?: number;
  clientId: string;
  billsTotal: number;
  employeeId: number;
  theRest: number;
  items: IItemInvoice[];
}





















// export interface IInvoice {
//     id: number;
//     billDate: Date;
//     paidUp: number;
//     net: number;
//     discountValue: number;
//     discountPercentage: number;
//     billsTotal: number;
//     rest: number;
//     clientId: number;
//     employeeId: number;
//   }
//   export interface IItemInvoice {
//     itemId: number;
//     quantity: number;
//     total: number;
//   }