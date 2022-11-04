import {Component, OnInit} from '@angular/core';

import {CarService} from "../../services";
import {ICar} from "../../interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: ICar[];
  form: FormGroup;

  constructor(private carService: CarService) {
    this._initForm()
  }

  ngOnInit(): void {
    this.carService.getAll().subscribe(value => this.cars = value.data);
  }

  _initForm(): void {
    this.form = new FormGroup({
      model: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000000)]),
      year: new FormControl(null, [Validators.min(1998), Validators.max(new Date().getFullYear())])
    });
  }

  Create(): void {
    this.carService.createCar(this.form.value).subscribe(value => {
      this.cars.push(value);
    });
    this.form.reset();
  }

}
