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


    // TODO: uncomment this after connecting it to the API
    // this.loginService.login(nume, parola).subscribe(result => {
    //   // -->Set: data
    //   this.userData = result.data;
    //   // -->Autentificare
    //   this.autentificare();
    // });

    // TODO: delete this
    this.userData = { tip: SEF, id: '1231313', nume: 'name'};
    this.autentificare();

    console.log(nume, parola);
  }

  autentificare() {
    console.log(this.userData);
    if (this.userData === undefined || this.userData.length === 0) {
      alert('Autentificarea esuata!');
      return;
    }

    const tip = this.userData.tip;
    const id = this.userData.id;
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('id', String(id));
    localStorage.setItem('tip', tip);
    if (tip === SEF) {
      this.router.navigateByUrl('/sef');
    }
    if (tip === ANGAJAT) {
      this.router.navigateByUrl('/angajat');
    }

  }

}
