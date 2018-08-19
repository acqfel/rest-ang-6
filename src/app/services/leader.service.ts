import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private restangular: Restangular) {

  }

  /*
  getLeaders(): Promise<Leader[]> {
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout( () => resolve(LEADERS), 2000);
    // });

    return of(LEADERS).pipe(delay(2000)).toPromise();
  }

  getLeader(id: number): Promise<Leader> {
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
    // });

    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)).toPromise();
  }

  getFeaturedLeader(): Promise<Leader> {
    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //   setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    // });

    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000)).toPromise();
  }
  */

  // source data - leaders
  // getLeaders(): Observable<Leader[]> {
  //   return of(LEADERS).pipe(delay(2000));
  // }
  //
  // getLeader(id: number): Observable<Leader> {
  //   return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  // }
  //
  // getFeaturedLeader(): Observable<Leader> {
  //   return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  // }

  // source data - restangular
  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    return  this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true})
      .pipe(map(leaders => leaders[0]));
  }
}
