import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class FarmacieService {
  private db_string = "http://127.0.0.1:5000/farmacie";

  constructor(private http: HttpClient) { }

  getComenzi(): Observable<any>{
    return this.http.get<any>(Constants.API_ENDPOINT+"get_comanda_activ")
    .pipe(
      catchError(this.handleError)
    );
  }

  onorareComanda(comanda_id, op_id): Observable<any>{
    var data ={
      id_comanda: comanda_id,
      id_op_farmacie: op_id
    }
    return this.http.post<any>(Constants.API_ENDPOINT+"onorare_comanda", data)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}
