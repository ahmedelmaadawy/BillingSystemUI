export interface IItemInvoice {
  code: string;
  name: string;
  unit: string;
  quantity: number;
  sellingPrice: number;
  discount: number;
  total: number;
  balance: number;
}

export interface IInvoice {
  billsDate: Date;
  billsNumber: string;
  clientName: string;
  billsTotal: number;
  percentageDiscount?: number;
  valueDiscount?: number;
  theNet: number;
  paidUp: number;
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