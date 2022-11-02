import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ICar} from "../../interfaces";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input()
  car: ICar;

  @Output()
  carForUpdate = new EventEmitter<ICar>();

  @Output()
  carForDelete = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  Update():void {
    this.carForUpdate.emit(this.car);
  }

  Delete(): void {
    this.carForDelete.emit(this.car.id);
  }
}
