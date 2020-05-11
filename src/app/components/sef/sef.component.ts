import { Component, OnInit } from '@angular/core';
import { SefService } from '../../services/sef.service';
import { Medicament } from '../../classes/Medicament'
import { Operator } from '../../classes/Operator'
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sef',
  templateUrl: './sef.component.html',
  styleUrls: ['./sef.component.css']
})
export class SefComponent implements OnInit {
  displayedColumnsMedicament: string[] = ['nume', 'cantitate'];
  displayedColumnsOperator: string[] = ['nume', 'tip'];
  medicamente: Medicament[];
  operatori: Operator[];

  id_med_to_delete;
  nume_med_to_delete;
  id_op_to_delete;
  nume_op_to_delete;

  highlightedMedRows = [];
  highlightedOpRows = [];


  constructor(private router: Router, private administrator_service: SefService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('isLogged'))
    console.log(localStorage.getItem('id'))
    console.log(localStorage.getItem('tip'))
    if (localStorage.getItem('isLogged') != 'true' || localStorage.getItem('tip') != 'Sef'){
      this.router.navigateByUrl('/login');
    } else{
      this.getMedicament()
      this.getOperator()
    }
  }

  selectMedicament(medicament: Medicament){
    this.id_med_to_delete = medicament.id
    this.nume_med_to_delete = medicament.nume
    this.highlightedMedRows = [medicament]
  }

  deleteMedicament(){
    var data = {
      id: this.id_med_to_delete
    }
    var result_reg:any;
    this.administrator_service.deleteMedicament(data).subscribe(result => result_reg=result);
    setTimeout(()=>{
      if (result_reg == "ok"){
        alert("Medicament sters cu succes!");
      } else{
        alert("Eroare!");
      }
      this.getMedicament()
    }, 100);
  }

  getMedicament(){
    this.administrator_service.getMedicament().subscribe(result => this.medicamente = result.data);
  }

  createMedicament(){
    var nume = (<HTMLInputElement>document.getElementById("nume_medicament")).value
    var cantitate_ramasa = (<HTMLInputElement>document.getElementById("cantitate_ramasa")).value

    var medicament = {
      nume: nume,
      cantitate_ramasa: cantitate_ramasa
    };

    var result_reg:any;
    this.administrator_service.createMedicament(medicament).subscribe(result => result_reg=result);
    setTimeout(()=>{
      if (result_reg == "ok"){
        alert("Medicament creat cu succes!");
      } else{
        alert("Eroare!");
      }
      this.getMedicament()
    }, 100);
  }

  selectOperator(operator: Operator){
    this.id_op_to_delete = operator.id;
    this.nume_op_to_delete = operator.nume
    this.highlightedOpRows = [operator]
  }

  deleteOperator(){
    var data = {
      id: this.id_op_to_delete
    }
    var result_reg:any;
    this.administrator_service.deleteOperator(data).subscribe(result => result => result_reg=result);
    setTimeout(()=>{
      if (result_reg == "ok"){
        alert("Operator sters cu succes!");
      } else{
        alert("Eroare!");
      }
      this.getOperator()
    }, 100);
  }

  getOperator(){
    this.administrator_service.getOperator().subscribe(result => this.operatori = result.data);
  }

  createOperator(){
    var nume = (<HTMLInputElement>document.getElementById("nume_operator")).value
    var tip = (<HTMLInputElement>document.getElementById("tip")).value
    var parola = (<HTMLInputElement>document.getElementById("parola")).value

    var operator = {
      nume: nume,
      tip: tip,
      parola: parola
    }
    var result_reg:any;
    this.administrator_service.createOperator(operator).subscribe(result => result => result_reg=result);
    setTimeout(()=>{
      if (result_reg == "ok"){
        alert("Operator creat cu succes!");
      } else{
        alert("Eroare!");
      }
      this.getOperator()
    }, 100);
  }

}
