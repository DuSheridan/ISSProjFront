import {Component, OnInit} from '@angular/core';
import {SefService} from '../../services/sef.service';
import {Router} from '@angular/router';
import {SEF} from '../../interfaces/interfaces';

@Component({
  selector: 'app-sef',
  templateUrl: './sef.component.html',
  styleUrls: ['./sef.component.css']
})
export class SefComponent implements OnInit {
  // TODO: sterge si lasa doar arayuri
  public listaAngajati = [
    {id: '1', nume: 'Ghita 1', prenume: 'pule n maturi', timpSosire: Date.now()},
    {id: '2', nume: 'Ghita 2', prenume: 'pule n maturi', timpSosire: Date.now()},
    {id: '3', nume: 'Ghita 3', prenume: 'pule n maturi', timpSosire: Date.now()}
  ];
  public listaSarcini = [
    {id: '1', description: 'baga descriere0', status: 'DONE'},
    {id: '2', description: 'baga descriere1', status: 'DONE'},
    {id: '3', description: 'baga descriere2', status: 'DONE'},
    {id: '4', description: 'baga descriere3', status: 'DONE'},
  ];
  public listaUseri = [
    {id: '1', numeUtilizator: 'Ghitulescu', nume: 'Ghita 1', prenume: 'pule n maturi', tip: 'Angajat'},
    {id: '2', numeUtilizator: 'Ghitulescu', nume: 'Ghita 2', prenume: 'pule n maturi', tip: 'Angajat'},
    {id: '3', numeUtilizator: 'Ghitulescu', nume: 'Ghita 3', prenume: 'pule n maturi', tip: 'Angajat'}
  ];


  constructor(private router: Router, private sefService: SefService) {
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('isLogged'));
    console.log(localStorage.getItem('id'));
    console.log(localStorage.getItem('tip'));
    if (localStorage.getItem('isLogged') !== 'true' || localStorage.getItem('tip') !== SEF) {
      this.router.navigateByUrl('/login');
    } else {

      //  todo: uncomment this
      //   this.refresh();
    }
  }


  /**
   * Refresh
   */
  public refresh() {
    const id = localStorage.getItem('id') ? localStorage.getItem('id') : '1';
    // -->Get: all users
    this.sefService.listAllUsers().subscribe(users => {
      this.listaUseri = users;
    });
    // -->Get: all employees
    this.sefService.listAllEmployees(id).subscribe(employees => {
      this.listaAngajati = employees;
    });
    // -->Get: all users
    this.sefService.listAllTasks().subscribe(users => {
      this.listaSarcini = users;
    });
  }

  /**
   * Delete user
   */
  public deleteUser(id) {
    const r = confirm('Esti sigur ca vrei sa-l stergi pe Vasilica?');
    if (r === true) {
      this.sefService.deleteUser(id).subscribe(res => {
        this.refresh();
      })
    }
  }

  /**
   * Add task
   */
  public addTask(id) {
    const res = prompt('Adauga descriere la task', 'Fa curat in grajd');
    if (res) {
      this.sefService.createTask(id).subscribe(a => {
        this.refresh();
      });
    }
  }


  public logout() {
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('tip', 'none');
    this.router.navigateByUrl('/login');
  }

}
