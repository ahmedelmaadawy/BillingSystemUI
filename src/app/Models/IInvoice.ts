export interface IInvoice {
  billDate: Date;
  paidUp: number;
  net: number;
  discountValue?: number;
  discountPercentage?: number;
  clientId: number;
  billsTotal: number;
  employeeId: number;
  theRest: number;
  itemInvoices: [
    {
      itemId: number;
      invoiceId: number;
      quantity: number;
      total: number;
      sellingPrice: number;
    }
  ];
}
