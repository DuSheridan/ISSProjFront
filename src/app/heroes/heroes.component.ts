import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  iapula(): void {
    this.http.get("http://127.0.0.1:5000/firma")
    console.log('amluatpula');
  }

}
