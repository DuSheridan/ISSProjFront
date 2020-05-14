import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {ANGAJAT, SEF} from '../../interfaces/interfaces';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userData;

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  login() {
    const nume = (<HTMLInputElement> document.getElementById('nume')).value;
    const parola = (<HTMLInputElement> document.getElementById('parola')).value;


    this.loginService.login(nume, parola).subscribe(result => {
      // -->Set: data
      this.userData = result.data;
      console.log(this.userData)
      // -->Autentificare
      this.autentificare();
    });
    console.log(nume, parola);
  }

  autentificare() {
    console.log(this.userData);
    if (this.userData === undefined || this.userData.length === 0) {
      alert('Autentificarea esuata!');
      return;
    }

    const tip = this.userData.tip;
    const firma_id = this.userData.firma_id;
    const utilizator_id = this.userData.id;
    const nume = this.userData.nume
    console.log(tip, firma_id, utilizator_id);
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('firma_id', String(firma_id));
    localStorage.setItem('utilizator_id', utilizator_id);
    localStorage.setItem('tip', tip);
    localStorage.setItem('nume', nume);
    if (tip === SEF) {
      this.router.navigateByUrl('/sef');
    }
    if (tip === ANGAJAT) {
      this.router.navigateByUrl('/angajat');
    }

  }

}
