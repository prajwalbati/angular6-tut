import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'

import { MessageService } from './message.service';

import { Bike } from './bike';
import { BIKES } from './mock-bikes';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

    constructor(private messageService: MessageService) { }

    getBikes(): Observable<Bike[]> {
        // TODO: send the message _after_ fetching the heroes
      this.messageService.add('BikeService: fetched bikes');
      return of(BIKES);
    }
}
