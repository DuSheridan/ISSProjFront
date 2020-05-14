import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Constants} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AngajatService {

  constructor(private http: HttpClient) {
  }


  public listAllTasks(id): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + 'sarcina/list', {id: id})
      .pipe(
        catchError(this.handleError)
      );
  }
  public update_sarcina(sarcina_id, angajat_id): Observable<any> {
    const data = {
      sarcina_id: sarcina_id,
      angajat_id: angajat_id
    };
    return this.http.post<any>(Constants.API_ENDPOINT + 'sarcina/update', data)
      .pipe(
        catchError(this.handleError)
      )
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
  }
}
