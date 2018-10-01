import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Bike } from '../bike';
import { BikeService }  from '../bike.service';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.css']
})
export class BikeDetailComponent implements OnInit {
    @Input() bike: Bike;

  constructor( private route: ActivatedRoute, private bikeService: BikeService, private location: Location ) {}

  ngOnInit(): void {
      this.getBike();
  }

  getBike(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.bikeService.getBike(id).subscribe(bike=>this.bike = bike);
  }

  goBack(): void {
      this.location.back();
  }

}
