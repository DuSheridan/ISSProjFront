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

  public listaSarcini = [
    {id: '1', description: 'baga descriere0', status: 'DONE'},
    {id: '2', description: 'baga descriere1', status: 'DONE'},
    {id: '3', description: 'baga descriere2', status: 'DONE'},
    {id: '4', description: 'baga descriere3', status: 'DONE'},
  ];

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
    const id = localStorage.getItem('id') ? localStorage.getItem('id') : '1';
    // -->Get: all users
    this.angajatService.listAllTasks(id).subscribe(users => {
      this.listaSarcini = users;
    });
  }

  public logout() {
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('tip', 'none');
    this.router.navigateByUrl('/login');
  }
}
