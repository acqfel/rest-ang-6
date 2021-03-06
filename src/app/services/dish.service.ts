import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  // constructor to ProcessHTTPMsgService
  // constructor(private http: HttpClient,
  //   private processHTTPMsgService: ProcessHTTPMsgService) {
  //
  // }

  constructor(private restangular: Restangular) { }

  /*
  getDishes(): Promise<Dish[]> {
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES), 2000);
    // });

    // services to operate using observables and then
    // convert them to promises and deliver to the components
    return of(DISHES).pipe(delay(2000)).toPromise();

  }

  getDish(id: number): Promise<Dish> {
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    // });

    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
  }

  getFeaturedDish(): Promise<Dish> {
    // return  new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    // });

    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
  }
  */

  // directly operate with observables
  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return  this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
      .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)),
        catchError(error => error ));
  }
}
