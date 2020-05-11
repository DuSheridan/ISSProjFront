import { Component, OnInit } from '@angular/core';
import { FarmacieService } from '../../services/farmacie.service';
import { Comanda } from '../../classes/Comanda'
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-farmacie',
  templateUrl: './farmacie.component.html',
  styleUrls: ['./farmacie.component.css']
})
export class FarmacieComponent implements OnInit {
  comenzi_active: Comanda[];
  displayedColumnsComenzi: string[] = ['id', 'data_plasarii', 'operator_sectie_id'];
  displayedColumnsComanda: string[] = ['nume', 'cantitate'];

  comenzi_info:any = [];
  joins_info:any = [];

  comanda_curenta_id:any = "Nu este selectata nicio comanda";
  current_join_info;

  highlightedComRows = [];

  constructor(private farmace_service: FarmacieService, private router: Router) { }


  ngOnInit(): void {
    console.log(localStorage.getItem('isLogged'))
    console.log(localStorage.getItem('id'))
    console.log(localStorage.getItem('tip'))
    if (localStorage.getItem('isLogged') != 'true' || localStorage.getItem('tip') != 'Operator_Farmacie'){
      this.router.navigateByUrl('/login');
    } else{
      this.getComenzi()
      setTimeout(()=>{
        this.parseData()
        console.log("data parsed")
        console.log(this.comenzi_info)
        console.log(this.joins_info)
      }, 800);
    }
  }

  selectComanda(comanda: Comanda){
    this.comanda_curenta_id = comanda.id;
    var index = -1;
    for (var i = 0; i<this.comenzi_info.length; i+=1){
      if (this.comenzi_info[i].id == comanda.id){
        index = i
      }
    }
    this.current_join_info = this.joins_info[index];
    this.highlightedComRows = [comanda];
  }

  onorareComanda(){
    var op_id = localStorage.getItem('id');
    var rezultat_onorare;
    this.farmace_service.onorareComanda(this.comanda_curenta_id, op_id).subscribe(result => rezultat_onorare=result);
    setTimeout(()=>{
      if (rezultat_onorare == "ok"){
        alert("Comanda a fost onorata cu succes!")
        console.log("Eliminare comanda din lista active");
        this.getComenzi()
        setTimeout(()=>{
          this.parseData()
          console.log("data parsed")
        }, 800);
        this.current_join_info = null;
      }
    }, 100);

    console.log(rezultat_onorare);
    console.log(op_id);
    console.log(this.comanda_curenta_id);

  }

  getComenzi(): void {
    this.farmace_service.getComenzi().subscribe(comenzi => this.comenzi_active = comenzi.data);
  }

  parseData(){
    this.comenzi_info = [];
    this.joins_info = [];
    for (var elem of this.comenzi_active){
      this.comenzi_info.push(elem['comanda_info']);
      this.joins_info.push(elem['joins']);
    }
    this.comenzi_info = [...this.comenzi_info]
    // this.comenzi_info = this.comenzi_info.reverse();
  }

}
