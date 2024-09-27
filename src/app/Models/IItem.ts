export interface IItem {
  id: number;
  name: string;
  note?: string;
  availableQyantity: number;
  buyingPrice: number;
  sellingPrice: number;
  company: string;
  type: string;
  unit: string;
  companyId: number;
  typeId: number;
  unitId: number;
}
