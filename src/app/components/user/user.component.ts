import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IUser} from "../../interfaces";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  user: IUser;

  @Output()
  liftUser = new EventEmitter<IUser>()

  constructor() {
  }

  ngOnInit(): void {
  }

  lift(): void {
    this.liftUser.emit(this.user);
  }
}
