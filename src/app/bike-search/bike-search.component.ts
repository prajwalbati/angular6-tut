import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Bike } from '../bike';
import { BikeService } from '../bike.service';

@Component({
  selector: 'app-bike-search',
  templateUrl: './bike-search.component.html',
  styleUrls: [ './bike-search.component.css' ]
})
export class BikeSearchComponent implements OnInit {
  bikes$: Observable<Bike[]>;
  private searchTerms = new Subject<string>();

  constructor(private bikeService: BikeService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.bikes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.bikeService.searchBikes(term)),
    );
  }
}