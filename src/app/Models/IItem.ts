export interface IItem {
  id : number,
  name : string,
  note? : string,
  availableQuantity : number,
  buyingPrice: number,
  sellingPrice : number,
  companyName?: string,
  typeName? : string,
  unitName?: string
  companyId : number,
  typeId : number,
  UnitId : number
}