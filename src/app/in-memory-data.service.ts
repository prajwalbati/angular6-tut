import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bike } from './bike';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bikes = [
      { id: 1, name: 'Pulsar' },
      { id: 2, name: 'R15' },
      { id: 3, name: 'FZS' },
      { id: 4, name: 'Apache' },
      { id: 5, name: 'Avenger' },
      { id: 6, name: 'Benelli' },
      { id: 7, name: 'Royal Enfield' },
      { id: 8, name: 'Unicorn' },
      { id: 9, name: 'Hornet' },
      { id: 10, name: 'Gixer' }
    ];
    return {bikes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(bikes: Bike[]): number {
    return bikes.length > 0 ? Math.max(...bikes.map(bike => bike.id)) + 1 : 11;
  }
}