import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngajatComponent } from './components/angajat/angajat.component';
import { SefComponent } from './components/sef/sef.component';
import { LoginComponent } from './components/login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AngajatComponent,
    SefComponent,
    LoginComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
