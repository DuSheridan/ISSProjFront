export class Comanda_Medicament {
  id: number;
  medicament_id: number;
  cantitate_medicament: number;

  constructor(id, medicament_id, cantitate_medicament){
    this.id = id
    this.medicament_id = medicament_id
    this.cantitate_medicament = cantitate_medicament
  }
}
