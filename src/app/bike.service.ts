import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Bike } from './bike';
// import { BIKES } from './mock-bikes';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

    constructor(private http: HttpClient, private messageService: MessageService) { }
  
    private bikesUrl = 'api/bikes';  // URL to web api

    getBikes (): Observable<Bike[]> {
      return this.http.get<Bike[]>(this.bikesUrl)
      .pipe(
        tap(heroes => this.log('fetched bikes')),
        catchError(this.handleError('getBikes', []))
      );
    }

    getBike(id: number): Observable<Bike> {
      const url = `${this.bikesUrl}/${id}`;
      return this.http.get<Bike>(url).pipe(
        tap(_ => this.log(`fetched bike id=${id}`)),
        catchError(this.handleError<Bike>(`getBike id=${id}`))
      );
    }

    private log(message: string) {
      this.messageService.add(`BikeService: ${message}`);
    }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
