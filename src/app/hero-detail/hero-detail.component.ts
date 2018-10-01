import { Component, OnInit, Input } from '@angular/core';
import { Bike } from '../bike';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() bike: Bike;

  constructor() { }

  ngOnInit() {
  }

}
