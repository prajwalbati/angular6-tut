import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Bike } from './bike';
// import { BIKES } from './mock-bikes';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

    updateBike(bike: Bike): Observable<any> {
      return this.http.put(this.bikesUrl, bike, httpOptions).pipe(
        tap(_ => this.log(`updated bike id=${bike.id}`)),
        catchError(this.handleError<any>('updateBike'))
      );
    }

    addBike(bike: Bike): Observable<Bike> {
      return this.http.post<Bike>(this.bikesUrl, bike, httpOptions).pipe(
         tap((bike: Bike) => this.log(`added bike w/ id=${bike.id}`)),
          catchError(this.handleError<Bike>('addBike'))
      );
    }

    deleteBike (bike: Bike | number): Observable<Bike> {
      const id = typeof bike === 'number' ? bike : bike.id;
      const url = `${this.bikesUrl}/${id}`;

      return this.http.delete<Bike>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted bike id=${id}`)),
        catchError(this.handleError<Bike>('deleteBike'))
      );
    }

    /* GET bikes whose name contains search term */
    searchBikes(term: string): Observable<Bike[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Bike[]>(`${this.bikesUrl}/?name=${term}`).pipe(
        tap(_ => this.log(`found bikes matching "${term}"`)),
        catchError(this.handleError<Bike[]>('searchBikes', []))
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
