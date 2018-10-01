import { Component, OnInit } from '@angular/core';
import { Bike } from '../bike';
import { BikeService } from '../bike.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {
  bikes: Bike[];

  constructor(private bikeService: BikeService) { }

  ngOnInit() {
    this.getBikes();
  }

  getBikes(): void {
    this.bikeService.getBikes()
      .subscribe(bikes => this.bikes = bikes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.bikeService.addBike({name} as Bike)
    .subscribe(bike=> {
      this.bikes.push(bike);
    });
  }


}
