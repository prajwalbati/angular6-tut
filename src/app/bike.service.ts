import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'

import { Bike } from './bike';
import { BIKES } from './mock-bikes';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor() { }

  getBikes(): Bike[] {
      return BIKES;
    }
    /*getBikes(): Observable<Bike[]> {
      return of(BIKES);
    }*/
}
