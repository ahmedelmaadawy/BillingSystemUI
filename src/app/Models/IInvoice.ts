export interface IInvoice {
    id: number;
    billDate: Date;
    paidUp: number;
    net: number;
    discountValue: number;
    discountPercentage: number;
    billsTotal: number;
    rest: number;
    clientId: number;
    employeeId: number;
  }
  export interface IItemInvoice {
    itemId: number;
    quantity: number;
    total: number;
  }