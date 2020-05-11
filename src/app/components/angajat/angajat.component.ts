import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Medicament} from '../../classes/Medicament';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Comanda} from '../../classes/Comanda';
import {ANGAJAT} from '../../interfaces/interfaces';
import {SefService} from '../../services/sef.service';

@Component({
  selector: 'app-sectie',
  templateUrl: './angajat.component.html',
  styleUrls: ['./angajat.component.css']
})
export class AngajatComponent implements OnInit {
  // e necesar sa aratam o lista de medicamente
  medicamente: Medicament[];

  // fiecare comanda consta intr-o serie de perechi medicament - cantitate
  comanda_curenta: any = [];

  displayedColumnsMedicament: string[] = ['nume', 'cantitate'];
  id_med_to_add;
  nume_med_to_add;
  id_med_to_del;
  nume_med_to_del;

  comenzi_active: Comanda[];
  displayedColumnsComenzi: string[] = ['id', 'data_plasarii'];
  displayedColumnsComanda: string[] = ['nume', 'cantitate'];

  comenzi_info: any = [];
  joins_info: any = [];

  comanda_curenta_id: any = 'Nu este selectata nicio comanda';
  current_join_info;

  highlightedMedRows = [];
  highlightedMedComRows = [];
  highlightedComRows = [];

  constructor(private sectieService: SefService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('isLogged'));
    console.log(localStorage.getItem('id'));
    console.log(localStorage.getItem('tip'));
    if (localStorage.getItem('isLogged') !== 'true' || localStorage.getItem('tip') !== ANGAJAT) {
      this.router.navigateByUrl('/login');
    } else {
      // this.getMedicament();
      // this.getComenzi();
      setTimeout(() => {
        // this.parseData();
        console.log('data parsed');
      }, 1000);
    }
  }

  // selectMedicament(medicament: Medicament) {
  //   this.id_med_to_add = medicament.id;
  //   this.nume_med_to_add = medicament.nume;
  //   this.highlightedMedRows = [medicament];
  // }
  //
  // selectMedicamentDinComanda(data: any) {
  //   this.id_med_to_del = data.id;
  //   this.nume_med_to_del = data.nume;
  //   this.highlightedMedComRows = [data];
  // }
  //
  // addMedicamentToComanda() {
  //   var cantitate = (<HTMLInputElement> document.getElementById('cantitate_aleasa')).value;
  //   if (Number(cantitate) == 0) {
  //     alert('Cantitatea nu poate fi 0!');
  //     return;
  //   }
  //   var data = {
  //     id: this.id_med_to_add,
  //     nume: this.nume_med_to_add,
  //     cantitate: cantitate
  //   };
  //   this.comanda_curenta.push(data);
  //   // has to be different reference to the dataSource for the table to update
  //   this.comanda_curenta = [...this.comanda_curenta];
  //
  //   console.log(this.comanda_curenta);
  // }
  //
  // getMedicament() {
  //   this.sectieService.getMedicament().subscribe(result => this.medicamente = result.data);
  // }
  //
  // inregistrareComanda() {
  //   if (this.comanda_curenta.length == 0) {
  //     alert('Comanda trebuie sa contina cel putin  un medicament!');
  //     return;
  //   }
  //   for (var medicament of this.comanda_curenta) {
  //     var medicament_selectat = this.findMedById(medicament.id);
  //     if (medicament.cantitate > medicament_selectat.cantitate_ramasa) {
  //       alert('Cantitatea aleasa este mai mare decat cea disponibila, comanda nu se poate realiza');
  //       return;
  //     }
  //   }
  //   var data = {
  //     operator_sectie_id: localStorage.getItem('id'),
  //     data_plasarii: Date.now(),
  //     lista_med: this.comanda_curenta,
  //   };
  //
  //   var result_reg: any;
  //   this.sectieService.inregistrareComanda(data).subscribe(result => result_reg = result);
  //   setTimeout(() => {
  //     this.getMedicament();
  //     if (result_reg == 'ok') {
  //       alert('Comanda inregistrata cu succes!');
  //       this.comanda_curenta = [];
  //     }
  //     console.log('RESULT', result_reg);
  //
  //   }, 300);
  //
  // }
  //
  // stergeMedDinComanda() {
  //   console.log(this.comanda_curenta);
  //   var index = -1;
  //   for (var i = 0; i < this.comanda_curenta.length; i += 1) {
  //     if (this.comanda_curenta[i].id == this.id_med_to_del) {
  //       index = i;
  //     }
  //   }
  //   if (index > -1) {
  //     this.comanda_curenta.splice(index, 1);
  //   }
  //   this.comanda_curenta = [...this.comanda_curenta];
  //   console.log(this.comanda_curenta);
  // }
  //
  // findMedById(id: any) {
  //   for (var med of this.medicamente) {
  //     if (med.id == id) {
  //       return med;
  //     }
  //   }
  // }
  //
  // // DISPLAY comenzi onorate
  //
  // selectComanda(comanda: Comanda) {
  //   this.comanda_curenta_id = comanda.id;
  //   var index = -1;
  //   for (var i = 0; i < this.comenzi_info.length; i += 1) {
  //     if (this.comenzi_info[i].id == comanda.id) {
  //       index = i;
  //     }
  //   }
  //   this.current_join_info = this.joins_info[index];
  //   this.highlightedComRows = [comanda];
  // }
  //
  // getComenzi(): void {
  //   var operator_sectie_id = localStorage.getItem('id');
  //   this.sectieService.getComenzi(operator_sectie_id).subscribe(comenzi => this.comenzi_active = comenzi.data);
  // }
  //
  // parseData() {
  //   for (var elem of this.comenzi_active) {
  //     this.comenzi_info.push(elem['comanda_info']);
  //     this.joins_info.push(elem['joins']);
  //   }
  //   this.comenzi_info = [...this.comenzi_info];
  //   console.log(this.comenzi_info);
  // }
  //

}
