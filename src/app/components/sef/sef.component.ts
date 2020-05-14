import {Component, OnInit} from '@angular/core';
import {SefService} from '../../services/sef.service';
import {Router} from '@angular/router';
import {SEF} from '../../interfaces/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sef',
  templateUrl: './sef.component.html',
  styleUrls: ['./sef.component.css']
})
export class SefComponent implements OnInit {
  public listaAngajati = [];
  public listaSarcini = [];
  public listaUseri = [];
  public username = localStorage.getItem("nume_utilizator") ? localStorage.getItem("nume_utilizator") : ""
  public fg;


  constructor(private router: Router, private sefService: SefService) {
    this.fg = new FormGroup({
      nume_utilizator: new FormControl('', [Validators.required]),
      parola_utilizator: new FormControl('', [Validators.required]),
      nume: new FormControl('', [Validators.required]),
      prenume: new FormControl('', [Validators.required]),
      tip: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('isLogged'));
    console.log(localStorage.getItem('id'));
    console.log(localStorage.getItem('tip'));
    if (localStorage.getItem('isLogged') !== 'true' || localStorage.getItem('tip') !== SEF) {
      this.router.navigateByUrl('/login');
    } else {
      this.refresh();
    }
  }


  /**
   * Refresh
   */
  public refresh() {
    const firma_id = localStorage.getItem('firma_id') ? localStorage.getItem('firma_id') : '1';
    // -->Get: all users
    this.sefService.listAllUsers().subscribe(result => {
      this.listaUseri = result.data;
    });
    // -->Get: all employees
    this.sefService.listAllEmployees(firma_id).subscribe(result => {
      this.listaAngajati = result.data;
      console.log(result.data);
    });
    // -->Get: all tasks
    this.sefService.listAllTasks().subscribe(result => {
      this.listaSarcini = result.data;
    });
  }

  /**
   * Delete user
   */
  public deleteUser(id) {
    const r = confirm('Esti sigur ca vrei sa stergi utilizatorul');
    if (r === true) {
      this.sefService.deleteUser(id).subscribe(res => {
        this.refresh();
      });
    }
  }

  /**
   * Add task
   */
  public addTask(id) {
    const res = prompt('Adauga descriere la task', 'Ex. descriere ');
    if (res) {
      console.log(res)
      const sef_id = localStorage.getItem("utilizator_id")
      this.sefService.createTask(id, sef_id, res).subscribe(a => {
        this.refresh();
      });
    }
  }

  /**
   *
   */
  public createUser() {
    // -->Get: data
    var data = this.fg.value;
    const firma_id = localStorage.getItem("firma_id")
    this.sefService.createUser(data, firma_id).subscribe(a => {
      this.refresh();
    });
  }


  public logout() {
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('tip', 'none');
    this.router.navigateByUrl('/login');
  }

}
