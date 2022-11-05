import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";

import {ICar, IPaginatedData} from "../interfaces";
import {urls} from "../configs";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number = 1): Observable<IPaginatedData<ICar>> {
    return this.httpClient.get<IPaginatedData<ICar>>(urls.cars, {params: {page}}).pipe(delay(1000));
  }

  createCar(car: ICar): Observable<ICar> {
    return this.httpClient.post<ICar>(urls.cars, car);
  }
}
