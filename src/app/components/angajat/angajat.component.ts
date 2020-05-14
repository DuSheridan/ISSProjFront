import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Medicament} from '../../classes/Medicament';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Comanda} from '../../classes/Comanda';
import {ANGAJAT} from '../../interfaces/interfaces';
import {SefService} from '../../services/sef.service';
import {AngajatService} from '../../services/angajat.service';

@Component({
  selector: 'app-sectie',
  templateUrl: './angajat.component.html',
  styleUrls: ['./angajat.component.css']
})
export class AngajatComponent implements OnInit {

  public listaSarcini = [];
  public username = localStorage.getItem("nume_utilizator") ? localStorage.getItem("nume_utilizator") : ""
  constructor(private angajatService: AngajatService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('isLogged'));
    console.log(localStorage.getItem('id'));
    console.log(localStorage.getItem('tip'));
    if (localStorage.getItem('isLogged') !== 'true' || localStorage.getItem('tip') !== ANGAJAT) {
      this.router.navigateByUrl('/login');
    } else {
      this.refresh();
    }
  }


  /**
   * Refresh
   */
  public refresh() {
    const id = localStorage.getItem('utilizator_id')
    // -->Get: all users
    this.angajatService.listAllTasks(id).subscribe(result => {
      this.listaSarcini = result.data;
    });
  }

  public update_task(sarcina_id) {
    const angajat_id = localStorage.getItem('utilizator_id')
    this.angajatService.update_sarcina(sarcina_id, angajat_id).subscribe(result => {
      this.listaSarcini = result.data
    })
  }

  public logout() {
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('tip', 'none');
    this.router.navigateByUrl('/login');
  }
}
