import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_data;

  constructor(private router: Router, private login_service: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    var nume = (<HTMLInputElement>document.getElementById("nume")).value
    var parola = (<HTMLInputElement>document.getElementById("parola")).value
    this.login_service.login(nume, parola).subscribe(result => this.user_data = result.data);

    console.log(nume, parola)

    setTimeout(()=>{
      this.autentificare()
    }, 100);
  }

  autentificare(){
    console.log(this.user_data)
    if (this.user_data === undefined || this.user_data.length == 0){
      alert("Autentificarea esuata!")
      return;
    }
    var tip = this.user_data.tip;
    var id = this.user_data.id;
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('id', String(id));
    localStorage.setItem('tip', tip);
    if (tip == "Sef"){
      this.router.navigateByUrl('/sef');
    }
    if (tip == "Angajat"){
      this.router.navigateByUrl('/angajat');
    }

  }

}
