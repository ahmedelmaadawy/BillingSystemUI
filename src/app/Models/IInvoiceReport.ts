export interface IInvoiceReport {
  id: number;
  billDate: string;
  paidUp: number;
  net: number;
  discountValue: number;
  discountPercentage: number;
  billsTotal: number;
  clientName: string;
  billNumber: number;
  items: { itemName: string; quantity: number; total: number }[];
}
