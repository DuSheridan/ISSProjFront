export class Medicament {
  id: number;
  nume: string;
  cantitate_ramasa: number;

  constructor(nume, cantitate_ramasa){
    this.nume = nume
    this.cantitate_ramasa = cantitate_ramasa
  }
}
