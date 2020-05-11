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

  public listAllUsers(): Observable<any> {
    return this.http.get<any>(Constants.API_ENDPOINT + 'users/list')
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + 'users/delete', {id})
      .pipe(
        catchError(this.handleError)
      );
  }

  public listAllEmployees(userId: string): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + 'employees/list', {id: userId})
      .pipe(
        catchError(this.handleError)
      );
  }

  public createTask(data: any): Observable<any> {
    return this.http.post<any>(Constants.API_ENDPOINT + 'task/create', {data})
      .pipe(
        catchError(this.handleError)
      );
  }

  public listAllTasks(): Observable<any> {
    return this.http.get<any>(Constants.API_ENDPOINT + 'task/list')
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
  }
}
