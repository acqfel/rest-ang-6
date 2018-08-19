import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';

import { flyInOut } from '../animations/app.animation';

// tslint:disable-next-line:use-host-property-decorator
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;


  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    //this.dishes = this.dishService.getDishes();
    //using Promise / Observable
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }

}
