import { Injectable } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';

import { Observable } from 'rxjs';

import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    console.log("Fb Service: "+feedback.firstname);
    return this.restangular.all('feedback').post(feedback);
  }
}
