import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SefService {

  constructor(private http: HttpClient) { }

  createMedicament(medicament: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT+"create_medicament", medicament)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteMedicament(id: any): Observable<any>{
    return this.http.post<any>(Constants.API_ENDPOINT+"delete_medicament", id)
    .pipe(
      catchError(this.handleError)
    );
  }

  getMedicament(): Observable<any>{
    return this.http.get<any>(Constants.API_ENDPOINT+"get_medicament")
    .pipe(
      catchError(this.handleError)
    );
  }

  createOperator(operator: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT+"create_operator", operator)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteOperator(id: any): Observable<any>{
    return this.http.post<any>(Constants.API_ENDPOINT+"delete_operator", id)
    .pipe(
      catchError(this.handleError)
    );
  }

  getOperator(): Observable<any>{
    return this.http.get<any>(Constants.API_ENDPOINT+"get_operator")
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
