import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmacieComponent } from './components/farmacie/farmacie.component'
import { LoginComponent } from './components/login/login.component'
import { AngajatComponent } from './components/angajat/angajat.component'
import { SefComponent } from './components/sef/sef.component'


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'farmacie', component: FarmacieComponent },
  { path: 'sectie', component: AngajatComponent },
  { path: 'sef', component: SefComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
