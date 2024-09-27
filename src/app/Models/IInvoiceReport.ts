import { IItem } from './IItem';
export interface IInvoiceReport {
  id: number;
  billDate: string;
  paidUp: number;
  net: number;
  discountValue: number;
  discountPercentage: number;
  billsTotal: number;
  ClinetName: string;
  items: { itemName: string; quantity: number; total: number }[];
}
