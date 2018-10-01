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
  selectedBike: Bike;

  constructor(private bikeService: BikeService) { }

  ngOnInit() {
    this.getBikes();
  }

  getBikes(): void {
    this.bikes = this.bikeService.getBikes();
  }

  onSelect(bike: Bike): void {
    this.selectedBike = bike;
  }


}
