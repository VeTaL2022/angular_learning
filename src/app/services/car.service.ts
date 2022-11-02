import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {ICar} from "../interfaces";
import {urls} from "../configs";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) {
  }

  getAllCars(): Observable<ICar[]> {
    return this.httpClient.get<ICar[]>(urls.cars);
  }

  createCar(car: ICar): Observable<ICar> {
    return this.httpClient.post<ICar>(urls.cars, car);
  }

  updateCarById(id: number, car: ICar): Observable<ICar> {
    return this.httpClient.put<ICar>(`${urls.cars}/${id}`, car);
  }

  deleteCarById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${urls.cars}/${id}`);
  }
}
