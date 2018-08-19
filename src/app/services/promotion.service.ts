import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private restangular: Restangular) {

  }

  /*
  getPromotions(): Promise<Promotion[]> {
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(PROMOTIONS), 2000);
    // });

    return of(PROMOTIONS).pipe(delay(2000)).toPromise();
  }

  getPromotion(id: number): Promise<Promotion> {
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    // });

    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000)).toPromise();
  }

  getFeaturedPromotion(): Promise<Promotion> {
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    // });

    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)).toPromise();
  }*/

  // source data - promotions
  // directly operate with observables
  // getPromotions(): Observable<Promotion[]> {
  //   return of(PROMOTIONS).pipe(delay(2000));
  // }
  //
  // getPromotion(id: number): Observable<Promotion> {
  //   return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  // }
  //
  // getFeaturedPromotion(): Observable<Promotion> {
  //   return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  // }

  // source data - restangular
  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
      .pipe(map(promotions => promotions[0]));
  }
}
