import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";
// import {FormControl, FormGroup, Validators} from "@angular/forms";

// import {CarService} from "../../services";
import {ICar, IPaginatedData} from "../../interfaces";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, AfterViewInit {
  cars: ICar[];
  total_items: number;
  // form: FormGroup;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private detectorRef: ChangeDetectorRef) {
    // this._initForm()
  }

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(({page}) => {
      this.paginator.pageIndex = page - 1;
      this.detectorRef.detectChanges();
    });
    this.paginator.page.subscribe((page) => {
      this.router.navigate([], {queryParams: {page: page.pageIndex + 1}});
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map(value => value['data'] as IPaginatedData<ICar>)
    ).subscribe((value) => {
      this.total_items = value.total_items;
      this.cars = value.data;
    })
  }

  // _initForm(): void {
  //   this.form = new FormGroup({
  //     model: new FormControl(null, [Validators.required]),
  //     price: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000000)]),
  //     year: new FormControl(null, [Validators.min(1998), Validators.max(new Date().getFullYear())])
  //   });
  // }

  // Create(): void {
  //   this.carService.createCar(this.form.value).subscribe(value => {
  //     this.cars.push(value);
  //   });
  //   this.form.reset();
  // }

}
