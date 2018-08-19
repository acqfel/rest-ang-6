import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';

import { flyInOut } from '../animations/app.animation';

// tslint:disable-next-line:use-host-property-decorator
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  leaderErrMess: string;

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {
    //this.leaders = this.leaderService.getLeaders();
    // Using Promise / Observable
    this.leaderService.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
        errmess => this.leaderErrMess = <any>errmess.message);
  }

}
