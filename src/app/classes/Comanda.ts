export class Comanda {
  id: number;
  operator_sectie_id: number;
  operator_farmacie_id: number;
  data_plasarii: Date;

  constructor(id, operator_sectie_id, operator_farmacie_id, date){
    this.id = id
    this.operator_sectie_id = operator_sectie_id
    this.operator_farmacie_id = operator_farmacie_id
    this.data_plasarii = date
  }
}
